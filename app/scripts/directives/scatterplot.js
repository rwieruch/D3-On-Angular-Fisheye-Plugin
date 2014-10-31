'use strict';

/**
 * @ngdoc directive
 * @name d3OnAngularSeedApp.directive:scatterplot
 * @description
 * # scatterplot
 */
angular.module('d3OnAngularSeedApp')
   .directive('scatterplot', ['d3Service', 'fisheyeService', function(d3Service, fisheyeService) {
    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {
				fisheyeService.fisheye().then(function() {

					var fisheyePlugin = d3.fisheye;

					d3Service.d3().then(function(d3) {

						d3.fisheye = fisheyePlugin;	

						var data = [
				      {happiness: 33, results: 77 },
				      {happiness: 199, results: 144 },
				      {happiness: 145, results: 189 },
				      {happiness: 99, results: 155 },
				      {happiness: 156, results: 122 },
				      {happiness: 69, results: 77 },
				      {happiness: 188, results: 188 }
				    ];	

		      	var w = 600;
		      	var h = 600;

			      var fisheye = d3.fisheye.circular().radius(120);

			      var svg = d3.select(element[0]).append('svg')
			        .attr("width", w)
			        .attr("height", h);

			      var circles = svg.selectAll("circle")
			        .data(data)
			        .enter()
			        .append("circle")
			        .datum( function(d) {
			            return {x: d.happiness, y: d.results}
			        })
			        .attr("cx", function (d) {return d.x})
			        .attr("cy", function (d) {return d.y})
			        .attr("r", 2);

			      svg.on("mousemove", function() {
			        fisheye.focus(d3.mouse(this));

			        circles.each(function(d) { d.fisheye = fisheye(d); })
			            .attr("cx", function(d) { return d.fisheye.x; })
			            .attr("cy", function(d) { return d.fisheye.y; })
			            .attr("r", function(d) { return d.fisheye.z * 2; });
		        });

		      });
				});
    	}
    }
  }]);
