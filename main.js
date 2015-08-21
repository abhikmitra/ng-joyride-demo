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
    .controller('mainCtrl', function ($rootScope, $scope, $modal, $timeout) {
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
            $scope.config[3].text = "I can have dynamic text that can change in between joyrides"
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
                type: "title",
                heading: "Ng-joyride has new features",
                text: '<div class="row"><div id="title-text" class="col-md-12"><span class="main-text">Support for Dynamic configs.Config object or part of the config' +
                    ' might change after the joyride is loaded.</span><br/><span class="small"><em>You can bring your configs via ajax !!!</em></span></div></div>',
                curtainClass: "randomClass"

            },
            {
                type: "element",
                selector: "#home",
                heading: "Title can have <em>HTML</em>",
                text: "They can also be appended to the <em> body</em>",
                placement: "bottom",
                scroll: true,
                attachToBody: true
            },
            {
                type: "element",
                selector: "#header",
                heading: "Step 1",
                text: "I can come over any element.Even the background and the popover is customizable per step",
                placement: "bottom",
                curtainClass: "blueColour",
                scroll: true,
                elementTemplate: function(content,isEnd){
                    //The joyride will invoke this function while rendering this element.
                    //Content : The "text" to be shown in the element.
                    //isEnd: Signifying if this is the end of the joyride so that you can style it differently.
                    var template =
                            '<div class=\"row custom-color\">' +
                                '<div id=\"pop-over-text\" class=\"col-md-12\">' +
                                    content +
                                '</div>' +
                            '</div>' +
                            '<hr>' +
                            '<div class=\"row custom-bg\">' +
                                '<div class=\"col-md-4 center\">' +
                                    '<a class=\"skipBtn pull-left\" type=\"button\">Skip</a>' +
                                '</div>' +
                                '<div class=\"col-md-8\">' +
                                    '<div class=\"pull-right\">' +
                                        '<button id=\"prevBtn\" class=\"prevBtn btn btn-xs\" type=\"button\">Previous</button>' +
                                        ' <button id=\"nextBtn\" class=\"nextBtn btn btn-xs btn-primary\" type=\"button\">' +
                                           'Next&nbsp;<i class=\"glyphicon glyphicon-chevron-right\">'
                                        '</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                    return template;
                }
            },
            {
                type: "element",
                selector: "#impBtn",
                heading: "Step 2",
                text: "I can change placement.Instead of next you can click the checkbox to advance",
                placement: "left",
                scroll: true,
                advanceOn: {element: '#impBtn', event: 'click'}
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


