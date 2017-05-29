/*global angular*/
(function () {
    'use strict';

    /**
     * View paths. It has locations of the views(html files) which are used
     * in application. These path will mainly be used by configuration, directives
     * and views. ViewPath should not be polluted or misunderstood with NavigationPath.
     * NavigationPath is mainly required for navigation. They don't care about the location
     * of view.
     */
    var app = angular.module('ngPorticoSD');
    app.constant('ngPorticoSDTemplatePath', {
        TABULER_VIEW: 'app/modules/ngPorticoSD/views/PorticoSDView.html'
    });
}());