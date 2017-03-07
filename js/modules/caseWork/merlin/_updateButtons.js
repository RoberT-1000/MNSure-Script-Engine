/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_updateButtons',function( id, buttonConfig ){
	
		// Button Creator for the modal creator
	let addButton = function( key, req ){
		
		console.log(key,req);
		
		let props = { label:'error', onclick:'return false;', role:'', filler:true };
		
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
		
	}
	
	let btnContainter = $('[data-id="'+id+'"] .actions-panel .action-set');
	$( btnContainter ).html('');
	
	$.each(buttonConfig,function(k,v){ addButton(k,v); });
	
});