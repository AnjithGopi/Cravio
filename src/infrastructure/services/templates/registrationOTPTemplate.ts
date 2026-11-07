export function registrationOTPTemplate(otp: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Cravio Account</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <table width="100%" cellpadding="0" cellspacing="0"
          style="background-color: #f4f4f4; padding: 40px 15px;">

          <tr>
            <td align="center">

              <table width="100%" cellpadding="0" cellspacing="0"
                style="
                  max-width: 480px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                ">

                <!-- Header -->
                <tr>
                  <td align="center" style="
                    background-color: #cb202d;
                    padding: 28px 20px;
                  ">
                    <h1 style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 30px;
                      font-weight: bold;
                      letter-spacing: 2px;
                    ">
                      CRAVIO
                    </h1>

                    <p style="
                      margin: 8px 0 0;
                      color: #ffffff;
                      font-size: 13px;
                    ">
                      Good food. Great moments.
                    </p>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 35px 30px;">

                    <h2 style="
                      margin: 0 0 15px;
                      color: #222222;
                      font-size: 23px;
                      text-align: center;
                    ">
                      Verify Your Email
                    </h2>

                    <p style="
                      color: #666666;
                      font-size: 15px;
                      line-height: 24px;
                      text-align: center;
                    ">
                      Welcome to Cravio! We're excited to have you
                      on board. Use the verification code below
                      to complete your registration.
                    </p>

                    <!-- OTP Box -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="
                          background-color: #fff5f5;
                          border: 1px solid #f3d5d7;
                          border-radius: 8px;
                          padding: 22px 10px;
                        ">
                          <p style="
                            margin: 0 0 12px;
                            color: #777777;
                            font-size: 12px;
                            letter-spacing: 2px;
                            text-transform: uppercase;
                          ">
                            Your verification code
                          </p>

                          <h1 style="
                            margin: 0;
                            color: #cb202d;
                            font-size: 36px;
                            letter-spacing: 10px;
                            font-weight: bold;
                          ">
                            ${otp}
                          </h1>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 25px 0 0;
                      color: #555555;
                      font-size: 14px;
                      line-height: 22px;
                      text-align: center;
                    ">
                      This verification code expires in
                      <strong style="color: #cb202d;">5 minutes</strong>.
                    </p>

                    <p style="
                      margin: 20px 0 0;
                      color: #888888;
                      font-size: 13px;
                      line-height: 21px;
                      text-align: center;
                    ">
                      If you didn't request this verification code,
                      you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="
                    background-color: #fafafa;
                    border-top: 1px solid #eeeeee;
                    padding: 20px;
                  ">
                    <p style="
                      margin: 0;
                      color: #999999;
                      font-size: 12px;
                    ">
                      © ${new Date().getFullYear()} Cravio.
                      All rights reserved.
                    </p>

                    <p style="
                      margin: 8px 0 0;
                      color: #aaaaaa;
                      font-size: 11px;
                    ">
                      This is an automated email. Please do not reply.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
}