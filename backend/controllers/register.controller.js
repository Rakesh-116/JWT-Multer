import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/connect.db.js'

const RegisterController = async (req, res) => {
    const {username, fullName, email, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({
        username
    },process.env.MYSECRET_KEY, {
        expiresIn: "3h"
    })
    try{
        const newUser = await pool.query("INSERT INTO app_user (username, fullname, email, password, token) VALUES($1, $2, $3, $4, $5) RETURNING * ", 
        [username, fullName, email, encryptedPassword, token]);
        res.json(newUser.rows[0]);
    } catch (err){
        console.log(err);
    }
}

export default RegisterController;