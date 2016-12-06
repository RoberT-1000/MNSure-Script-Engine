/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/build',function( modalReq, callback ){
	
	if( typeof _engine.storage.nocache.data.modal === 'undefined' ) _engine.storage.nocache.data.modal = {};
	
	let mnsModalFooterButtonContainer, config;
	
		// Button Creator for the modal creator
	let addButton = function( key, req ){
		
		let props = { label:'error', onclick:'return false;', role:'', filler:true};
		
		if(typeof req === 'string'){
			switch( req.toLowerCase() ){
				case 'submit':
					props.label = 'Submit';
					props.onclick = "_engine.events.handleClickEvent('ui.modal._button(submit)')";
					props.role = 'submit';
					break;
				case 'close':
					props.label = 'Close';
					props.onclick = "_engine.events.handleClickEvent('ui.modal._button(close)')";
					props.role = 'exit';
					break;
				default:
					break;
			} 
		}
		else if( typeof req === 'object' ) {	$.each(req,function(k,v){ props[k] = req[k] });	}
		
		let mnsModalButton = $('<a>', {'onClick':props.onclick, 'data-role':props.role, 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+props.label+'</span></span></span>'});
		
		$( mnsModalFooterButtonContainer ).append( mnsModalButton );
		
		if( ( key + 1 ) !== config.buttons.length && config.buttons.length > 1){
			//Modal footer - Filler Span
			let mnsModalButtonFiller = $('<span>', {'class':'filler'});
			$( mnsModalFooterButtonContainer ).append( mnsModalButtonFiller );
		}
		
	} //End of addButton function
		
	let template = function( msg ){
		return '<div class="mns-modal-template"><span class="mns-input-group"><span class="mns-input-label mns-input-infotext">'+msg+'</span></span></div>';
	}
		
		//Modal defaults
	config = {
		html: null,
		text: 'No defined html template was passed.',
		title: 'DEFAULT MODAL TITLE',
		buttons: ['Close']
	}
	
		//Lay the config over the defaults
	$.each(modalReq,function(k,v){ config[k] = modalReq[k]; });
	if( config.html === null ) config.html = template( config.text );
	
	/* Place the overlay onto the window
	=====================================================*/
		
			//Add modal class to body
		$('body').addClass('modal');
			
		//Greyed out layout background
			
		let overlay = $('<div>',{
			'class' : 'modal-overlay'
		});
		
	/* Build the modal
	=====================================================*/
		
		/* Modal Wrapper
		--------------------------*/
		let contentWrapper = $('<div>',{
			'class':'modal-content-wrapper dijitDialog'
		});
			
		$( overlay ).append( contentWrapper );
			
		/* Titlebar
		--------------------------*/
		let titlebar = $('<div>',{
			'class':'dijitDialogTitleBar modal-titlebar'
		});
			
		let dialogTitle = $('<span>',{
			'class':'dijitDialogTitle',
			'text':config.title
		});
			
		let closeButton = $('<span>',{
			'class':'dijitDialogCloseIcon', 
			'onClick':"_engine.events.handleClickEvent('ui.modal._button(close)')"
		});
			
		$( titlebar ).append( dialogTitle );
		$( titlebar ).append( closeButton );
			
		$( contentWrapper ).append( titlebar );
			
			/* Content Wrapper
			--------------------------*/
		let modalContentContainer = $('<div>',{
			'class': 'modal-content-container',
			'html': config.html
		});
		
		$( contentWrapper ).append( modalContentContainer );
		
			/* Modal Footer
			--------------------------*/
		let mnsModalFooter = $('<div>', {
			id:'mns-modal-actions', 
			'class':'actions-panel'
		});
			
			//Modal footer - Button Container
		mnsModalFooterButtonContainer = $('<div>', {
			'class':'action-set center'
		});
			
		$( mnsModalFooter ).append( mnsModalFooterButtonContainer );
			
		$( contentWrapper ).append( mnsModalFooter );
			
		$.each(config.buttons,function(k,v){ addButton(k,v); });
			
	/* Show the modal to the user
	=====================================================*/
			
		$('body').append( overlay );
			
	/* Setup any post display actions/watchers
	=====================================================*/
		
		_engine.ui.modal._setupClusters();
		_engine.ui.modal._watch();
		$('.modal-content-wrapper').draggable({ handle: 'div.modal-titlebar' });
		if( typeof callback === 'function' ) callback();
		
});