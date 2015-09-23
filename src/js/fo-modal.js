(function(window, angular, undefined) {
  'use strict';

  angular.module('foPopover', [])

  // @ngInject
  .directive('foPopover', ['$rootScope', '$location', '$templateCache', '$document', '$compile', function($rootScope, $location, $templateCache, $document, $compile) {
    return {

      restrict: 'A',
      scope: true,
      link: function(scope, element, attr) {

        var templateString = $templateCache.get(attr.popoverTemplate);

        var $wrapper = angular.element('<div class="fo-popover"></div>');
        $wrapper[0].id = attr.popoverId;
        $wrapper.addClass(attr.popoverClass);

        var $popover = angular.element($wrapper).append(templateString);

        element.after($popover);

        var positionConfig = attr.popoverPosition.split(' ').join('_');

        var popover = {

          positions: {
            // top
            top_middle: {
              attachment: 'bottom middle',
              targetAttachment: 'top middle'
            },
            top_left: {
              attachment: 'bottom left',
              targetAttachment: 'top left'
            },
            top_right: {
              attachment: 'bottom right',
              targetAttachment: 'top right'
            },

            // bottom
            bottom_middle: {
              attachment: 'top middle',
              targetAttachment: 'bottom middle'
            },
            bottom_left: {
              attachment: 'top left',
              targetAttachment: 'bottom left'
            },
            bottom_right: {
              attachment: 'top right',
              targetAttachment: 'bottom right'
            },

            // left
            left_middle: {
              attachment: 'middle right',
              targetAttachment: 'middle left'
            },
            left_top: {
              attachment: 'top right',
              targetAttachment: 'top left'
            },
            left_bottom: {
              attachment: 'bottom right',
              targetAttachment: 'bottom left'
            },

            // right
            right_middle: {
              attachment: 'middle left',
              targetAttachment: 'middle right'
            },
            right_top: {
              attachment: 'top left',
              targetAttachment: 'top right'
            },
            right_bottom: {
              attachment: 'bottom left',
              targetAttachment: 'bottom right'
            },

            //diagonal
            top_left_diagonal: {
              attachment: 'bottom right',
              targetAttachment: 'top left'
            },
            top_right_diagonal: {
              attachment: 'bottom left',
              targetAttachment: 'top right'
            },
            bottom_left_diagonal: {
              attachment: 'top right',
              targetAttachment: 'bottom left'
            },
            bottom_right_diagonal: {
              attachment: 'top left',
              targetAttachment: 'bottom right'
            }

          },

          isOpened: function() {
            return $popover.hasClass('open');
          },

          open: function() {
            var tetherOption = {
              element: $popover[0],
              target: element[0],
              attachment: 'bottom middle',
              targetAttachment: 'top middle',
              offset: attr.popoverOffset
            };

            tetherOption = angular.extend(tetherOption, popover.positions[positionConfig]);

            $popover.addClass('open');
            new Tether(tetherOption);
          },

          close: function() {
            $popover.removeClass('open');
          }
        };

        element.bind('click', function(e) {
          if (popover.isOpened()) {
            popover.close();
          } else {
            popover.open();
          }
          e.stopPropagation();
        });

        $compile($popover)(scope);

        scope.closePopover = popover.close;

        $popover.bind('click', function(e) {
          e.stopPropagation();
        });

        angular.element(document).find('a').bind('click', function(e) {
          if ($popover.hasClass('open')) {
            e.preventDefault();
          }
        });

        $document.bind('click', function() {
          popover.close();
        });


      }
    };
  }]);


})(window, window.angular);
