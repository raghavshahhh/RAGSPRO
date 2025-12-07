// Razorpay Integration Utility
// Add your Razorpay keys in .env file

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initiatePayment = async ({ amount, planName, customerDetails }) => {
  // Load Razorpay script
  const res = await loadRazorpayScript()
  
  if (!res) {
    alert('Razorpay SDK failed to load. Please check your internet connection.')
    return
  }

  // Create order on backend
  try {
    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        planName,
        customerDetails
      })
    })

    const data = await response.json()

    if (!data.orderId) {
      alert('Server error. Please try again later.')
      return
    }

    // Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID', // Add your key in .env
      amount: data.amount,
      currency: 'INR',
      name: 'RAGSPRO',
      description: planName,
      image: '/images/logo.png',
      order_id: data.orderId,
      handler: function (response) {
        // Payment successful
        verifyPayment(response, data.orderId)
      },
      prefill: {
        name: customerDetails.name || '',
        email: customerDetails.email || '',
        contact: customerDetails.phone || ''
      },
      notes: {
        plan: planName
      },
      theme: {
        color: '#000000'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled by user')
        }
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  } catch (error) {
    console.error('Payment initiation error:', error)
    alert('Something went wrong. Please try again.')
  }
}

const verifyPayment = async (response, orderId) => {
  try {
    const verifyResponse = await fetch('/api/razorpay/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        orderId
      })
    })

    const data = await verifyResponse.json()

    if (data.success) {
      alert('Payment successful! We will contact you shortly.')
      // Redirect to success page or show success message
      window.location.href = '/payment-success'
    } else {
      alert('Payment verification failed. Please contact support.')
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    alert('Payment verification failed. Please contact support.')
  }
}

// Helper function to format amount
export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}
