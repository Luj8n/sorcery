/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"
import mailClient from "integrations/mailClient"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  const msg = {
    from: process.env.MAILER || "ERROR",
    to,
    subject: "Sorcery | Your Password Reset Instructions",
    html: `
      <h3>
        Hi,
        <br>
        There was a request to change your password!
        <br>
        If you did not make this request then please ignore this email.
        <br>
        Otherwise, please click this link to change your password:
        <a href="${resetUrl}">
          ${resetUrl}
        </a>
      </h3>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        await mailClient.send(msg)
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
