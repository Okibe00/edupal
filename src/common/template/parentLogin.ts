interface User {
  name: string;
  email: string;
  password: string;
}

export function loginCredentialEmail(user: User): string {
  return `
  <div
    style="
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f4f7fb;
      padding: 40px 20px;
    "
  >
    <div
      style="
        max-width: 500px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      "
    >

      <!-- Header -->
      <div
        style="
          background: #2563eb;
          padding: 30px 20px;
          text-align: center;
        "
      >
        <h1
          style="
            margin: 0;
            color: white;
            font-size: 28px;
          "
        >
          Edupal
        </h1>

        <p
          style="
            margin-top: 8px;
            color: #dbeafe;
            font-size: 14px;
          "
        >
          Parent engagement Made Simple
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px;">

        <h2
          style="
            margin-top: 0;
            color: #111827;
            font-size: 24px;
          "
        >
          Welcome ${user.name}
        </h2>

        <p
          style="
            color: #4b5563;
            line-height: 1.7;
            font-size: 15px;
          "
        >
          Your Edupal account has been created successfully.
          Use the credentials below to sign in to the mobile app.
        </p>

        <!-- Credentials Box -->
        <div
          style="
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin: 28px 0;
          "
        >
          <p style="margin: 0 0 14px; color: #374151;">
            <strong>Email:</strong><br />
            ${user.email}
          </p>

          <p style="margin: 0; color: #374151;">
            <strong>Temporary Password:</strong><br />
            ${user.password}
          </p>
        </div>

        <p
          style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          "
        >
          Please change your password after your first login for security reasons.
        </p>

      </div>

      <!-- Footer -->
      <div
        style="
          border-top: 1px solid #e5e7eb;
          padding: 18px;
          text-align: center;
          background: #f9fafb;
        "
      >
        <p
          style="
            margin: 0;
            font-size: 12px;
            color: #9ca3af;
          "
        >
          Edupal • Smart School Communication Platform
        </p>
      </div>

    </div>
  </div>
`;
}
