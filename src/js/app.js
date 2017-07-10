'use strict';
/*jshint indent:4 */

(function ($) {

	$.serviceTemplateLoader = function() {

		var serviceTemplateLoader = {};
		var config = {};
		var defaults = $.app.config;
		var cached = null;
		var $scope = {};




		function getConfig(defaults, options) {
			options = options || {};
			defaults = defaults || {};
			return $.extend(true, {}, defaults, options);
		}


		function update(scope, options) {
			config = getConfig(defaults, options);
			$scope = scope || {};

			config.TEMPLATE ? cached = config.TEMPLATE : false;

			var deferred = Q.defer();
			if(cached === null) {
				deferred.resolve( getData() );
			} else {
				deferred.resolve( renderHTML(cached) );
			}
			deferred.resolve( getData() );
			return deferred.promise;
		}


		function getData() {
			var deferred = Q.defer();

			$.get( config.TEMPLATE_URL, function( data ) {
				cached = data;
				deferred.resolve( renderHTML(data) );
			});

			return deferred.promise;
		}


		function renderHTML(data) {
			data = data || '';
			var template = Handlebars.compile(data);

			return template($scope);
		}




		serviceTemplateLoader.update = update

		return serviceTemplateLoader;
	}


}(jQuery));
