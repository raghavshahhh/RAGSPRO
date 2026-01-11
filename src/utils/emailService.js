// Professional Email Service using Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email Templates
export const emailTemplates = {
  // User Welcome Email
  userWelcome: (data) => ({
    subject: `Welcome ${data.name}! Your Project Roadmap from RAGSPRO`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 50px; margin: 20px 0; }
            .details { background: #fff; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">🚀 RAGSPRO</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Build Your Startup in 20 Days</p>
            </div>
            
            <div class="content">
              <h2 style="color: #000; margin-top: 0;">Hi ${data.name}! 👋</h2>
              
              <p style="font-size: 16px;">
                Thank you for reaching out to RAGSPRO! We're excited to help you build your ${data.projectType || 'project'}.
              </p>
              
              <div class="highlight">
                <strong>⚡ What happens next?</strong>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Our team will review your project details within 24 hours</li>
                  <li>You'll receive a custom development roadmap</li>
                  <li>We'll schedule a free consultation call</li>
                </ul>
              </div>
              
              <div class="details">
                <h3 style="margin-top: 0; color: #000;">📋 Your Project Details</h3>
                
                <div class="detail-row">
                  <span class="detail-label">Project Type:</span>
                  <span>${data.projectType || 'Not specified'}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Budget Range:</span>
                  <span>${data.budget || 'Not specified'}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Timeline:</span>
                  <span>${data.timeline || 'Not specified'}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Validation Status:</span>
                  <span>${data.ideaValidated || 'Not specified'}</span>
                </div>
                
                ${data.description ? `
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Description:</span>
                  <p style="margin: 10px 0 0 0;">${data.description}</p>
                </div>
                ` : ''}
              </div>
              
              <div style="text-align: center;">
                <a href="https://ragspro.com/projects" class="button">
                  View Our Portfolio
                </a>
              </div>
              
              <div style="background: #fff; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h3 style="margin-top: 0; color: #000;">💡 While You Wait...</h3>
                <ul style="padding-left: 20px;">
                  <li><a href="https://ragspro.com/blog/mvp-development-process" style="color: #000;">Read our 20-day MVP process</a></li>
                  <li><a href="https://ragspro.com/blog/mvp-cost-india" style="color: #000;">Understand MVP development costs</a></li>
                  <li><a href="https://ragspro.com/blog/20-day-startup-launch-case-study" style="color: #000;">See our case studies</a></li>
                </ul>
              </div>
              
              <p style="margin-top: 30px;">
                <strong>Need immediate help?</strong><br>
                📞 Call/WhatsApp: <a href="tel:+919999999999" style="color: #000;">+91 99999 99999</a><br>
                📧 Email: <a href="mailto:raghav@ragspro.com" style="color: #000;">raghav@ragspro.com</a>
              </p>
            </div>
            
            <div class="footer">
              <p><strong>RAGSPRO</strong> - Raghav Shah</p>
              <p>Delhi, India | <a href="https://ragspro.com" style="color: #666;">ragspro.com</a></p>
              <p style="font-size: 12px; color: #999;">
                You're receiving this because you submitted a project inquiry at ragspro.com
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  // Company Notification Email
  companyNotification: (data) => ({
    subject: `🚨 New Lead: ${data.name} - ${data.budget || 'Budget TBD'} - ${data.projectType || 'Project'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 2px solid #667eea; border-top: none; border-radius: 0 0 10px 10px; }
            .priority-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin: 10px 0; }
            .high { background: #d4edda; color: #155724; }
            .medium { background: #fff3cd; color: #856404; }
            .low { background: #f8d7da; color: #721c24; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .info-box { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; }
            .info-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; }
            .info-value { font-size: 16px; color: #000; margin-top: 5px; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .button { display: inline-block; padding: 15px 30px; margin: 0 10px; text-decoration: none; border-radius: 50px; font-weight: bold; }
            .btn-primary { background: #667eea; color: #fff; }
            .btn-secondary { background: #fff; color: #667eea; border: 2px solid #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎯 New Lead Alert!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone wants to build with RAGSPRO</p>
            </div>
            
            <div class="content">
              ${data.qualification ? `
                <div style="text-align: center;">
                  <span class="priority-badge ${data.qualification.tier}">
                    ${data.qualification.tier === 'high' ? '🔥 HIGH PRIORITY' : 
                      data.qualification.tier === 'medium' ? '⚡ MEDIUM PRIORITY' : 
                      data.qualification.tier === 'low' ? '💡 LOW PRIORITY' : '❌ NOT QUALIFIED'}
                  </span>
                </div>
              ` : ''}
              
              <h2 style="color: #000; margin-top: 20px;">👤 Contact Information</h2>
              <div class="info-grid">
                <div class="info-box">
                  <div class="info-label">Name</div>
                  <div class="info-value">${data.name}</div>
                </div>
                <div class="info-box">
                  <div class="info-label">Email</div>
                  <div class="info-value"><a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></div>
                </div>
                <div class="info-box">
                  <div class="info-label">Phone</div>
                  <div class="info-value"><a href="tel:${data.phone}" style="color: #667eea;">${data.phone}</a></div>
                </div>
                <div class="info-box">
                  <div class="info-label">Submitted</div>
                  <div class="info-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                </div>
              </div>
              
              <h2 style="color: #000; margin-top: 30px;">📊 Project Details</h2>
              <div class="info-grid">
                <div class="info-box">
                  <div class="info-label">Project Type</div>
                  <div class="info-value">${data.projectType || 'Not specified'}</div>
                </div>
                <div class="info-box">
                  <div class="info-label">Budget</div>
                  <div class="info-value">${data.budget || 'Not specified'}</div>
                </div>
                <div class="info-box">
                  <div class="info-label">Timeline</div>
                  <div class="info-value">${data.timeline || 'Not specified'}</div>
                </div>
                <div class="info-box">
                  <div class="info-label">Validation</div>
                  <div class="info-value">${data.ideaValidated || 'Not specified'}</div>
                </div>
              </div>
              
              ${data.description ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                  <div class="info-label">Project Description</div>
                  <p style="margin: 10px 0 0 0; font-size: 15px; line-height: 1.6;">${data.description}</p>
                </div>
              ` : ''}
              
              <div class="action-buttons">
                <a href="mailto:${data.email}" class="button btn-primary">
                  📧 Reply to Lead
                </a>
                <a href="tel:${data.phone}" class="button btn-secondary">
                  📞 Call Now
                </a>
              </div>
              
              <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <h3 style="margin-top: 0; color: #000;">⚡ Quick Actions</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Add to CRM/Spreadsheet</li>
                  <li>Schedule follow-up call</li>
                  <li>Send custom proposal</li>
                  <li>Share relevant case studies</li>
                </ul>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  })
}

// Send Email Function
export async function sendEmail({ to, subject, html }) {
  try {
    const data = await resend.emails.send({
      from: 'RAGSPRO <noreply@ragspro.com>',
      to: [to],
      subject: subject,
      html: html
    })
    
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

// Send Lead Notification Emails
export async function sendLeadNotifications(leadData) {
  try {
    // Send welcome email to user
    const userEmail = emailTemplates.userWelcome(leadData)
    const userResult = await sendEmail({
      to: leadData.email,
      subject: userEmail.subject,
      html: userEmail.html
    })
    
    // Send notification to company
    const companyEmail = emailTemplates.companyNotification(leadData)
    const companyResult = await sendEmail({
      to: process.env.COMPANY_EMAIL || 'raghav@ragspro.com',
      subject: companyEmail.subject,
      html: companyEmail.html
    })
    
    return {
      success: true,
      userEmail: userResult,
      companyEmail: companyResult
    }
  } catch (error) {
    console.error('Error sending lead notifications:', error)
    return { success: false, error: error.message }
  }
}

// Alias for backward compatibility
export const sendLeadEmail = sendLeadNotifications

// Send Payment Confirmation Email
export async function sendPaymentConfirmationEmail(data) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-icon { font-size: 48px; margin-bottom: 10px; }
          .details { background: #fff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .detail-row { padding: 12px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #666; }
          .detail-value { font-weight: bold; color: #000; }
          .amount { font-size: 32px; font-weight: bold; color: #10b981; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1 style="margin: 0; font-size: 28px;">Payment Successful!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your payment</p>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 20px;">
              <p style="color: #666; margin: 0;">Amount Paid</p>
              <p class="amount">₹${data.amount?.toLocaleString() || '0'}</p>
            </div>
            
            <div class="details">
              <h3 style="margin-top: 0; color: #000;">📋 Payment Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Plan</span>
                <span class="detail-value">${data.planName || 'RAGSPRO Service'}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Payment ID</span>
                <span class="detail-value">${data.paymentId || '-'}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Order ID</span>
                <span class="detail-value">${data.orderId || '-'}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Date</span>
                <span class="detail-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
              </div>
            </div>
            
            <div style="background: #d1fae5; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #065f46;">🚀 What's Next?</h3>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #065f46;">
                <li>Our team will contact you within 24 hours</li>
                <li>You'll receive a project kickoff document</li>
                <li>We'll schedule your first consultation call</li>
              </ul>
            </div>
            
            <p style="text-align: center; color: #666;">
              Questions? Reply to this email or call us at <a href="tel:+918700048490" style="color: #10b981;">+91 87000 48490</a>
            </p>
          </div>
          
          <div class="footer">
            <p><strong>RAGSPRO</strong></p>
            <p>Delhi, India | <a href="https://ragspro.com" style="color: #666;">ragspro.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: data.email,
    subject: `✅ Payment Confirmed - ₹${data.amount?.toLocaleString() || '0'} | RAGSPRO`,
    html
  })
}

// Send Newsletter Welcome Email
export async function sendWelcomeEmail(data) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 50px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 32px;">🎉 Welcome to RAGSPRO!</h1>
            <p style="margin: 15px 0 0 0; opacity: 0.9;">You're now part of our community</p>
          </div>
          
          <div class="content">
            <h2 style="color: #000; margin-top: 0;">Hey${data.name ? ` ${data.name}` : ''}! 👋</h2>
            
            <p style="font-size: 16px;">
              Thanks for subscribing to the RAGSPRO newsletter! You'll now receive:
            </p>
            
            <ul style="padding-left: 20px; line-height: 2;">
              <li>🚀 Weekly startup tips & insights</li>
              <li>💡 Tech tutorials & best practices</li>
              <li>📊 Industry trends & analysis</li>
              <li>🎁 Exclusive offers & early access</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://ragspro.com/blog" class="button">
                Read Our Latest Blog Posts
              </a>
            </div>
            
            <div style="background: #fff; padding: 20px; border-radius: 10px; margin-top: 20px;">
              <h3 style="margin-top: 0; color: #000;">📱 Connect With Us</h3>
              <p style="margin: 10px 0;">
                <a href="https://instagram.com/ragspro.ai" style="color: #000; margin-right: 15px;">Instagram</a>
                <a href="https://linkedin.com/in/raghavshahhh" style="color: #000; margin-right: 15px;">LinkedIn</a>
                <a href="https://twitter.com/ragspro" style="color: #000;">Twitter</a>
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>RAGSPRO</strong> - Build Your Startup in 20 Days</p>
            <p>Delhi, India | <a href="https://ragspro.com" style="color: #666;">ragspro.com</a></p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              Don't want these emails? <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ragspro.com'}/api/newsletter/unsubscribe?email=${data.email}" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: data.email,
    subject: '🎉 Welcome to RAGSPRO Newsletter!',
    html
  })
}
