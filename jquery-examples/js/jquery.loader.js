/*
 * jQuery Loader Plugin
 * @version: 1.0 (29/04/2011)
 * @requires jQuery v1.4.4 or later
 * @author : Iván Rodríguez
 * Uso:
 * 		$.loader();
 * 		$.loader(options) -> options =
 *  	{
 *		
 * 		}
 *		$.loader("close");
 *
 */
(function($) {
	var defaults = {
		content: '',
		width: 100,
		height: 100,
		className: {
			foreground: 'loader-foreground',
			background: 'loader-background'
		}
	};
	
	var options = {};
		
	var methods = {
		show : function(options) {
			this.options = jQuery.extend(defaults, options);
		
			var backgroundDiv = $('<div class="' + this.options.className.background + '"></div>');
			backgroundDiv.css({
				position: 'absolute',
				top: '0px',
				left: '0px',
				width: $(window).width(),
				height: $(document).height(),
				opacity: 0.4 // IE no hace caso del establecido en el class sino de este
			});
			backgroundDiv.appendTo('body');
			if(jQuery.bgiframe) {
				backgroundDiv.bgiframe();
			}
			
			var div = $('<div class="' + this.options.className.foreground + '"></div>');
			div.css({
				width: this.options.width,
				height: this.options.height
			});
			div.appendTo('body');
			div.center();
			$('<div></div>').append(this.options.content).appendTo(div);
		},
		hide : function() {
			$('div.' + this.options.className.background).remove();
			$('div.' + this.options.className.foreground).remove();
		}
	};
		
	jQuery.loader = function(method, options) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			return methods.show.apply(this, arguments);
		}   
	};
	
	jQuery.fn.center = function () {
		this.css('position', 'absolute');
	    this.css('top', ($(window).height() - this.outerHeight()) / 2 + $(window).scrollTop() + 'px');
	    this.css('left', ($(window).width() - this.outerWidth()) / 2 + $(window).scrollLeft() + 'px');
	    return this;
	};
})(jQuery);	
