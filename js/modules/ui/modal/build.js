/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/build', function(modalReq, callback) {

	let mnsModalFooterButtonContainer, config, template, returnProps;

	// Button Creator for the modal creator
	let addButton = function(key, req, template) {

			let props = {
				label: 'error',
				onclick: 'return false;',
				role: '',
				filler: true
			};

			if (typeof req === 'string') {
				switch (req.toLowerCase()) {
					case 'submit':
						props.label = 'Submit';
						props.role = 'submit';
						break;
					case 'close':
						props.label = 'Close';
						props.role = 'close';
						break;
					default:
						break;
				}
			} else if (typeof req === 'object') {
				$.each(req, function(k, v) {
						props[k] = req[k]
				});
			}

			let mnsModalButton = $('<a>', {
				'onClick': props.onclick,
				'data-role': props.role,
				'html': '<span class="left-corner"><span class="right-corner"><span class="middle">' + props.label + '</span></span></span>'
			});

			$( $(template).find('.action-set') ).append(mnsModalButton);

			if ((key + 1) !== config.buttons.length && config.buttons.length > 1) {
				//Modal footer - Filler Span
				let mnsModalButtonFiller = $('<span>', {
					'class': 'filler'
				});
				$( $(template).find('.action-set') ).append(mnsModalButtonFiller);
			}
			
		} //End of addButton function
	
	// Create uniqueId to identify modal
	let uniqueId = _engine.advanced.generateId();
	
	// Default template if only a text string is specified
	let textTemplate = function( msg ) {
		return '<div class="mns-modal-template"><span class="mns-input-group"><span class="mns-input-label mns-input-infotext">' + msg + '</span></span></div>';
	}

	//Modal defaults
	config = {
		role: null,
		html: null,
		text: 'No defined html template was passed.',
		title: 'DEFAULT MODAL TITLE',
		buttons: ['Close']
	}

	//Lay the config over the defaults
	$.each(modalReq, function(k, v) {
		config[k] = modalReq[k];
	});
	if (config.html === null) config.html = textTemplate(config.text);
	
	// Create data object in nocache for modal
	_engine.storage.nocache.data.modal[uniqueId] = {
		loaded: false,
		role: config.role,
		data: {}
	};

	// Get default template for modal from views
	_engine.advanced.getView('modal/default.html',function(template){ 
		
		template = $.parseHTML( template )[0];
		
		$( template ).attr('data-id',uniqueId);
		
		$( template ).find( '.dijitDialogCloseIcon' ).attr( 'onclick', "_engine.ui.modal._button('[data-id="+uniqueId+"] .dijitDialogCloseIcon','"+uniqueId+"');" );
		
		$( template ).find( '.dijitDialogTitle' ).text( config.title );
		
		$( template ).find('.modal-content-container').html( config.html );
		
		$.each(config.buttons, function(k, v) {
			addButton(k, v, template);
		});
		
		_engine.ui.dom.dimLights(true);
		
		//$( curam.util.getTopmostWindow().document.body ).append( template );
		$( '.modal-overlay' ).append( template );
		
		/* Setup any post display actions/watchers
		=====================================================*/
		
		$('[data-id='+uniqueId+']').center();
		
		_engine.ui.modal._setupClusters( uniqueId );
		
		_engine.ui.modal._watch( uniqueId );
		
		$('[data-id='+uniqueId+']').draggable({
			handle: 'div.modal-titlebar',
			stack: '.dijitDialog',
			containment: '.modal-overlay'
		});
		
		returnProps = {
			id: uniqueId
		}
		
		// Create data object in nocache for modal
		_engine.storage.nocache.data.modal[uniqueId].loaded = true;
		
		if (typeof callback === 'function') callback( returnProps ); 
		
	},true);

});