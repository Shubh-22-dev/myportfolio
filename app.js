if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express')
const path = require('path')
const nodemailer = require("nodemailer");
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))

const secret = process.env.SECRET || 'thisshouldbeabettersecret'

const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/sendEmail', async (req, res) => {
    const {
        name,
        email,
        subject,
        message
    } = req.body.contact
    try {
        let transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.NODEMAILER_USER, // sender address
            to: process.env.NODEMAILER_MAIL_TO, // list of receivers
            subject: subject, // Subject line
            html: `<h2>${name}</h2>
            <h3>${email}</h3>
            <p>${message}</p>`,
        });
        req.flash('success', "Thanks for contacting me. I'll get back to you soon.")
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})