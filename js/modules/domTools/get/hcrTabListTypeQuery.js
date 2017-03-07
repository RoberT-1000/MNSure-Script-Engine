/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabListTypeQuery',function( reqType ){
	
	let returnVal = [],
			typeMatch = [];
	
	if( typeof reqType === 'string' ) typeMatch.push( reqType.toLowerCase() );
	else if ( Array.isArray( reqType ) ) $.each(reqType,function(k,v){ typeMatch[k] = v.toLowerCase() });
	
	$.each( _engine.domTools.get.hcrTabList(), function( k, v ){
		
		let tabType = _engine.domTools.test.hcrTabType( $( v ) ).toLowerCase();
		
		if( typeMatch.indexOf( tabType ) > -1 ) returnVal.push( v );
		
	});

	return returnVal;
	
});