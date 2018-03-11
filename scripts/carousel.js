var lib = (function () {
    function carousel(options) {
        if(isValid(options)) {
            return new init(options);
        }
    }

    function isValid(options) {
        if(!validateElement(options.element)) {
            return false;
        }
        return true;
    }

    function getElement(ele) {
        var res;

        if(!ele) {
            console.warn('Element not present in page');
            return false;
        }

        if(typeof ele == 'string') {
            res = document.querySelectorAll(ele);
        }
        else if(ele.length) {
            res = ele;
        }
        else {
            res = [ele];
        }

        if(res.length == 0) {
            console.warn('Element not present in page');
            return false;
        }

        return res;
    }

    function validateElement(ele) {
        if(typeof ele == 'undefined') {
            console.warn("Please provide valid element");
            return false;
        }

        ele = getElement(ele);

        if(!ele) {
            return false;
        }

        return true;
    }

    init.prototype.render = function () {
        $(this.model.element).addClass('container');
        $(this.model.element).css({ width: this.model.width, height: this.model.height });
        if(this.model.orientation === 'horizontal') {
            $(this.model.element).addClass('horizontal');
        }
        else {
            $(this.model.element).addClass('vertical');
        }
    }

    function slidePrev() {
        if(this.count > 0) {
            this.count--;
            if(this.model.orientation === 'horizontal') {
                $($(this.model.element).find('.one_photo')[this.count]).animate({'margin-left': '0px'});
            }
            else {
                $($(this.model.element).find('.one_photo')[this.count]).animate({'margin-top': '0px'});
            }
        }
    }

     function slideNext() {
        if(this.count < this.images - 1) {
            if(this.model.orientation === 'horizontal') {
                $($(this.model.element)
	                .find('.one_photo')[this.count])
	                .animate({'margin-left': '-' + ($(this.model.element).find('ul').width() + 5) + 'px'});
            }
            else {
                $($(this.model.element)
	                .find('.one_photo')[this.count])
	                .animate({'margin-top': '-' + ($(this.model.element).find('ul').width() + 5) + 'px'});
            }
            this.count++;
        }
    }

    init.prototype.bindEvents = function () {
        $(this.model.element).find('.prevImage').on('click', slidePrev.bind(this));
        $(this.model.element).find('.nextImage').on('click', slideNext.bind(this));
    }

    function init(options) {
        this.model = options;
        this.defaultConfig = {
            orientation: 'horizontal',
            visibleItems: 1
        };

        this.model = Object.assign(this.defaultConfig, this.model);
        this.count = 0;
        this.images = $(this.model.element).find('.one_photo').length;
        this.render();
        this.bindEvents();
    }

    return {
        carousel: carousel
    }
})();