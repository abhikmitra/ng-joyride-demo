'use strict';

angular.module('demo', [

    'ngRoute',
    'ngJoyRide',
    'ui.bootstrap'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'demoPage1'
            })
            .when('/demo', {
                templateUrl: 'views/features.html',
                controller: 'demoPage2'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('mainCtrl', function ($rootScope, $scope, $modal, $sce) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var count = 0;
        $scope.startJoyRide = false;
        $scope.start = function () {
            if(count > 0){
                generateAlternateConfig();
            }
            count++;
            $scope.startJoyRide = true;
        }
        function generateAlternateConfig(){
            //This is to show that it can have dynamic configs which can change . The joyride would not need to be initialized again.
            $scope.config[2].text = "I can have dynamic text that can change in between joyrides"
        }

        $scope.config = [

            {
                type: "location_change",
                path: "/"
            },
            {
                type: "title",
                heading: "Welcome to the NG-Joyride demo",
                text: '<div class="row"><div id="title-text" class="col-md-12"><span class="main-text">Welcome to <strong>Ng Joyride Demo</strong></span><br><span>( This demo will walk you through the features of Ng-Joyride. )</span><br/><br/><span class="small"><em>This can have custom html too !!!</em></span></div></div>',
                curtainClass: "randomClass"

            },
            {
                type: "element",
                selector: "#home",
                heading: "Title can have <em>HTML</em>",
                text: "You are in the <em>home page.</em>",
                placement: "bottom",
                scroll: true
            },
            {
                type: "element",
                selector: "#header",
                heading: "Step 1",
                text: "I can come over any element.Even the background is customizable per step",
                placement: "bottom",
                curtainClass: "blueColour",
                scroll: true
            },
            {
                type: "element",
                selector: "#impBtn",
                heading: "Step 2",
                text: "I can change placement",
                placement: "left",
                scroll: true
            },
            {
                type: "location_change",
                path: "/demo"
            },
            {
                type: "element",
                selector: "#features",
                heading: "Step 3",
                text: "I can change pages",
                placement: "bottom",
                scroll: true
            },
//                
//                {
//                    type: "element",
//                    selector: "#featured",
//                    heading: "Step 5",
//                    text: "I can change pages",
//                    placement: "bottom",
//                    scroll:true
//                },
            {
                type: "function",
                fn: openModalForDemo
            },
            {
                type: "element",
                selector: "#modal1",
                heading: "Step 4",
                text: "I can open modals",
                placement: "bottom"
            },
            {
                type: "element",
                selector: "#modal2",
                heading: "Step 5",
                text: "I can call functions",
                placement: "bottom"
            },
            {
                type: "element",
                selector: "#modal3",
                heading: "Step 6",
                text: "I can reference any element that is not in DOM when the joyride is initialized",
                placement: "bottom"
            },
            {
                type: "function",
                fn: 'closeModalForDemo'
            },
            {
                type: "element",
                selector: "#finish",
                heading: "Step 7",
                text: "The demo finishes.Head over to github to learn more",
                placement: "top",
                scroll: true
            }

        ];
        function openModalForDemo(shouldOpen) {
            if (shouldOpen) {
                $scope.$apply( function(){
                    $scope.open();
                })

            } else {
               $scope.$apply( function(){
                   $scope.close();
               })
            }
        }

        $scope.closeModalForDemo = function (shouldnotshow) {
            if (shouldnotshow) {
                $scope.close();
            } else {
                $scope.open();
            }
        }


        $scope.open = function () {

            var modalInstance = $modal.open({
                templateUrl: 'views/modal.html',
                controller: 'modalInstanceCtrl',
                windowClass: 'ng-joyride-modal'

            });


        };
        $scope.close = function () {

            $rootScope.$broadcast('CLOSE_MODAL');


        };

    })
    .controller('demoPage1', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.startJoyRide = true;


    })
    .controller('demoPage2', function ($scope) {
        $scope.awesomeThings = [
            'Node JS',
            'Protractor',
            'Jasmine'
        ];
        $scope.startJoyRide = true;


    })
    .controller('modalInstanceCtrl', function ($scope, $modalInstance) {
        $scope.ok = function () {

        };
        var cleanUpFunc = $scope.$on('CLOSE_MODAL', function () {
            cleanUpFunc();
            $modalInstance.close();

        });

        $scope.cancel = function () {

        };
    });


