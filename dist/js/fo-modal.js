(function(window, angular, undefined) {
  'use strict';

  angular.module('foModal', [])

  .factory('foModal', foModal);

  foModal.$inject = ['$rootScope', '$templateCache', '$document', '$compile', '$controller', '$q', '$injector'];

  function foModal($rootScope, $templateCache, $document, $compile, $controller, $q, $injector) {

    var $modal;
    var $layer = _createLayerElement();

    var modal = {

      isCreated: function() {
        return document.querySelector('.fo-layer') ? true : false;
      },

      isOpened: function() {
        return $modal.hasClass('open');
      },

      open: function(options) {
        options = _getOptions(options);

        // if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {}

        $modal = _createModalElement(options.templateUrl, options.showClose);

        _appendToBody($modal, $layer, modal.isCreated());

        $compile($modal)($rootScope);

        var promises = _handleResolve(options.resolve);

        $q.all(promises).then(function(value) {
          _instantiateController(options.controller, $modal, value);
          _showModal($modal, $layer);
          return this;
        });
      },

      close: function() {
        $modal.removeClass('fo-open');
        $layer.removeClass('fo-open');
      }

    };


    return {
      open: modal.open,
      close: modal.close
    };

    /////////////////////////////////////////
    function _getOptions(options) {
      var defaultConfig = {
        showClose: true
      };
      return angular.extend(defaultConfig, options);
    }


    function _createModalElement(templateUrl, showClose) {
      var templateString = $templateCache.get(templateUrl);
      templateString = showClose ? templateString + '<div class="modal-close" ng-click="close()"></div>' : templateString;
      var $wrapper = angular.element('<div class="fo-modal fo-animated"></div>');
      return angular.element($wrapper).append(templateString);
    }

    function _createLayerElement() {
      return angular.element('<div class="fo-layer"></div>');
    }

    function _appendToBody($modal, $layer, isModalCreated) {
      var $body = angular.element($document).find('body');

      if (isModalCreated) {
        angular.element($layer).remove();
        angular.element($modal).remove();
      }

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

    function _showModal($modal, $layer) {
      var tetherOption = {
        element: $modal[0],
        target: $layer[0],
        attachment: 'middle middle',
        targetAttachment: 'middle middle'
      };

      $layer.addClass('fo-open');
      $modal.addClass('fo-open').addClass('fo-fade-in');
      new Tether(tetherOption);
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
