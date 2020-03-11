

$(document).ready(function () {
   /* Scroller */
   $(document).on('click', 'a[href^="#anchor"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top
      }, 1000);
   });

});

$(function(){
   $('#top-slider').slick({
      dots: true,
      prevArrow: false,
      nextArrow: false ,
      
   });
})
  
function passwordToggle(id){
   
   $(`#${id}`).attr(
      'type',
      $(`#${id}`).attr('type') === 'text'?'password':'text'
   );
}
