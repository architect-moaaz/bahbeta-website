// CommonJS format for Vercel serverless function
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, phone, service, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields' 
    });
  }

  // Check for environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing email configuration environment variables');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service is temporarily unavailable. Please contact us directly at support@bahbeta.com or call +973 33283222' 
    });
  }

  // Create transporter using Google Workspace SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // Your Google Workspace email
      pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: `"BahBeta Website" <${process.env.GMAIL_USER}>`,
    to: 'support@bahbeta.com',
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Company: ${company || 'Not provided'}
      Phone: ${phone || 'Not provided'}
      Service of Interest: ${service || 'Not specified'}
      
      Message:
      ${message}
      
      ---
      This email was sent from the BahBeta website contact form.
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Service of Interest:</strong> ${service || 'Not specified'}</p>
      
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        This email was sent from the BahBeta website contact form.
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user
    const confirmationMail = {
      from: `"BahBeta Technology Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting BahBeta',
      html: `
        <h2>Thank you for your inquiry!</h2>
        
        <p>Dear ${name},</p>
        
        <p>We have received your message and appreciate your interest in BahBeta Technology Solutions.</p>
        
        <p>Our team will review your inquiry and get back to you within 24 hours.</p>
        
        <p>Here's a summary of your submission:</p>
        <ul>
          <li><strong>Service of Interest:</strong> ${service || 'Not specified'}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        
        <p>Best regards,<br>
        BahBeta Technology Solutions Team</p>
        
        <p style="color: #666; font-size: 12px;">
          Office #2211, Bldg #747, Road #1124, Block #311<br>
          Manama, Kingdom of Bahrain<br>
          Phone: +973 33283222
        </p>
      `,
    };
    
    await transporter.sendMail(confirmationMail);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your inquiry! We will contact you within 24 hours.' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Email service is temporarily unavailable. Please contact us directly at support@bahbeta.com or call +973 33283222' 
    });
  }
};