const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: 'mali.prathamesh18@gmail.com',
    subject: 'Thanks for joining to Tasks App',
    text: `${name}, Welcome to Tasks app. Let us know how you get along with the app`,
  })
}

const sendCanEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: 'mali.prathamesh18@gmail.com',
    subject: `Goodbye ${name}, Sorry to see you go.`,
    text: `Please tell us why you're leaving, how can we imoprove the experience`,
  })
}

module.exports = {
  sendWelcomEmail,
  sendCanEmail,
}
