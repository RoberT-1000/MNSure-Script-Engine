/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/dom/dimLights',function( input ){
	
	let dim;
	$('.modal-overlay').length === 0 ?
		dim = true:
		dim = false;
	
	if( typeof input === 'boolean' ) dim = input;
	
	if( dim ){
		if( !$('body').hasClass('modal') ) $('body').addClass( 'modal' );
		if( $('.modal-overlay').length === 0 ){
			let dimmer = $('<div>',{ 'class' : 'modal-overlay' });
			$('body').append( dimmer );
		}
	}
	else {
		if( $('body').hasClass('modal') ) $('body').removeClass( 'modal' );
		$('.modal-overlay').remove();
	}
	
});