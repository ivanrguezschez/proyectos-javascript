/*
 * jQuery UI Label Required 1.0
 *
 * Copyright IRS 2011
 *
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.labelrequired", {
	options: {
		icon: "ui-icon-star"
	},
	
	_create: function() {
		var self = this,
			options = self.options;
	
		self.element
			.addClass("ui-label-required")
			.addClass("ui-state-default");
		
		$('<span></span>')
			.addClass('ui-icon ' + options.icon)
			.prependTo(self.element);
	},
	
	destroy: function() {
		$.Widget.prototype.destroy.apply(this, arguments);
	}
});

$.extend( $.ui.labelrequired, {
	version: "1.0"
});

})( jQuery );
