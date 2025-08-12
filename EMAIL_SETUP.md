# Email Setup Guide for BahBeta Contact Form

This guide explains how to set up email functionality to send form submissions to support@bahbeta.com (Google Workspace).

## Prerequisites

1. Google Workspace account with access to support@bahbeta.com
2. Vercel account for deployment (recommended)
3. Node.js environment

## Setup Steps

### Step 1: Generate Google App Password

Since support@bahbeta.com is a Google Workspace email, you need to generate an app-specific password:

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification if not already enabled
3. Under "2-Step Verification", click on "App passwords"
4. Select "Mail" and your device
5. Generate and copy the 16-character password

### Step 2: Install Required Dependencies

```bash
npm install nodemailer
npm install --save-dev @vercel/node @types/nodemailer
```

### Step 3: Set Environment Variables

Create a `.env.local` file in your project root:

```env
GMAIL_USER=support@bahbeta.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard:
   - `GMAIL_USER`: support@bahbeta.com
   - `GMAIL_APP_PASSWORD`: your app password

### Step 5: Test the Form

After deployment, test the contact form to ensure emails are being sent correctly.

## Alternative Options

### Option 1: EmailJS (No Backend Required)

1. Sign up at https://www.emailjs.com/
2. Create a service and template
3. Install EmailJS: `npm install emailjs-com`
4. Update the email service to use EmailJS

### Option 2: SendGrid API

1. Create a SendGrid account
2. Verify your domain
3. Generate API key
4. Update the serverless function to use SendGrid

### Option 3: AWS SES

1. Set up AWS SES
2. Verify domain and email
3. Use AWS SDK in serverless function

## Security Best Practices

1. Never commit sensitive credentials to git
2. Always use environment variables
3. Implement rate limiting to prevent spam
4. Add CAPTCHA for additional security
5. Validate and sanitize all form inputs

## Troubleshooting

### Common Issues:

1. **FUNCTION_INVOCATION_FAILED**: 
   - Check that `nodemailer` is in `dependencies` (not `devDependencies`) in package.json
   - Ensure environment variables are set in Vercel dashboard
   - Verify the API endpoint is at `/api/send-email.ts` (not `/api/send-email.js`)

2. **Authentication Failed**: 
   - Check app password is correct (16 characters, no spaces)
   - Verify 2-Step Verification is enabled for the Google account
   - Use an App Password, not your regular Google password

3. **Connection Timeout**: 
   - Ensure correct SMTP settings (smtp.gmail.com, port 587)
   - Check if Google Workspace has any security restrictions

4. **Emails Going to Spam**: 
   - Set up proper SPF/DKIM records for your domain
   - Use a verified domain for sending

5. **Rate Limiting**: 
   - Google has sending limits, consider using SendGrid for high volume

6. **Environment Variables Missing**:
   - In Vercel: Go to Project Settings > Environment Variables
   - Add: `GMAIL_USER` and `GMAIL_APP_PASSWORD`
   - Redeploy after adding environment variables

### Testing Locally:

Create a `.env.local` file and run:
```bash
vercel dev
```

This will simulate the serverless environment locally.

## Form Features

The current implementation includes:
- ✅ Form validation
- ✅ Loading states during submission
- ✅ Success/error messages
- ✅ Confirmation email to user
- ✅ Detailed email to support@bahbeta.com
- ✅ Fallback contact information on error

## Email Content

### To support@bahbeta.com:
- Full form details
- Reply-to set to user's email
- Formatted HTML email

### To User (Confirmation):
- Thank you message
- Summary of their inquiry
- Expected response time
- Company contact details

## Next Steps

1. Set up domain verification for better deliverability
2. Implement webhook for CRM integration
3. Add email templates for different service types
4. Set up automated responses based on service selection