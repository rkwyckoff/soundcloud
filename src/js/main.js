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
  for (var i=0; i < data.length; i++) {
    var product = data[i];
    var html = boxTemplate(product);
    $('.results').append(html);
  }
}

function boxTemplate(product) {
  return `<div class="title"> ${product.title}</div>`;
}

makeRequest('GET');
