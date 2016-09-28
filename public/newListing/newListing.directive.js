angular.module('newListing')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        console.log('bind apply here')
                        modelSetter(scope, element[0].files[0]);
                        console.log(scope);
                    });
                    var file = scope.$ctrl.myFile;
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        scope.$ctrl.ImageSrc = e.target.result;
                        console.log(scope);
                        scope.$apply();
                    }

                });
            }
        };
    }]);