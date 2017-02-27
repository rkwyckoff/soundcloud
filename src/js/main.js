import token from './token';
import $ from 'jquery';

// building a request  =>> reqType = 'GET', 'POST'
function makeRequest(query) {
  $.ajax({
    url:  `http://api.soundcloud.com/tracks?client_id=${token}`,
    dataType: 'json',
    data: {
      q: query
    },
    method: 'GET',
    error: function(error) {
      console.log('There was an error!', error);
    },
    success: function(data) {
      placeBox(data);
    }
  });
}

function placeBox(data) {

  for (var i=0; i < data.length; i++) {

    var product = data[i];
    if (!product.artwork_url) {
      product.artwork_url = 'images/carlostocat.gif';
    }

    var html = boxTemplate(product);
    $('.results').append(html);
  }
  $('.resultsBox').click(getStream);
}

function boxTemplate(product) {
  return `
    <div class="resultsBox" stream_url="${product.stream_url}">
      <img src="${product.artwork_url}">
      <div class="title"> ${product.title}</div>
      <div class="artist"> ${product.user.username}</div>
    </div>`;
}

function getStream (event) {
  $('.player').empty();
  var url = `${event.currentTarget.attributes.stream_url.value}?client_id=${token}`;
  console.log(url);
  var audio  = document.createElement('audio');
  audio.src  = url;
  audio.id = 'audioPlayer';
  audio.autoplay = true;
  $('.player').append(audio);
}

function searchButton() {
  $('.results').empty();
  // get val of input field then log it
  var query = $('.searchField').val();
  makeRequest(query);
}


$('.searchButton').click(searchButton);
