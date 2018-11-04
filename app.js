const express = require('express')

const app = express()

const port = process.env.PORT || 000

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
})