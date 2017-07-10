(function ($) {
	'use strict';
	/*jshint indent:4 */

	$.serviceTemplateLoader = function () {

		var serviceTemplateLoader = {},
			config = {},
			defaults = $.app.config,
			cached = null,
			$scope = {};



		function getConfig(defaults, options) {
			options = options || {};
			defaults = defaults || {};
			return $.extend(true, {}, defaults, options);
		}



		function renderHTML(data) {
			data = data || '';
			var template = Handlebars.compile(data);

			return template($scope);
		}


		function getData() {
			var deferred = Q.defer();

			$.get(config.TEMPLATE_URL, function (data) {
				cached = data;
				deferred.resolve(renderHTML(data));
			});

			return deferred.promise;
		}



		function update(scope, options) {
			config = getConfig(defaults, options);
			$scope = scope || {};

			config.TEMPLATE = config.TEMPLATE ? cached = config.TEMPLATE : false;

			var deferred = Q.defer();
			if (cached === null) {
				deferred.resolve(getData());
			} else {
				deferred.resolve(renderHTML(cached));
			}
			deferred.resolve(getData());
			return deferred.promise;
		}


		serviceTemplateLoader.update = update;

		return serviceTemplateLoader;
	};


}(jQuery));
