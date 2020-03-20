let express = require('express')
let app = express()
app.get('/user', (req, res) => {
  res.json({name: '老大哥'})
})
app.listen(4001)