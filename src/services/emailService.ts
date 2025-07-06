// Email service configuration for form submissions
// This service handles sending form data to support@bahbeta.com

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

// Option 1: Using EmailJS (Recommended for quick setup)
// EmailJS allows sending emails directly from client-side without backend
export const sendEmailViaEmailJS = async (formData: FormData): Promise<EmailResponse> => {
  try {
    // You need to sign up at https://www.emailjs.com/
    // and get your service_id, template_id, and public_key
    const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

    // Install emailjs-com: npm install emailjs-com
    // import emailjs from 'emailjs-com';
    
    // const response = await emailjs.send(
    //   SERVICE_ID,
    //   TEMPLATE_ID,
    //   {
    //     to_email: 'support@bahbeta.com',
    //     from_name: formData.name,
    //     from_email: formData.email,
    //     company: formData.company,
    //     phone: formData.phone,
    //     service: formData.service,
    //     message: formData.message,
    //   },
    //   PUBLIC_KEY
    // );

    return {
      success: true,
      message: 'Email sent successfully!'
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.'
    };
  }
};

// Option 2: Using a backend API endpoint
export const sendEmailViaAPI = async (formData: FormData): Promise<EmailResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        to: 'support@bahbeta.com',
        subject: `New Contact Form Submission from ${formData.name}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.'
    };
  }
};

// Option 3: Using Vercel Serverless Functions (if deploying on Vercel)
export const sendEmailViaVercel = async (formData: FormData): Promise<EmailResponse> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.'
    };
  }
};

// Format email content for better readability
export const formatEmailContent = (formData: FormData): string => {
  return `
    New Contact Form Submission
    
    Name: ${formData.name}
    Email: ${formData.email}
    Company: ${formData.company}
    Phone: ${formData.phone}
    Service of Interest: ${formData.service}
    
    Message:
    ${formData.message}
    
    ---
    This email was sent from the BahBeta website contact form.
  `;
};

export { type FormData, type EmailResponse };