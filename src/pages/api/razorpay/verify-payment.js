// API endpoint to verify Razorpay payment and store in database
import crypto from 'crypto'
import { savePayment, logSystemEvent } from '../../../utils/supabase'
import { sendPaymentConfirmationEmail } from '../../../utils/emailService'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      amount,
      planName,
      customerDetails,
      userId
    } = req.body

    // Create signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET')
      .update(sign.toString())
      .digest('hex')

    // Verify signature
    if (razorpay_signature === expectedSign) {
      // Payment is verified - Save to database
      const paymentData = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: amount / 100, // Convert from paise to rupees
        currency: 'INR',
        status: 'completed',
        description: planName || 'RAGSPRO Service',
        user_id: userId || null,
        customer_name: customerDetails?.name || null,
        customer_email: customerDetails?.email || null,
        customer_phone: customerDetails?.phone || null,
        metadata: {
          plan: planName,
          orderId,
          verifiedAt: new Date().toISOString()
        }
      }

      // Save payment to database
      const savedPayment = await savePayment(paymentData)

      // Log the successful payment
      await logSystemEvent('payment', 'success', 'Payment verified and saved', {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: paymentData.amount,
        customer: customerDetails?.email
      })

      // Send confirmation email (async)
      if (customerDetails?.email && process.env.RESEND_API_KEY) {
        sendPaymentConfirmationEmail({
          name: customerDetails.name,
          email: customerDetails.email,
          amount: paymentData.amount,
          planName,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        }).catch(err => {
          console.error('Failed to send payment confirmation email:', err)
        })
      }

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        savedPayment: savedPayment?.[0] || null
      })
    } else {
      // Payment verification failed
      await logSystemEvent('payment', 'failed', 'Payment signature verification failed', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      })

      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      })
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    
    await logSystemEvent('payment', 'error', `Payment verification error: ${error.message}`, {
      error: error.toString()
    })

    res.status(500).json({
      success: false,
      error: 'Payment verification failed'
    })
  }
}
