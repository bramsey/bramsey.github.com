module.exports = function( grunt ) {
    'use strict';

    grunt.registerMultiTask('index', 'Builds html files from the given hogan.js templates.', function() {
        var hogan = require('hogan.js'),
            fs = require('fs'),
            title = 'Bill Ramsey',
            projects = [],
            rootDir = this.data,
            layout, pages, projectFiles, projectPage;

        console.log(this.data);
        // compile layout template
        layout = fs.readFileSync(rootDir + 'templates/layout.mustache', 'utf-8');
        layout = hogan.compile(layout);

        // compile project template
        projectPage = fs.readFileSync(rootDir + 'templates/project.mustache', 'utf-8');

        // retrieve project data
        projectFiles = fs.readdirSync(rootDir + 'templates/projects');

        // iterate over projects
        projectFiles.forEach(function(name) {

            if (!name.match(/\.json$/)) return;
            // chop leading digit

            var project = fs.readFileSync(rootDir  + 'templates/projects/' + name, 'utf-8'),
                context = {},
                page;

            project = JSON.parse(project);
            name = name.replace(/^\d/, '');
            context.project = project;
            context.projects = 'selected';
            context.title = name
                .replace(/\.json/, '')
                .replace(/\-.*/, '')
                .replace(/(.)/, function($1) { return $1.toUpperCase() });

            context.title += ' · ' + title;

            page = hogan.compile(projectPage);
            page = layout.render(context, {
                body: page
            });

            fs.writeFileSync(rootDir + name.replace(/json$/, 'html'), page, 'utf-8');

            // populate projects data structure
            projects.push(project);
        });

        // retrieve pages
        pages = fs.readdirSync(rootDir + 'templates/pages');

        // iterate over pages
        pages.forEach(function(name) {

            if (!name.match(/\.mustache$/)) return;

            var page = fs.readFileSync(rootDir + 'templates/pages/' + name, 'utf-8'),
            context = {};

            context[name.replace(/\.mustache$/, '')] = 'selected';
            context.title = name
                .replace(/\.mustache/, '')
                .replace(/\-.*/, '')
                .replace(/(.)/, function($1) { return $1.toUpperCase() });

            if (context.title == 'Projects') {
                context.projectItems = projects;
            }

            if (context.title == 'Index') {
                context.title = title;
            } else {
                context.title += ' · ' + title;
            }

            page = hogan.compile(page);
            page = layout.render(context, {
                body: page
            });

            fs.writeFileSync(rootDir + name.replace(/mustache$/, 'html'), page, 'utf-8');
        });

    });
};

