const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.MONGODE_URI, connectOptions)
    .then(() => {
        console.log("MONGO DB connected")
    })
    .catch(err => {
        console.log(err)
    });

const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');

app.use('/api/products',productRoute);
app.use('/api/auth',authRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on localhost:' + PORT));