/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/dom/prepUI',function( callback ){

		/* Resize left titlebar */
	let newWidth = $('.left-box .title-container .title').width() + $('.left-box .title-container .subtitle').width() + 40;
		
	$('.left-box .title-container').width( newWidth );
	
		/* Resize right titlebar */
	$('.right-box .left-cell').width( 'inherit' );
	
	if(typeof callback === 'function') callback();

});