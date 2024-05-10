import express from 'express'

const app = express();
app.use(express.static('Frontend'))

app.get('/', (req, res) => {
    res.send('Server is ready')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})