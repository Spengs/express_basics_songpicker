var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: true}));

app.post('/songs', function(req, res){
  var d = new Date();
  var dateAdded = (d.getMonth() + 1) + '-' + (d.getDate()) + '-' + d.getFullYear();
  var emptyField = false;
  var dupSong = false;
  var song = req.body;
  song.dateAdded = dateAdded;
  console.log(req.body);
  if(song.title == '' || song.artist == ''){
    emptyField = true;
    console.log("No empty fields!");
  }
  for(var i = 0; i < songs.length; i++){
    if(song.title == songs[i].title && song.artist == songs[i].artist){
      dupSong = true;
      console.log("No duplicates");
    }
  }

    if(emptyField == true || dupSong == true){
      res.sendStatus(400);
      console.log('You broke it!');
    }else{
      res.sendStatus(200);
      songs.push(song);
  }
  console.log('req.body:', req.body);




});

app.get('/songs', function(req, res){
  res.send(songs);
})

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function(){
  console.log('server now running at port ', app.get('port'));
});
