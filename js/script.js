$(document).ready(function(){
    $('.screenshots img:not(.cover)').hide();
    $('.project-info').hide();
    $('.project').removeClass('maximized');
	$(".carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
		scroll: 1,
		visible: 1,
		circular: false,
		afterEnd: function(a) {
	        if(a[0].id == "first") {
				$('.prev').fadeOut('fast');
				$('.next').fadeIn('fast');
			} else if(a[0].id == "last") {
				$('.prev').fadeIn('fast');
				$('.next').fadeOut('fast');
			} else {
				$('.prev').fadeIn('fast');
				$('.next').fadeIn('fast');
			}
	    }
    });

  $('.project').bind('click', function(e) {
      $(this)
        .toggleClass('maximized')
        .find('.project-info').toggle();
        //.find('img:not(.cover)').toggle();

        $('.project').not(this).toggle();
  }).bind('mouseover', function(e) {
      $(this).css({'border-color': '#222', 'cursor': 'pointer'});
  }).bind('mouseout', function(e) {
      $(this).css({'border-color': '#777', 'cursor': 'default'});
  })
});
