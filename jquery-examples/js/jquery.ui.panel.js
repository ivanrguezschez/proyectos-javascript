/*
 * jQuery UI Panel 1.0
 *
 * Copyright IRS 2011
 *
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.panel", {
	options: {
		title: '',
		state: 'expanded', // expanded|contracted
		expandedText: 'Expandir', // Habria que internacionalizarlo
		contractedText: 'Contraer',
		icons: {
			headerExpanded: "ui-icon-triangle-1-n",
			headerContracted: "ui-icon-triangle-1-s"
		},
		effect: 'blind'
	},
	
	_create: function() {
		this.originalTitle = this.element.attr('title');
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}
		this.options.title = this.options.title || this.originalTitle;
		this.options.title = this.options.title || '&#160;';
				
		var self = this,
			options = self.options;
		
		var content = self.element.html();
		self.element.html('');
		
		self.element
			.addClass("ui-panel ui-widget ui-corner-all ui-helper-clearfix")
			.removeAttr('title');
		//self.element.find('h1').parent().addClass('ui-panel-header ui-widget-header ui-corner-all ui-helper-clearfix');
				
		self.headerDiv = $('<div></div>')
			.addClass('ui-panel-header ui-widget-header ui-corner-all')
			.append('<h1>' + this.options.title + '</h1>')
			.appendTo(self.element);
		
		self.contentDiv = $('<div></div>')
			.addClass('ui-panel-content ui-widget-content ui-corner-all')
			.append(content)
			.appendTo(self.element);
			
		var uiPanelHeaderbarState = $('<a href="#"></a>')
			.attr('title', options.contractedText)
			.addClass('ui-panel-expanded ui-corner-all')
			.hover(
				function() { uiPanelHeaderbarState.addClass('ui-state-hover'); },
				function() { uiPanelHeaderbarState.removeClass('ui-state-hover'); }
			)
			.click(function(event) {
				if (options.state == 'expanded') {
					options.state = 'contracted';
					$(this).attr('title', options.expandedText)
					$(this).children('span')
							.removeClass(options.icons.headerExpanded)
							.addClass(options.icons.headerContracted);
				} else if (options.state == 'contracted') {
					options.state = 'expanded';
					$(this).attr('title', options.contractedText)
					$(this).children('span')
						.removeClass(options.icons.headerContracted)
						.addClass(options.icons.headerExpanded);
				}
				//self.element.find('h1').parent().next().toggle("blind");
				self.contentDiv.toggle(options.effect);
				$(this).blur();
			})
			//.prependTo(self.element.find('h1').parent());
			.appendTo(self.headerDiv);

		var uiPanelHeaderbarStateText = $('<span></span>')
			.addClass('ui-icon ' + options.icons.headerExpanded)
			.appendTo(uiPanelHeaderbarState);
		
		
		
		//self.element.find('h1').remove();
		//var header = $('<div></div>').addClass('ui-widget-header');
		//header.appendTo(self.h1);
		//self.element.appendTo(header);
		
		//self.element.find('h1').parent().next().addClass("ui-panel-content ui-widget-content ui-corner-all ui-helper-clearfix");
		
	},

	destroy: function() {
		this.element
			.removeClass("ui-panel ui-widget ui-corner-all ui-helper-clearfix");
		//this.headerDiv.remove();			
		this.contentDiv.remove();			
		
		$.Widget.prototype.destroy.apply( this, arguments );
	}
	/*
	_clickHandler: function(target) {
		var options = this.options;
	
		target.icon.click(function(event) {
			//alert(options.state);
			if (options.state == 'expanded') {
				options.state = 'contracted';
				target.icon
					.removeClass(options.icons.headerExpanded)
					.addClass(options.icons.headerContracted);
				//target.element.find('h1').parent().next().hide("blind");
			} else if (options.state == 'contracted') {
				options.state = 'expanded';
				target.icon
					.removeClass(options.icons.headerContracted)
					.addClass(options.icons.headerExpanded);
				//target.element.find('h1').parent().next().show("blind");
			}
			target.element.find('h1').parent().next().toggle("blind");
		});
	},
	*/
});

$.extend( $.ui.panel, {
	version: "1.0"
});

})( jQuery );
