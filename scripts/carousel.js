(function($) {
	$.fn.carousel = function(options) {		
		var images = $(this).find('img');
		var count = 0;
		var sInterval = '';
		options = $.extend({}, $.fn.carousel.config, options);
		$(images[count]).addClass(options.activeClass);
		var slideCarousel = function() {
			if(count < images.length - 1) {	
				$(images).removeClass(options.activeClass);
				$(images[count + 1]).addClass(options.activeClass);	
				var totalWidth = $(images[count]).outerWidth() + 5;		
				$(images[count]).animate({"margin-left": "-" + totalWidth + "px" }, options.nextprevTimeInterval);
				count++;				
			}
			else {
				count = 0;
				$(images).css('margin-left', '0');
				$(images).removeClass(options.activeClass);
				$(images[count]).addClass(options.activeClass);
			}
		}
		var slidePrevCarousel = function() {
			if(count > 0) {	
				$(images).removeClass(options.activeClass);
				$(images[count - 1]).addClass(options.activeClass);			
				$(images[count - 1]).animate({"margin-left": "0px" }, options.nextprevTimeInterval);				
			}
		}
		var carouselInterval = function() {
			sInterval = setInterval(function() {			
				slideCarousel();
			}, options.defaultTimeInterval);
		}
		var setActive = function() {
			for(var counter = 0; counter < images.length; counter++) {
				if(images[counter].src == $('.' + options.activeClass).attr('src')) {
					count = counter;
					break;
				}
			}	
		}
		carouselInterval();
		$(this).find('.' + options.nextClass).click(function() {
			clearInterval(sInterval);
			setActive();
			slideCarousel();
			carouselInterval();
		});
		$(this).find('.' + options.prevClass).click(function() {
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
        nextClass: 'next',
        prevClass: 'prev',
        activeClass: 'active'
    };
}
)(jQuery);
