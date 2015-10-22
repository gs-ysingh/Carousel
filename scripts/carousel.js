(function($) {
	$.fn.carousel = function(options) {
		var images = $(this).find('img');
		var count = 0;
		var sInterval = '';
		options = $.extend({}, $.fn.carousel.config, options);
		$(images[count]).addClass(options.activeClass);

		var slideCarousel = function() {
			if (count < images.length - 1) {
				$(images).removeClass(options.activeClass);
				$(images[count + 1]).addClass(options.activeClass);
				var totalWidth = $(images[count]).outerWidth();
				$(images[count]).parent()
					.parent()
					.animate({
							"margin-left": "-" + totalWidth -5 + "px"
						},
						options.nextprevTimeInterval);
				count++;
			} else {
				count = 0;
				$(images).parent()
					.parent()
					.animate({
							'margin-left': '0'
						},
						options.nextprevTimeInterval);
				$(images).removeClass(options.activeClass);
				$(images[count]).addClass(options.activeClass);
			}
		}
		var slidePrevCarousel = function() {
			if (count > 0) {
				$(images).removeClass(options.activeClass);
				$(images[count - 1]).addClass(options.activeClass);
				$(images[count - 1]).parent()
					.parent()
					.animate({
						"margin-left": "0px"
					});
				count--;
			} else {
				count = $(images).length - 1;
				$(images).removeClass(options.activeClass);
				$(images[count]).addClass(options.activeClass);
				var totalWidth = $(images[count]).outerWidth();
				for (var i = 0; i < $(images).length - 1; i++) {
					$(images[i]).parent()
						.parent()
						.animate({
							"margin-left": "-" + totalWidth -5 + "px"
						});
				}
			}
		}

		var carouselInterval = function() {
			sInterval = setInterval(function() {
				slideCarousel();
			}, options.defaultTimeInterval);
		}

		var setActive = function() {
			for (var counter = 0; counter < images.length; counter++) {
				if (document.URL.split('/')
					.slice(0, -1)
					.join('/') + '/' + $('.' + options.activeClass).attr('src') == $('.' + options.activeClass).attr('src')) {
					count = counter;
					break;
				}
			}
		}

		carouselInterval();

		$(this).parent().find('.' + options.nextClass).click(function() {
			clearInterval(sInterval);
			setActive();
			slideCarousel();
			carouselInterval();
		});

		$(this).parent().find('.' + options.prevClass).click(function() {
			clearInterval(sInterval);
			setActive();
			slidePrevCarousel();
			carouselInterval();
		});
		return this;
	}
	$.fn.carousel.config = {
		defaultTimeInterval: 2000,
		nextprevTimeInterval: 500, //should be less than defaultTimeInterval
		nextClass: 'nextImage',
		prevClass: 'prevImage',
		activeClass: 'active'
	};
})(jQuery);