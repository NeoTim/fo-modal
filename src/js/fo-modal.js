(function(window, angular, undefined) {
  'use strict';

  angular.module('foModal', [])

  .directive('foModalClose', foModalClose)
    .factory('foModal', foModal);

  /* foModalClose directive */
  foModalClose.$inject = ['$document'];

  function foModalClose($document) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attr) {
        element.bind('click', function() {
          angular.element(document.querySelector('.fo-modal')).remove();
          angular.element(document.querySelector('.fo-layer')).remove();
          angular.element($document).find('body').removeClass('fo-fixed');
        });
      }
    };
  }

  /* foModal service */
  foModal.$inject = ['$rootScope', '$templateCache', '$document', '$compile', '$controller', '$q', '$injector', '$timeout'];

  function foModal($rootScope, $templateCache, $document, $compile, $controller, $q, $injector, $timeout) {

    var $modal;
    var $layer = _createLayerElement();
    var $body = angular.element($document).find('body');

    var modal = {

      defaultConfig: {
        showClose: true,
        fixBody: true
      },

      open: function(options) {
        options = angular.extend(modal.defaultConfig, options);

        // if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {}

        $modal = _createModalElement(options.templateUrl, options.showClose);

        _appendToBody($modal, $layer);

        $compile($modal)($rootScope);

        var promises = _handleResolve(options.resolve);

        $q.all(promises).then(function(value) {
          _instantiateController(options.controller, $modal, value);
          _showModal($modal, $layer, options.fixBody);
          return this;
        });
      },

      close: function() {
        angular.element(document.querySelector('.fo-modal')).remove();
        angular.element(document.querySelector('.fo-layer')).remove();
        angular.element($document).find('body').removeClass('fo-fixed');
      }

    };


    return {
      open: modal.open,
      close: modal.close
    };

    /////////////////////////////////////////

    function _createModalElement(templateUrl, showClose) {
      var templateString = $templateCache.get(templateUrl);
      templateString = showClose ? templateString + '<div fo-modal-close class="modal-close"></div>' : templateString;
      var $wrapper = angular.element('<div class="fo-modal fo-animated"></div>');
      return angular.element($wrapper).append(templateString);
    }

    function _createLayerElement() {
      return angular.element('<div class="fo-layer"></div>');
    }

    function _appendToBody($modal, $layer) {
      $body.append($layer);
      $body.append($modal);
    }

    function _handleResolve(resolve) {
      var promises = {};

      angular.forEach(resolve, function(value, key) {
        promises[key] = angular.isString(value) ? value : $injector.invoke(value);
      });

      return promises;
    }

    function _showModal($modal, $layer, fixBody) {
      var tetherOption = {
        element: $modal[0],
        target: $layer[0],
        attachment: 'middle middle',
        targetAttachment: 'middle middle'
      };

      $layer.addClass('fo-open');
      $modal.addClass('fo-open').addClass('fo-fade-in');
      if (fixBody) $body.addClass('fo-fixed');

      $timeout(function() {
        new Tether(tetherOption);
      }, 1);
    }

    function _instantiateController(constructor, element, resolveData) {
      var locals = angular.extend({
        $scope: $rootScope,
        $element: $modal
      }, resolveData);

      $controller(constructor, locals);
    }

  }


})(window, window.angular);
