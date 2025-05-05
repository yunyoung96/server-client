const express = require('express')
const app = express()

app.use("/", (req, res) => {
    res.send("Server is running.");

    res.status(200).json({ message: 'haha' });
});

app.listen(3000, console.log("Server started on PORT 3000"));