import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

// Generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email with Vernovate branding
export const sendOTPEmail = async (email, otp, type = 'verify') => {
  const subjects = {
    signup: 'Verify Your Vernovate Account',
    login: 'Vernovate Login Verification',
    reset: 'Reset Your Vernovate Password',
  };

  const headings = {
    signup: 'Welcome to Vernovate!',
    login: 'Login Verification',
    reset: 'Password Reset Request',
  };

  const messages = {
    signup: 'Thank you for joining Vernovate. Please verify your email to complete registration.',
    login: 'A login attempt was made on your account. Use the code below to continue.',
    reset: 'We received a request to reset your password. Use the code below to proceed.',
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:520px;margin:40px auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#ffffff 0%,#fafafa 100%);padding:32px 40px;text-align:center;border-bottom:2px solid #FFB000;">
          <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-1px;">
            <span style="color:#1a1a1a;">VERNO</span><span style="color:#FFB000;">VATE</span>
          </h1>
          <p style="color:#999;font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">Innovate the Future</p>
        </div>

        <!-- Content -->
        <div style="padding:40px;">
          <h2 style="color:#1a1a1a;font-size:22px;margin:0 0 12px;font-weight:700;">${headings[type]}</h2>
          <p style="color:#555555;font-size:14px;line-height:1.6;margin:0 0 32px;">${messages[type]}</p>
          
          <!-- OTP Code -->
          <div style="background:linear-gradient(135deg,rgba(255,176,0,0.08) 0%,rgba(255,176,0,0.04) 100%);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:24px;text-align:center;margin:0 0 32px;">
            <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Your Verification Code</p>
            <div style="font-size:36px;font-weight:800;letter-spacing:8px;color:#D49200;font-family:monospace;">${otp}</div>
          </div>

          <p style="color:#777;font-size:13px;line-height:1.5;margin:0 0 8px;">⏰ This code expires in <strong style="color:#D49200;">5 minutes</strong>.</p>
          <p style="color:#999;font-size:12px;line-height:1.5;margin:0;">If you didn't request this, ignore this email.</p>
        </div>

        <!-- Footer -->
        <div style="background:#fafafa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#aaa;font-size:11px;margin:0;">© ${new Date().getFullYear()} Vernovate Private Limited. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Vernovate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subjects[type] || 'Vernovate Verification',
    html,
  };

  await getTransporter().sendMail(mailOptions);
};

// ──────────────────────────────────────
// Confirmation email when user submits a form
// ──────────────────────────────────────
export const sendConfirmationEmail = async (email, name, formType = 'contact') => {
  const typeLabels = {
    contact: 'Contact Message',
    application: 'Job Application',
    project: 'Project Inquiry',
  };

  const typeMessages = {
    contact: 'Your message has been received by our team. We typically respond within 24–48 hours.',
    application: 'Your job application has been received. Our HR team will review it and get back to you shortly.',
    project: 'Your project inquiry has been received. Our team will review the details and reach out to discuss next steps.',
  };

  const label = typeLabels[formType] || 'Message';
  const msg = typeMessages[formType] || typeMessages.contact;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:520px;margin:40px auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#ffffff 0%,#fafafa 100%);padding:32px 40px;text-align:center;border-bottom:2px solid #FFB000;">
          <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-1px;">
            <span style="color:#1a1a1a;">VERNO</span><span style="color:#FFB000;">VATE</span>
          </h1>
          <p style="color:#999;font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">Innovate the Future</p>
        </div>

        <!-- Content -->
        <div style="padding:40px;">
          <h2 style="color:#1a1a1a;font-size:22px;margin:0 0 12px;font-weight:700;">Thank you, ${name}!</h2>
          <p style="color:#555555;font-size:14px;line-height:1.6;margin:0 0 24px;">${msg}</p>
          
          <!-- Confirmation box -->
          <div style="background:linear-gradient(135deg,rgba(34,197,94,0.08) 0%,rgba(34,197,94,0.04) 100%);border:1px solid rgba(34,197,94,0.25);border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="color:#16a34a;font-size:14px;font-weight:600;margin:0;">✓ ${label} Received Successfully</p>
          </div>

          <p style="color:#777;font-size:13px;line-height:1.5;margin:0 0 8px;">If you have any urgent questions, feel free to reply to this email or reach out to us at <a href="mailto:vernovate@gmail.com" style="color:#FFB000;text-decoration:none;font-weight:600;">vernovate@gmail.com</a>.</p>
          <p style="color:#999;font-size:12px;line-height:1.5;margin:16px 0 0;">We look forward to working with you!</p>
        </div>

        <!-- Footer -->
        <div style="background:#fafafa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#888;font-size:11px;margin:0 0 4px;">
            <a href="https://vernovate.com" style="color:#FFB000;text-decoration:none;font-weight:600;">vernovate.com</a>
          </p>
          <p style="color:#aaa;font-size:11px;margin:0;">© ${new Date().getFullYear()} Vernovate Private Limited. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Vernovate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We received your ${label.toLowerCase()} — Vernovate`,
    html,
  };

  await getTransporter().sendMail(mailOptions);
};

// ──────────────────────────────────────
// Admin notification when a form is submitted
// ──────────────────────────────────────
export const sendAdminNotificationEmail = async ({ name, email, subject, message, type }) => {
  const typeLabels = {
    contact: 'Contact Message',
    application: 'Job Application',
    project: 'Project Inquiry',
  };

  const label = typeLabels[type] || 'New Message';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:520px;margin:40px auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#ffffff 0%,#fafafa 100%);padding:32px 40px;text-align:center;border-bottom:2px solid #FFB000;">
          <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-1px;">
            <span style="color:#1a1a1a;">VERNO</span><span style="color:#FFB000;">VATE</span>
          </h1>
          <p style="color:#999;font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">Admin Notification</p>
        </div>

        <!-- Content -->
        <div style="padding:40px;">
          <h2 style="color:#1a1a1a;font-size:22px;margin:0 0 12px;font-weight:700;">New ${label}</h2>
          <p style="color:#555555;font-size:14px;line-height:1.6;margin:0 0 24px;">You have received a new submission on the Vernovate website.</p>
          
          <!-- Details -->
          <div style="background:linear-gradient(135deg,rgba(255,176,0,0.08) 0%,rgba(255,176,0,0.04) 100%);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:24px;margin:0 0 24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;width:80px;">Name</td>
                <td style="color:#333;font-size:14px;padding:6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Email</td>
                <td style="color:#333;font-size:14px;padding:6px 0;"><a href="mailto:${email}" style="color:#FFB000;text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Type</td>
                <td style="color:#333;font-size:14px;padding:6px 0;">${label}</td>
              </tr>
              ${subject ? `<tr>
                <td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Subject</td>
                <td style="color:#333;font-size:14px;padding:6px 0;">${subject}</td>
              </tr>` : ''}
            </table>
          </div>

          <!-- Message -->
          <div style="background:#f9fafb;border:1px solid #e5e5e5;border-radius:12px;padding:24px;margin:0 0 24px;">
            <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px;">Message</p>
            <p style="color:#333;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
          </div>

          <p style="color:#777;font-size:13px;line-height:1.5;margin:0;">You can reply to this submission from the <a href="${process.env.CLIENT_URL || 'https://vernovate.com'}/admin/messages" style="color:#FFB000;text-decoration:none;font-weight:600;">Admin Dashboard</a>.</p>
        </div>

        <!-- Footer -->
        <div style="background:#fafafa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#aaa;font-size:11px;margin:0;">© ${new Date().getFullYear()} Vernovate Private Limited. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Vernovate" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject: `[${label}] ${subject || `New submission from ${name}`}`,
    html,
  };

  await getTransporter().sendMail(mailOptions);
};

// ──────────────────────────────────────
// Reply email from admin to user
// ──────────────────────────────────────
export const sendReplyEmail = async (email, recipientName, replyMessage, originalSubject) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:520px;margin:40px auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#ffffff 0%,#fafafa 100%);padding:32px 40px;text-align:center;border-bottom:2px solid #FFB000;">
          <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-1px;">
            <span style="color:#1a1a1a;">VERNO</span><span style="color:#FFB000;">VATE</span>
          </h1>
          <p style="color:#999;font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">Innovate the Future</p>
        </div>

        <!-- Content -->
        <div style="padding:40px;">
          <h2 style="color:#1a1a1a;font-size:22px;margin:0 0 12px;font-weight:700;">Hi ${recipientName},</h2>
          <p style="color:#555555;font-size:14px;line-height:1.6;margin:0 0 24px;">Thank you for reaching out to us. Here is our response regarding your inquiry:</p>
          
          <!-- Reply content -->
          <div style="background:linear-gradient(135deg,rgba(255,176,0,0.08) 0%,rgba(255,176,0,0.04) 100%);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:24px;margin:0 0 24px;">
            <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px;">Our Response</p>
            <p style="color:#333;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${replyMessage}</p>
          </div>

          <p style="color:#777;font-size:13px;line-height:1.5;margin:0 0 8px;">If you have additional questions, feel free to reply to this email.</p>
          
          <!-- Signature -->
          <div style="margin-top:28px;padding-top:20px;border-top:1px solid #eee;">
            <p style="color:#1a1a1a;font-size:14px;font-weight:600;margin:0 0 4px;">The Vernovate Team</p>
            <p style="color:#999;font-size:12px;margin:0;">
              <a href="https://vernovate.com" style="color:#FFB000;text-decoration:none;">vernovate.com</a> · 
              <a href="mailto:vernovate@gmail.com" style="color:#FFB000;text-decoration:none;">vernovate@gmail.com</a>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#fafafa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#aaa;font-size:11px;margin:0;">© ${new Date().getFullYear()} Vernovate Private Limited. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Vernovate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Re: ${originalSubject || 'Your inquiry'} — Vernovate`,
    html,
  };

  await getTransporter().sendMail(mailOptions);
};
