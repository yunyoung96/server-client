const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ message: 'haha' });
});

app.listen(3000, console.log("Server started on PORT 3000"));