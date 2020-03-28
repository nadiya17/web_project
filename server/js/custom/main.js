'use strict';

$(document).ready(function () {
  /* Scroller */
  $(document).on('click', 'a[href^="#anchor"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
  });
});

// choose only one choice in checkbox

$('#group input:checkbox').click(function () {
  if ($(this).is(':checked')) {
    $('#group input:checkbox').not(this).prop('checked', false);
  }
});