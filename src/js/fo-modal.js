(function(window, angular, undefined) {
  'use strict';

  angular.module('foModal', [])

  .factory('foModal', ['$rootScope', '$templateCache', '$document', '$compile', '$controller', function($rootScope, $templateCache, $document, $compile, $controller) {

    var $modal;
    var $layer = angular.element('<div class="fo-layer"></div>');


    var modal = {
      element: '',

      isOpened: function() {
        return $modal.hasClass('open');
      },

      open: function(option) {

        var templateString = $templateCache.get(option.templateUrl);
        var $body = angular.element($document).find('body');
        var $wrapper = angular.element('<div class="fo-modal"></div>');

        $modal = angular.element($wrapper).append(templateString);
        this.element = $modal;

        $body.append($layer);
        $body.append($modal);

        $compile($modal)($rootScope);
        var controllerInstance = $controller(option.controller, {
          $scope: $rootScope,
          $element: $modal
        }, null);

        var tetherOption = {
          element: $modal[0],
          target: $layer[0],
          attachment: 'middle middle',
          targetAttachment: 'middle middle'
        };

        $layer.addClass('fo-open');
        $modal.addClass('fo-open');
        new Tether(tetherOption);

        return this;
      },

      close: function(name) {
        $modal.removeClass('fo-open');
        $layer.removeClass('fo-open');
      }

    };

    return modal;

  }]);


})(window, window.angular);
