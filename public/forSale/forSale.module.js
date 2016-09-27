angular.module('forSale', [
    'ngRoute',
    'ngCookies',
    'angular-toArrayFilter'
]).directive('backImg', function(){
    return function(scope, element, attrs){
        var img = attrs.backImg;
        element.css({
            'background-image': '/static/photos/'+ img +')',
            'background-size' : 'cover'
        });
    };
});