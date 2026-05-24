interface WeeklyLearningContentProps {
  parentName: string;
  teacherName: string;
  className: string;
  weekTitle: number;
  contentTitle: string;
}

export function weeklyLearningContentEmail(
  data: WeeklyLearningContentProps
): string {
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
          Parent Engagement Made Simple
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
          Hello ${data.parentName},
        </h2>

        <p
          style="
            color: #4b5563;
            line-height: 1.7;
            font-size: 15px;
          "
        >
          A new learning content for this week has been published by
          <strong>${data.teacherName}</strong>.
        </p>

        <!-- Content Box -->
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
            <strong>Class:</strong><br />
            ${data.className}
          </p>

          <p style="margin: 0 0 14px; color: #374151;">
            <strong>Week:</strong><br />
            ${data.weekTitle}
          </p>

          <p style="margin: 0; color: #374151;">
            <strong>Learning Content:</strong><br />
            ${data.contentTitle}
          </p>
        </div>

        <p
          style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          "
        >
          Please log in to the Edupal mobile app to review the learning
          activities, assignments, and classroom updates for the week.
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
