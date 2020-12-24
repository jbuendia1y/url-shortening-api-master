const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine','ejs')

app.use('/static',express.static(__dirname + '/public'))
app.use('/',require('./routes/router'))

app.listen(app.get('port'))