!function ($) {

    // Load project page based on uri hash.
    if (window.location.hash) {
        console.log('hash: ' + window.location.hash);
        var link = $('.preview[href*=' + window.location.hash.slice(1) + ']')[0];
        console.log(link);
        if (link) {
            loadProject(link, function($project) {
                $project.fadeIn('fast');
                $('.preview').hide();
            });
        }
    }

    // Pre-load project pages once the main page is done.
    $(window).bind('load', function() {
        var $projectsContainer = $('#projects > .container');
        $('.preview').each(function(i, link) {
            loadProject(link);
        });
    });

    $(function () {
      $('.preview').bind('click', maximizeClick);

      // Escape maximized project back to the main page.
      $('#projects').on('click', '.project', function(e) {
          $(this).closest('.project').hide();
          $('.preview').fadeIn('fast');

          window.history.pushState(null, null, "projects.html");

          if ($(e.target).attr('class') === 'back') {
              return false;
          }
      });

    });

    // Load's a project from the clicked url.
    function loadProject(link, callback) {
        var $project,
            projectId = $(link).attr('data-project-id');

        if (projectId === undefined) {
            $.get(link.href, function(result) {
                $project = $(result).find('.project');
                $project.css({'cursor': 'pointer', 'display': 'none'});
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
            $project.fadeIn('fast');
            $('.preview').hide();
            window.history.pushState(null, null, "projects.html#" + $project.attr('id'));
        });
    }
}(window.jQuery);
