/*
 * jQuery UI Button Bar 1.0
 *
 * Copyright IRS 2011
 *
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.buttonbar", {
	options: {
		separation: '5px',
		classes: {
			primary: 'ui-priority-primary',
			secondary: 'ui-priority-secondary'
		},
		alignments: {
			primary: 'right',
			secondary: 'left'
		}
	},
	
	_create: function() {
		var self = this,
			options = self.options;
	
		options.alignments.primary = (options.alignments.primary.toLowerCase() === 'right' || options.alignments.primary.toLowerCase() === 'left') 
			? options.alignments.primary : 'right';
		options.alignments.secondary = (options.alignments.secondary.toLowerCase() === 'right' || options.alignments.secondary.toLowerCase() === 'left') 
			? options.alignments.secondary : 'left';
			
		self.element
			.addClass("ui-buttonbar ui-widget ui-corner-all ui-helper-clearfix");
		self.buttons = self.element.find('button, a');
		
		// Los botones Primary los situa a la derecha por defecto
		var primaryButtons = new Array();
		// Los botones Secondary los situa a la izquierda por defecto
		var secondaryButtons = new Array();
		var equalAlignments = options.alignments.primary === options.alignments.secondary;
		
		jQuery.each(self.buttons, function(index, button) {
			$(button).button();
			if (equalAlignments || !$(button).hasClass(options.classes.secondary)) {
				// Cuando todos los botones van en el mismo lado uso solo el array primary
				primaryButtons.push(button);
			} else {
				secondaryButtons.push(button);
			}
		});
		
		self._appendButtons(self.element, primaryButtons, options.alignments.primary);
		self._appendButtons(self.element, secondaryButtons, options.alignments.secondary);
	},
	
	destroy: function() {
		this.element.removeClass("ui-buttonbar ui-widget ui-corner-all ui-helper-clearfix");
		this.buttons.remove();
				
		$.Widget.prototype.destroy.apply(this, arguments); 
	},
	
	_appendButtons: function(target, buttons, alignment) {
		var options = this.options;
		
		if (buttons.length > 0) {
			var div = $('<div></div>')
				.addClass('ui-buttonbar-' + alignment)
				.prependTo(target);
			jQuery.each(buttons, function(index, button) {
				if (!$(button).hasClass(options.classes.secondary) && !$(button).hasClass(options.classes.primary)) {
					$(button).addClass(options.classes.primary);
				}
				if (index < buttons.length - 1) {
					$(button).css('margin-right', options.separation);
				}
			});
			div.append(buttons);
		}
	}
});

$.extend( $.ui.buttonbar, {
	version: "1.0"
});

})( jQuery );
