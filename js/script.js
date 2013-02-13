!function ($) {

    $(window).bind('load', function() {
        var $projectsContainer = $('#projects > .container');
        $('.preview a').each(function(i, link) {
            loadProject(link);
        });
    });

    $(function () {
        /*
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
        */

      $('.preview a').bind('click', maximizeClick);
      $('#projects').delegate('.project', 'click', function(e) {
          if ($(e.target).attr('class') === 'back') e.preventDefault();
          $(this).hide();
          $('.preview').fadeIn();
      });

    });

    function loadProject(link, callback) {
        var $project,
            projectId = $(link).attr('data-project-id');

        if (projectId === undefined) {
            $.get(link.href, function(result) {
                $project = $(result).find('.project');
                $project.css('cursor', 'pointer');
                $project.hide();
                $(link).closest('.container').append($project);
                $(link).attr('data-project-id', $project.attr('id'));
                if (callback) callback($project);
            });
        } else {
            $project = $('#' + projectId);
            if (callback) callback($project);
        }
    }

    function maximizeClick(e) {
        e.preventDefault();

        loadProject(this, function($project) {
            $project.fadeIn();
            $('.preview').hide();
        });
    }
}(window.jQuery);
