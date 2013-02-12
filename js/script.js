$(document).ready(function(){
    $('.card:not(.cover), .card-info').hide();
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
        .hide()
        .fadeIn('medium')
        .find('.project-info, .card-info, .card:not(.cover)').toggle();

        $('.project').not(this).toggle();
  }).bind('mouseover', function(e) {
      $(this).css({ 'cursor': 'pointer'});
  }).bind('mouseout', function(e) {
      $(this).css({ 'cursor': 'default'});
  })
});
