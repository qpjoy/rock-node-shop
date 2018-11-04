const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'public')))
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
})