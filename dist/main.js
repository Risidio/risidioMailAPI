"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors = require('cors');
app.use(cors());
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    pool: true,
    host: "uk53.siteground.eu",
    secureConnection: false,
    port: 465,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.A1,
        pass: process.env.A2
    }
});
transporter.verify((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready to Send");
    }
});
app.post("/submit-project", (req, res) => {
    const projectMailOptions = {
        from: process.env.A1,
        to: process.env.A4,
        subject: `${req.body.name} has sent you a project idea called ${req.body.projectName}!`,
        text: `${req.body.description}`,
        html: `<div style="margin: 20px; text-align: left; border: solid 1px grey; border-radius: 5px; padding: 20px;">
              <h3 style="text-align: center;">You recieved a new message from your Indige Form </h3>
              <hr style="margin: 20px; color: grey;"/>
              <br/>
              <h3>Name:</h3>
              <p>${req.body.name}</p>
              <h3>Email:</h3>
              <p>${req.body.email}</p>
              <h3>Project Name:</h3>
              <p>${req.body.projectName}</p>
              <h3>Project Description:</h3>
              <p>${req.body.description}</p>
            </div>` // html body
    };
    // send mail with defined transport object
    transporter.sendMail(projectMailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ status: 'Request Failed', emailSent: false });
        }
        else {
            console.log('Message sent: ' + info.response);
            res.json({ status: "Email sent", emailSent: true });
        }
    });
});
app.post("/contact", (req, res) => {
    const mailOptions = {
        from: process.env.A1,
        to: process.env.A4,
        subject: `${req.body.contactUsName} sent you a message from the Indige Contact Form!`,
        text: `${req.body.message}`,
        html: `<div style="margin: 20px; text-align: left; border: solid 1px grey; border-radius: 5px; padding: 20px;">
              <h3 style="text-align: center;">You recieved a new message from your Indige Form </h3>
              <hr style="margin: 20px; color: grey;"/>
              <br/>
              <h3>Name:</h3>
              <p>${req.body.contactUsName}</p>
              <h3>Email:</h3>
              <p>${req.body.contactUsEmail}</p>
              <h3>Subject:</h3>
              <p>${req.body.subject}</p>
              <h3>Message below:</h3>
              <p>${req.body.message}</p>
            </div>` // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ status: 'Request Failed', emailSent: false });
        }
        else {
            console.log('Message sent: ' + info.response);
            res.json({ status: "Email sent", emailSent: true });
        }
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=main.js.map