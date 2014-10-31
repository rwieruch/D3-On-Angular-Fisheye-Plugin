'use strict';

/**
 * @ngdoc service
 * @name d3OnAngularSeedApp.fisheyeService
 * @description
 * # fisheyeService
 * Factory in the d3OnAngularSeedApp.
 */
angular.module('fisheye', [])
.factory('fisheyeService', ['$document', '$q', '$rootScope', function($document, $q, $rootScope) {
    var d = $q.defer();
    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve(window.fisheye); });
    }
    // Create a script tag with fisheye as the source
    // and call our onScriptLoad callback when it
    // has been loaded
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript'; 
    scriptTag.async = true;
    scriptTag.src = 'bower_components/d3-plugins-fisheye/index.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState === 'complete') { onScriptLoad(); }
    };
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return {
      fisheye: function() { return d.promise; }
    };
 }]);
