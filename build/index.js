#!/usr/bin/env node
var hogan = require('hogan.js'),
    fs = require('fs'),
    prod = process.argv[2] == 'production',
    title = 'Bill Ramsey',
    projects = [],
    layout, pages, projectFiles, projectPage;

// compile layout template
layout = fs.readFileSync(__dirname + '/../templates/layout.mustache', 'utf-8');
layout = hogan.compile(layout);

// compile project template
projectPage = fs.readFileSync(__dirname + '/../templates/project.mustache', 'utf-8');

// retrieve project data
projectFiles = fs.readdirSync(__dirname + '/../templates/projects');

// iterate over projects
projectFiles.forEach(function(name) {

    if (!name.match(/\.json$/)) return;
    // chop leading digit

    var project = fs.readFileSync(__dirname  + '/../templates/projects/' + name, 'utf-8'),
        context = {},
        page;

    project = JSON.parse(project);
    name = name.replace(/^\d/, '');
    context.project = project;
    context.projects = 'selected';
    context.production = prod;
    context.title = name
        .replace(/\.json/, '')
        .replace(/\-.*/, '')
        .replace(/(.)/, function($1) { return $1.toUpperCase() });

    context.title += ' · ' + title;

    page = hogan.compile(projectPage);
    page = layout.render(context, {
        body: page
    });

    fs.writeFileSync(__dirname + '/../' + name.replace(/json$/, 'html'), page, 'utf-8');

    // populate projects data structure
    projects.push(project);
});

// retrieve pages
pages = fs.readdirSync(__dirname + '/../templates/pages');

// iterate over pages
pages.forEach(function(name) {

    if (!name.match(/\.mustache$/)) return;

    var page = fs.readFileSync(__dirname  + '/../templates/pages/' + name, 'utf-8'),
    context = {};

    context[name.replace(/\.mustache$/, '')] = 'selected';
    context.production = prod;
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

    fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8');
});
