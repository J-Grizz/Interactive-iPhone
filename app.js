const express = require('express'),
  app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function () {
  console.log('Server is running at port: ', port);
});