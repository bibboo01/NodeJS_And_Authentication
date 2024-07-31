const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    const {
        user_name,
        password
    } = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new User({
            user_name,
            password: hashedpassword
        });
        await user.save();

        console.log("User registered");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

exports.login = async (req, res) => {
    const {
        user_name,
        password
    } = req.body;
    try {
        const user = await User.findOne({
            user_name
        });
        if (!user) return res.status(400).send('user not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credntials');
        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        });
        const refreshToken = jwt.sign({
            userId: user._id
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "5m"
        });
        res.json({
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.log(err);
    }
}


exports.refresh = async (req, res) => {
    const {
        token
    } = req.body;
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.senstatus(403);
        const accessToken = jwt.sign({
            userId: user.userId
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });
        res.json({
            accessToken
        });
    })
}