require('dotenv').config();
const path = require('path');
const express = require("express");


const PORT = process.env.PORT || 3001;

const app = express();
const apiKey = process.env.REACT_APP_API_KEY


app.get("/api", (req, res) => { 

    res.json({ key: apiKey});
    
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});