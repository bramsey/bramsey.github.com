!function ($) {

    // Load project page based on uri hash.
    if (window.location.hash) {
        console.log('hash: ' + window.location.hash);
        var link = $('.project-previews__preview[href*=' + window.location.hash.slice(1) + ']')[0];
        if (link) {
            loadProject(link, function($project) {
                $project.fadeIn('fast');
                $('.project-previews').hide();
            });
        }
    }

    // Pre-load project pages once the main page is done.
    $(window).bind('load', function() {
        $('.project-previews__preview').each(function(i, link) {
            loadProject(link);
        });
    });

    $(function () {
      $('.project-previews__preview').bind('click', maximizeClick);

      // Escape maximized project back to the main page.
      $('.projects').on('click', '.project', function(e) {
        var $project = $(this).closest('.project');
        $project.hide();
        $('.project-previews').fadeIn('fast');

        $.scrollTo($('.project-previews__preview[data-project-id*=' + $project.attr('id') + ']').offset().top - 16);
        window.history.pushState(null, null, "projects.html");

        if ($(e.target).attr('class') === 'back') {
          return false;
        }
      });

    });

    // Loads a project from the clicked url.
    function loadProject(link, callback) {
        var $project,
            projectId = $(link).attr('data-project-id');

        if (projectId === undefined) {
            $.get(link.href, function(result) {
                $project = $(result).find('.project');
                $project.css({'cursor': 'pointer', 'display': 'none'});
                $(link).closest('.projects').append($project);
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
            $('.project-previews').hide();
            //$.scrollTo($project);
            $.scrollTo(0);
            window.history.pushState(null, null, "projects.html#" + $project.attr('id'));
        });
    }
}(window.jQuery);
