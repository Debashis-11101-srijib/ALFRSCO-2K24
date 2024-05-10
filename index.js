const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('Frontend'))

// app.use('/login',express.static(path.join(__dirname + '/Frontend/login.html')))

// app.get('/', (req, res) => {
//     res.send('Server is ready')
// })

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/Frontend/login.html'))
    // res.send('Server is ready')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})