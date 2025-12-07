// API endpoint to create Razorpay order
// Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file

import Razorpay from 'razorpay'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, planName, customerDetails } = req.body

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET'
    })

    // Create order
    const options = {
      amount: amount, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan: planName,
        customer_name: customerDetails.name || '',
        customer_email: customerDetails.email || '',
        customer_phone: customerDetails.phone || ''
      }
    }

    const order = await razorpay.orders.create(options)

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
}
