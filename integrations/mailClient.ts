import sgMail from "@sendgrid/mail"

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY ??
    (() => {
      throw "SENDGRID_API_KEY was not found"
    })()
)

export default sgMail
