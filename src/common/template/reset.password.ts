export const resetPasswordEmail = (resetToken: string, userName?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        
        <!-- Card -->
        <table width="500" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:12px;
          padding:30px;
          box-shadow:0 10px 25px rgba(0,0,0,0.2);
        ">
          
          <!-- Header -->
          <tr>
            <td style="text-align:center;">
              <h2 style="margin:0; color:#111827; font-size:22px;">
                Reset Your Password
              </h2>
              <p style="margin-top:8px; font-size:13px; color:#6b7280;">
                Use the code below to continue
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-top:25px; color:#374151; font-size:14px; line-height:1.6;">
              
              <p>Hi${userName ? ` ${userName}` : ''},</p>

              <p>
                We received a request to reset your password. Enter the verification code below in the app to proceed.
              </p>

              <!-- TOKEN BOX -->
              <div style="text-align:center; margin:30px 0;">
                <span style="
                  display:inline-block;
                  background:#f3f4f6;
                  padding:14px 22px;
                  font-size:20px;
                  letter-spacing:4px;
                  font-weight:bold;
                  border-radius:8px;
                  color:#111827;
                  border:1px solid #e5e7eb;
                ">
                  ${resetToken}
                </span>
              </div>

              <!-- Expiry Notice -->
              <div style="
                background:#fff7ed;
                border:1px solid #fed7aa;
                padding:12px;
                border-radius:8px;
                font-size:13px;
                color:#9a3412;
                margin-bottom:20px;
              ">
                This code expires in <strong>30 minutes</strong>.
              </div>

              <p style="font-size:13px; color:#6b7280;">
                If you didn’t request this, you can safely ignore this email.
              </p>

              <p style="margin-top:25px;">
                — Your Team
              </p>

            </td>
          </tr>

        </table>

        <!-- Footer -->
        <table width="500" cellpadding="0" cellspacing="0" style="margin-top:15px;">
          <tr>
            <td style="text-align:center; font-size:12px; color:#94a3b8;">
              This is an automated message — no reply needed
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
