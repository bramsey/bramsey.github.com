$(document).ready(function(){
	$('nav a').click(function(e){
		$.scrollTo( this.hash || 0, 500);
		e.preventDefault();
	});
	
	$(".carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
		scroll: 1,
		visible: 1,
		circular: false,
		afterEnd: function(a) {
	        if(a[0].id == "first") {
				$('.prev').hide();
				$('.next').show();
			} else if(a[0].id == "last") {
				$('.prev').show();
				$('.next').hide();
			} else {
				$('.prev').show();
				$('.next').show();
			}
	    }
    });
});