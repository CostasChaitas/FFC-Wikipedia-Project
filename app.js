$('document').ready(function() {

  $('.custom-icon, .icon-close').click(function() {
    $('.searchBox').children().toggleClass('hide');
    $('.searchInput').toggleClass('searchInput-show');
    $('.icon-close').toggleClass('icon-close-show');
  });

  $('.icon-close').click(function() {
    $('#search').val('');
    $('.row').html('');
  });



  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&continue=&callback=?&gsrsearch=";

  $('#search').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      search($('#search').val());
    }
  });

  function search(value) {
    $(".row").empty();
    $.getJSON(url + value, function(data) {
      console.log(data);
      var html = '';
      value.pageID = search($('#search').val());
      $.each(data.query.pages, function(key, value) {

        html +=
          '<div class="col-lg-12 des">' +
          '<a href="http://en.wikipedia.org?curid=' + value.pageid + '" target="_blank">' +
          '<div class="result-title">' + value.title + '</div>' +
          '<div class="snippet">' + value.extract + '</div>' +
          '</a>' +
          '</div>';
      });
      $('.row').append(html);
    });
  }

});
