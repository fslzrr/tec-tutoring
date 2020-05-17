import * as functions from "firebase-functions";
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');

// import * as sendMail from ".mailer";   asi se importará en otras files

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        const dest = req.query.dest;

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: dest,
            subject: 'Asesoría confirmada',
            html: ` <h1>Tu asesoría fue confirmada</h1> 
            <p> Maestro: ___</p>
            <p> Hora: ___</p>
            <p> Lugar: ___</p>
            <p> Comunícate con tu maestro en ___ si tienes alguna duda </p>
            <p> Entra a la aplicación para ver más información. ¡Feliz asesoría! </p>
            ` //TODO: poner valores de la asesoría
        };

        return transporter.sendMail(mailOptions, (erro:any, info:any) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sent');
        });
    });    
});