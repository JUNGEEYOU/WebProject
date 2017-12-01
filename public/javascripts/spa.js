
	var scotchApp = angular.module('scotchApp', ['ngRoute']);
    
  
        scotchApp.config(function($routeProvider) {
            $routeProvider
    
               //home
                .when('/', {
                    templateUrl : 'main'
                })
    
               //aboutKorea
               .when('/aboutKorea', {
                templateUrl : 'aboutKorea'
            })

                //Koreafood 
                .when('/koreaFood', {
                    templateUrl : 'koreaFood'
                })

                //Koreaculture 
                //CulturelInfo
                .when('/culturelInfo', {
                    templateUrl : 'culturelInfo'
                })


                //gallery
                .when('/gallery', {
                    templateUrl : 'gallery'
                })

                 //contact
                 .when('/contact', {
                    templateUrl : 'contact'
                })


                //signin
                .when('/signup', {
                    templateUrl : 'signup'
                })

                   //login
                   .when('/login', {
                    templateUrl : 'login'
                })

                   //serch
                   .when('/serch', {
                    templateUrl : 'serch'
                });

                  


        });
