var AppaLite = angular.module('AppaLite', ['ui.router', 'ngAnimate']);

AppaLite.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'InterfazRegistro.html'
        })     


});