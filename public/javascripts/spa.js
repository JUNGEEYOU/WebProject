
	var scotchApp = angular.module('scotchy', ['ngRoute']);
    
  
        scotchApp.config(function($routeProvider,$locationProvider) {
            $routeProvider
    
               //home
                .when('/', {
                    templateUrl : 'main'
                })
    

                // .when('/main', {
                //     templateUrl : 'main'
                // })
    
               //aboutKorea
               .when('/travel', {
                templateUrl : 'travel'
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

                  //profile
                  .when('/profile', {
                    templateUrl : 'profile'
                })

                   //serch
                   .when('/serch', {
                    templateUrl : 'serch'

                })


                //     //serch
                //   .when('/galleryComment', {
                //         templateUrl : 'galleryComment'
    
                //     });

           

                $locationProvider.html5Mode(true);


        });


