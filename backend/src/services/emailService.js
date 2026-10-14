import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Helper to escape HTML entities in user input to prevent HTML injection in email clients
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Get or initialize Resend client safely.
 * Returns null if not configured, allowing registration flow to complete without crashing.
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_your_api_key' || apiKey.trim() === '') {
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Generate email-compatible HTML template with inline styles
 */
function buildConfirmationHtml({ name, email, phone, college, department, year, replyTo }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCollege = escapeHtml(college);
  const safeDept = escapeHtml(department);
  const safeYear = escapeHtml(year);
  const safeReplyTo = escapeHtml(replyTo || 'iic@vvit.net');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASTRION 2K26 Workshop Registration Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #030712; width: 100%; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0b1329; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #091738 0%, #111c44 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #00e5ff;">
              <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #00e5ff; text-transform: uppercase; margin-bottom: 8px;">ASTRION 2K26 · IIC WORKSHOP</span>
              <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">VENTURE LAUNCHPAD</h1>
              <p style="margin: 0; font-size: 13px; color: #94a3b8; font-style: italic;">From Idea Generation to Business Creation</p>
              <div style="margin-top: 14px; font-size: 11px; letter-spacing: 1px; color: #cbd5e1; text-transform: uppercase;">
                Institution's Innovation Council (IIC), VVIT University
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #ffffff; font-weight: 600;">
                Dear ${safeName},
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                Your registration for the <strong>Venture Launchpad</strong> workshop at <strong>ASTRION 2K26</strong> has been officially received and recorded in our institutional portal.
              </p>

              <!-- Workshop Core Details Strip -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f1c3f; border: 1px solid #1e3a6a; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; width: 38%;"><strong>DATES:</strong></td>
                        <td style="padding: 6px 0; font-size: 13px; color: #00e5ff; font-weight: 700;">23–24 October 2026 (Two-Day Event)</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;"><strong>VENUE:</strong></td>
                        <td style="padding: 6px 0; font-size: 13px; color: #ffffff;">VVIT University Campus</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;"><strong>ORGANIZER:</strong></td>
                        <td style="padding: 6px 0; font-size: 13px; color: #ffffff;">Institution's Innovation Council (IIC)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Registration Data Summary -->
              <h3 style="margin: 0 0 12px 0; font-size: 13px; letter-spacing: 1px; color: #00e5ff; text-transform: uppercase;">
                REGISTRATION CREDENTIALS
              </h3>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #070e20; border: 1px solid #162447; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 5px 0; font-size: 12px; color: #64748b; width: 40%;">FULL NAME</td>
                        <td style="padding: 5px 0; font-size: 13px; color: #ffffff; font-weight: 600;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 12px; color: #64748b;">REGISTERED EMAIL</td>
                        <td style="padding: 5px 0; font-size: 13px; color: #ffffff;">${safeEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 12px; color: #64748b;">CONTACT PHONE</td>
                        <td style="padding: 5px 0; font-size: 13px; color: #ffffff;">${safePhone}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 12px; color: #64748b;">COLLEGE / INSTITUTION</td>
                        <td style="padding: 5px 0; font-size: 13px; color: #ffffff;">${safeCollege}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 12px; color: #64748b;">DEPARTMENT / BRANCH</td>
                        <td style="padding: 5px 0; font-size: 13px; color: #ffffff;">${safeDept}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 12px; color: #64748b;">YEAR OF STUDY</td>
                        <td style="padding: 5px 0; font-size: 13px; color: #ffffff;">${safeYear}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Notice Box -->
              <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 1.6; color: #94a3b8; background-color: rgba(0, 229, 255, 0.05); border-left: 3px solid #00e5ff; padding: 12px 16px; border-radius: 4px;">
                <strong>Notice:</strong> Please retain this email for your reference. Detailed schedule notices, venue hall allocations, and session materials will be communicated prior to the workshop dates.
              </p>

              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #cbd5e1;">
                For any inquiries or registration assistance, reply directly to this email or connect with the IIC coordinators at <a href="mailto:${safeReplyTo}" style="color: #00e5ff; text-decoration: none;">${safeReplyTo}</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #050b18; padding: 20px 28px; text-align: center; border-top: 1px solid #162447;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; letter-spacing: 0.5px;">
                ASTRION 2K26 · INSTITUTION'S INNOVATION COUNCIL (IIC), VVIT UNIVERSITY
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                This is an automated confirmation sent to ${safeEmail}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate plain-text fallback alternative for email clients without HTML support
 */
function buildConfirmationText({ name, email, phone, college, department, year, replyTo }) {
  const contact = replyTo || 'iic@vvit.net';

  return `ASTRION 2K26 — WORKSHOP REGISTRATION CONFIRMATION
Institution's Innovation Council (IIC), VVIT University
==============================================================

Dear ${name},

Your registration for the Venture Launchpad workshop at ASTRION 2K26 has been officially received and recorded.

WORKSHOP DETAILS:
- Title: Venture Launchpad: From Idea Generation to Business Creation
- Dates: 23–24 October 2026 (Two-Day Event)
- Venue: VVIT University Campus
- Organizer: Institution's Innovation Council (IIC), VVIT University

YOUR SUBMITTED CREDENTIALS:
- Full Name: ${name}
- Email: ${email}
- Phone: ${phone}
- College: ${college}
- Department: ${department}
- Year of Study: ${year}

Please retain this email confirmation for your records. Detailed schedule updates and venue access clearances will be communicated prior to the event.

If you have any questions or require assistance, you may contact the organizers at: ${contact}

==============================================================
ASTRION 2K26 · VVIT University
`;
}

/**
 * Send registration confirmation email via Resend
 * Returns object indicating success/failure and diagnostics without exposing credentials.
 *
 * @param {Object} registration - Validated registration record
 * @returns {Promise<{success: boolean, id?: string, error?: string, skipped?: boolean}>}
 */
export async function sendRegistrationConfirmationEmail(registration) {
  const resend = getResendClient();

  // If Resend is not configured, report skipped gracefully
  if (!resend) {
    console.warn('[EMAIL WARNING] Resend API key is not configured (RESEND_API_KEY). Confirmation email skipped.');
    return {
      success: false,
      skipped: true,
      error: 'Resend API key not configured on server.',
    };
  }

  const emailFrom = process.env.EMAIL_FROM || 'ASTRION 2K26 <registrations@your-verified-domain.com>';
  const emailReplyTo = process.env.EMAIL_REPLY_TO;

  const html = buildConfirmationHtml({
    ...registration,
    replyTo: emailReplyTo,
  });

  const text = buildConfirmationText({
    ...registration,
    replyTo: emailReplyTo,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [registration.email],
      replyTo: emailReplyTo || undefined,
      subject: 'Your ASTRION 2K26 Venture Launchpad Registration Confirmation',
      html,
      text,
    });

    if (error) {
      console.error('[EMAIL ERROR] Resend provider returned an error:', {
        name: error.name,
        message: error.message,
      });
      return {
        success: false,
        error: error.message || 'Failed to dispatch email via Resend.',
      };
    }

    console.log(`[EMAIL SUCCESS] Confirmation email dispatched via Resend. Message ID: ${data?.id}`);
    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    console.error('[EMAIL ERROR] Unexpected exception during email dispatch:', {
      message: err.message,
    });
    return {
      success: false,
      error: err.message || 'Unexpected network error during email dispatch.',
    };
  }
}
