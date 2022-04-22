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
    // res.send("HELLO WORLD!!")
})
// app.get('/sendEmail', async (req, res) => {

//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: "shubhkarmansinghpro789@gmail.com", // generated ethereal user
//             pass: "ShubhPro@09", // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: "shubhkarmansinghpro789@gmail.com", // sender address
//         to: "shubhkarmansingh45@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

// })

app.listen('3000', () => {
    console.log("Server running on 3000")
})