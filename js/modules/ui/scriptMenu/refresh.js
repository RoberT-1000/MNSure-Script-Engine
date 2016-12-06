/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/scriptMenu/refresh',function(){

	_engine.ui.scriptMenu.destroy();

	_engine.ui.scriptMenu.build();
	
	
	$('#script-launcher, #script-launcher li').on('click',function( event ){
		
		event.stopPropagation();
		
		var req =  $( $(this).children('[data-click]')[0]).attr('data-click'); 
		
		if( typeof req !== 'undefined' && req !== '' ) _engine.events.handleClickEvent( req );
		 
	});

});