!function ($) {
    $(function () {
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

      $('.preview a').bind('click', maximizeClick);
      $('#projects').delegate('.project', 'click', function(e) {
          $(this).hide();
          $('.preview').fadeIn();
      });

    });

    function maximizeClick(e) {
        var that = this, projectId, $project;

        e.preventDefault();

        projectId = $(that).attr('data-project-id');
        console.log(projectId);

        if (projectId) { 
            $project = $('#' + projectId);
            $project.fadeIn();
        } else {
            $.get(that.href, function(data) {
                $project = $(data).find('.project');
                $project.hide();
                $(that).attr('data-project-id', $project.attr('id'));
                $project.css('cursor', 'pointer');
                $(that).closest('.container').append($project);
                $project.fadeIn();
            });
        }
        $('.preview').hide();
    }
}(window.jQuery);
