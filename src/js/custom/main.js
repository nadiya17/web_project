
// $(document).ready(function () {
//    /* Scroller */
//    $(document).on('click', 'a[href^="#anchor"]', function (event) {
//       event.preventDefault();

//       $('html, body').animate({
//          scrollTop: $($.attr(this, 'href')).offset().top
//       }, 1000);
//    });

// });

// jQuery(document).ready(function(){
     
//    "use strict";
//      $('#slider-carousel').carouFredSel({
//         responsive:true,
//          width:'100%;',
//          circular:true,
//          scroll:
//                 {
//                   items:1,
//                   duration:500,
//                   pouseOnHover:true
//                    },
//                 auto:true,
//                 items:                         
//                        {
//                          visible:
//                                 {
//                                     min:1,
//                                     max:1
//                                    },
//                                     height:"variable"                 
//                         },
//                 pagination:
//                            {
//                                 container:".sliderpager",
//                                 pageAnchorBuilder:false
//                             },
//      });   
     
     
//      $('.portfolio-carousel').carouFredSel({
//         responsive:true,
//          width:'100%;',
//          circular:true,
//          prev:'#prev',
//          next:'#next',
                 
//          scroll:
//                 {
//                   items:1,
//                   duration:500,
//                   pouseOnHover:true
          
//                    },
//                 auto:true,
//                 items:                      
//                         {
//                          visible:
//                                 {
//                                     min:1,
//                                     max:4
//                                    },
//                                     height:"variable"
                                        
//                         },
          
//      });    
     
//      $(window).scroll(function(){
         
//          var top=$(window).scrollTop();
         
//          if(top>=60)
//          {
             
//             $("header").addClass('secondary'); 
             
//          }
         
//          else if($("header").hasClass('secondary')){
                 
//                  $("header").removeClass('secondary');
                 
//                  } 
      
//      }); 
     
//      $('#menu').slicknav({
//          label:'',
         
//      })  
     
     
     
     
     
        
// });

 $(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1100);
    });
});

   

