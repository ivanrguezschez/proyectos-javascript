/*
 * jQuery UI Box 1.0
 *
 * Copyright 2011
 *
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.box", {
	options: {
		type: 'message', // message|error
		message: '',
		hidden: false
	},
	_create: function() {
		this.boxIconElement = $('<span class="ui-box-icon ui-icon"></span>');
		this.boxTextElement = $('<p class="ui-box-text"></p>');
		
		this.element.addClass('ui-widget ui-corner-all ui-box');

		this.element.append(this.boxIconElement);
		this.element.append(this.boxTextElement);
	},
	_init: function() {
	   	/*
		var e = this.element;
		//e.html('');
		setTimeout(function() { e.html('');}, 1500);
		*/
		this._refreshMessage(); 	
	},
	destroy: function() {
		this.boxIconElement.remove();
		this.boxTextElement.remove();
		this.element.removeClass('ui-widget ui-corner-all ui-box ui-state-highlight ui-state-error');
		$.Widget.prototype.destroy.apply(this, arguments);
	},
	message: function(newMessage) {
		if ( newMessage === undefined ) {
			newMessage = this._message();
		}
		this._setOption("message", newMessage);
		this._setOption("hidden", false);
		this._refreshMessage();
	},
	_setOption: function( key, value ) {
		if ( key === "message" ) {
			this.options.message = value;
		} else if( key === "hidden" ) {
			this.options.hidden = value;
		}
		$.Widget.prototype._setOption.apply( this, arguments );
	},
	_message: function() {
		return this.options.message;
	},
	_refreshMessage: function() {
		this.element.removeClass('ui-state-highlight ui-state-error');
		this.boxIconElement.removeClass('ui-icon-alert ui-icon-info');
		if (this.options.type == 'error') {
			this.element.addClass('ui-state-error');
			this.boxIconElement.addClass('ui-icon-alert');
		} else {
			// message por defecto
			this.element.addClass('ui-state-highlight');
			this.boxIconElement.addClass('ui-icon-info');
		}
		this.boxTextElement.html(this._message());
		if (this.options.hidden) {
			this.element.hide(); 
		} else {
			this.element.show();
		}
	}
});

$.extend( $.ui.box, {
	version: "1.0"
});

})( jQuery );
