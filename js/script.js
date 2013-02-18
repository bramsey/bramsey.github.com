!function ($) {
    var previewSelector = '.project-previews, .section-title';

    // Load project page based on uri hash.
    if (window.location.hash) {
        var link = $('.project-previews__preview[href*=' + window.location.hash.slice(1) + ']')[0];
        if (link) {
            loadProject(link, function($project) {
                goToProject($project);
            });
        }
    }

    // Pre-load project pages once the main page is done.
    $(window).bind('load', function() {
        $('.project-previews__preview').each(function(i, link) {
            loadProject(link);
        });
    });

    window.onpopstate = function(e) {
        //console.log('popping state: ' + JSON.stringify(e.state, null, '  '));
        if (e.state && e.state.preview) {
            //console.log('preview: ' + e.state.preview);
            goToPreview(e.state.preview);
        } else if (e.state && e.state.project) {
            //console.log('project: ' + e.state.project);
            goToProject($('#' + e.state.project));
        }
    };

    $(function () {
      $('.project-previews__preview').bind('click', maximizeClick);

      // Escape maximized project back to the main page.
      $('.projects').on('click', '.project', function(e) {
        var $project = $(this).closest('.project'),
            projectId = $project.attr('id');

        goToPreview(projectId);
        window.history.replaceState({'project': projectId}, null, "projects.html#" + projectId);
        //console.log('replacing state: ' + JSON.stringify({'project': projectId}, null, '  '));
        window.history.pushState({'preview': projectId}, null, "projects.html");
        //console.log('pushing state: ' + JSON.stringify({'preview': projectId}, null, '  '));

        if ($(e.target).attr('class') === 'back') {
          return false;
        }
      });

    });

    // Goes to the specified preview.
    function goToPreview(projectId) {
        var $preview = $('.project-previews__preview[data-project-id*=' + projectId + ']');
        $('#' + projectId).hide();
        $(previewSelector).fadeIn('fast');
        $.scrollTo($preview.offset().top - 16);
    }

    // Goes to the specified project.
    function goToProject($project) {
        $project.fadeIn('fast');
        $(previewSelector).hide();
        $.scrollTo(0);
    }

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
            var projectId = $project.attr('id');
            goToProject($project);
            window.history.replaceState({'preview': projectId}, null, "projects.html");
            //console.log('replacing state: ' + JSON.stringify({'preview': projectId}, null, '  '));
            window.history.pushState({'project': projectId}, null, "projects.html#" + projectId);
            //console.log('pushing state: ' + JSON.stringify({'project': projectId}, null, '  '));
        });
    }
}(window.jQuery);
