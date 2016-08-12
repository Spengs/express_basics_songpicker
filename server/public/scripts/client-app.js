$(document).ready(function(){
  getSongs();
  $('#songForm').on('submit', function(){
    event.preventDefault();

    var song = {};//song gets temporarily stored here

    $.each($('#songForm').serializeArray(), function(i, field){
      song[field.name] = field.value;
    });
    console.log('songsubmitted is ', song);

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: song,
      success: function(respose){
        console.log('POST / songs works');
        getSongs();
      },
      error: function(respose){
        console.log('POST / songs did not work');
      }
    })
  });

  function getSongs(){
      $.ajax({
        type: 'GET',
        url: '/songs',
        success: function(songs) {
          $('#song-list').empty();
          songs.forEach(function(song){
            $('#song-list').append('<div>' + "Title: " +song.title + ' ' + "Artist: " + song.artist + " " + song.dateAdded + '</div>');
          });
        },
        error: function(){
          console.log("GET / songs didn't work");
        }
      });
  }

});
