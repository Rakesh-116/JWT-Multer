import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/connect.db.js';
import nodemailer from 'nodemailer';

const LoginController = async (req, res) => {
    const {username, password} = req.body;
    const user = await pool.query('SELECT * FROM app_user WHERE username = $1', [username]);
    if (user.rows.length === 0) {
        return res.json({
            message: "User not registered"
        })
    }
    const hashedPassword = user.rows[0].password;

    try {
        if (user && await bcrypt.compare(password, hashedPassword)) {
            const token = jwt.sign({
                id: user.rows[0].id
            }, process.env.MYSECRET_KEY, {
                expiresIn: '1h'
            })

            const transporter = nodemailer.createTransport({
                host: "live.smtp.mailtrap.io",
                port: 587,
                secure: false,
                auth: {
                user: "api",
                pass: "22e27a87db9eb43bfdc2d1f922bfecd2",
                },
            });
            const info = await transporter.sendMail({
              from: 'info@demomailtrap.com',
              to: "rakeshwgpcgr@gmail.com",
              subject: "Notification",
              text: "New User Logged In",
              html: `Username: ${user.rows[0].username}\nEmail: ${user.rows[0].email}`,
            });
          
            console.log("Message sent: %s", info.messageId);

            const options = {
                expires: new Date(Date.now() + 1*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        } else {
            return res.json({
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: "An error occurred while comparing passwords"
        });
    }
}

export default LoginController;