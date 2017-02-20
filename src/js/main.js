import token from './token';

import $ from 'jquery';

// building a request  =>> reqType = 'GET', 'POST'
function makeRequest(reqType) {
  $.ajax({
    url: `http://api.soundcloud.com/tracks?client_id=${token}`,
    dataType: 'json',
    method: reqType,
    success: function(data) {
      placeBox(data);
    }
  });
}

function placeBox(data) {
  console.log(data);
  for (var i=0; i < 20; i++) {
    var product = data[i];
    if (!product.artwork_url) {
      product.artwork_url = 'images/carlostocat.gif';
    }
    var html = boxTemplate(product);
    $('.results').append(html);
  }
}

function boxTemplate(product) {
  return `

        <div class="resultsBox">
          <img src= "${product.artwork_url}">
          <div class="title"> ${product.title}</div>
          <div class="artist"> ${product.user.username}</div>
        </div>`;

}

makeRequest('GET');
