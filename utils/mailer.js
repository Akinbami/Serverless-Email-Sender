// const nodemailer = require('nodemailer')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const send = (message, recipient, subject) => {
    const msg = {
        to: recipient, // Change to your recipient
        from: 'smartpy.info@gmail.com', // Change to your verified sender
        subject: subject,
        text: message,
        html: `<strong>${message}</strong>`,
    }


    return new Promise((resolve, reject) => {
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                resolve("success")
            })
            .catch((error) => {
                console.error(error)
                reject("failed")
            })

    })
}

module.exports = send;
