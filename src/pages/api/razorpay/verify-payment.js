// API endpoint to verify Razorpay payment
// Add RAZORPAY_KEY_SECRET in .env file

import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body

    // Create signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET')
      .update(sign.toString())
      .digest('hex')

    // Verify signature
    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Here you can:
      // 1. Update database
      // 2. Send confirmation email
      // 3. Trigger any post-payment actions

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      })
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({
      success: false,
      error: 'Payment verification failed'
    })
  }
}
