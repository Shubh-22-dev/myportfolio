if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express')
const path = require('path')
// const ejsMate = require('ejs-mate')
const nodemailer = require("nodemailer");
const app = express()

// app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/sendEmail', async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net", 
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "shubhkarmansingh@shubhisawesome.com", // generated ethereal user
                pass: "3htD+NiT5O", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "shubhkarmansingh@shubhisawesome.com", // sender address
            to: "shubhkarmansingh45@gmail.com", // list of receivers
            subject: "Testing mail from Godaddy", // Subject line
            text: "This is my first mail from Godaddy", // plain text body
            html: "<b>This is my first mail from Godaddy</b>", // html body
        });
        console.log("Email Sent!!!")
    } catch (e) {
        console.log(e)
    }



})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})