export const passwordResetSuccessEmail = (userName?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Changed</title>
</head>

<body style="margin:0; padding:0; background:#0f172a; font-family:Inter, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="520" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 10px 30px rgba(0,0,0,0.2);
        ">

          <!-- Top Accent -->
          <tr>
            <td style="background:linear-gradient(90deg,#22c55e,#4ade80); height:6px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:30px 30px 10px 30px; text-align:center;">
              <h1 style="margin:0; font-size:22px; color:#111827;">
                Password Updated
              </h1>
              <p style="margin:8px 0 0 0; font-size:13px; color:#6b7280;">
                Your account security has been updated
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px 30px; color:#374151; font-size:14px; line-height:1.6;">
              
              <p style="margin-top:0;">
                Hi${userName ? ` ${userName}` : 'User'},
              </p>

              <p>
                This is a confirmation that your password was successfully changed.
              </p>

              <!-- Highlight Box -->
              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                padding:15px;
                border-radius:8px;
                margin:20px 0;
                font-size:13px;
                color:#374151;
              ">
                If this was you, you’re all set.<br/>
                If not, your account may be at risk.
              </div>

              <!-- CTA -->
              <div style="text-align:center; margin:25px 0;">
                <a href="https://yourapp.com/login" style="
                  background:#111827;
                  color:#ffffff;
                  padding:12px 22px;
                  border-radius:8px;
                  text-decoration:none;
                  font-weight:600;
                  font-size:14px;
                  display:inline-block;
                ">
                  Secure My Account
                </a>
              </div>

              <p style="font-size:13px; color:#6b7280;">
                If you didn’t make this change, reset your password immediately and contact support.
              </p>

              <p style="margin-top:30px;">
                — Edupal Team
              </p>

            </td>
          </tr>

        </table>

        <!-- Footer -->
        <table width="520" cellpadding="0" cellspacing="0" style="margin-top:15px;">
          <tr>
            <td style="text-align:center; font-size:12px; color:#94a3b8;">
              This is a security alert — no reply needed
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
