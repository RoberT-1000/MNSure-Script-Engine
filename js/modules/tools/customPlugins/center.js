$.fn.center = function(){
		
	let winW = $( window ).width(),
			objW = $( this ).width(),
			left = (winW - objW) / 2,
			winH = $( window ).height(),
			objH = $( this ).height(),
			top = (winH - objH) / 2;
	
	$( this ).css( 'left', left );
	$( this ).css( 'top', top );
	
}