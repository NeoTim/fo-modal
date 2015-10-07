# fo-modal
A nice modal

[Demo](http://fo.modal.mipinr.com)

## Install

```
bower install fo-modal --save
```

### Require
[Tether](https://github.com/HubSpot/tether)

## Usage

```html
<link rel="stylesheet" href="bower_components/fo-modal/dist/css/fo-modal.css" />

<script src="bower_components/tether/dist/js/tether.js"></script>
<script src="bower_components/fo-modal/dist/js/fo-modal.js"></script>
```

```js
var app = angular.module('app', ['foModal']);

app.controller('MainCtrl', function ($scope, foModal) {

  $scope.open = function() {
    foModal.open({
      templateUrl: 'modal.html'
    });
  };

});
```

```html

<button class="btn-demo" ng-click="open()">DEMO</button>

<script id="modal.html" type="text/ng-template">
  <h2>Feature</h2>
  <ul class="list-unstyled list-feature">
    <li>Nice UI and easy customize</li>
    <li>Position middle in screen or anyWhere</li>
    <li>Api is Simple</li>
    <li>No jQuery is required</li>
    <li>{{vm.str}}</li>
  </ul>

  <button class="btn btn-default" ng-click="close()">取消</button>
  <button class="btn btn-info" ng-click="yes()">确认</button>
</script>

```
