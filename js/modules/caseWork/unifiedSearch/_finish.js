/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/_finish',function( modalId, params ){
	
	if( typeof params === 'undefined' ) params = _engine.storage.nocache.data.modal[modalId].data.params;
	
	$.each( params, function( k, v ){

		let input = v.value.trim().replace(/[^\w\s]| +(?= )/g,'');
			
		if( $.isNumeric( input.replace(/[^0-9]/g,'') ) ){
			input = input.replace(/[^0-9]/g,'');
			
			if( [8].indexOf( input.length ) > -1 ){
				//Case Search
				_engine.search._case(function(){
					_engine.domTools.set.searches.fieldFill("Reference",input);
					_engine.tools.selectSearchResult();
				});
				
			}
			else if( [9,10].indexOf( input.length ) > -1 ){
				//Person Search
				_engine.search._person(function(){
					_engine.domTools.set.searches.fieldFill("Reference",input);
					_engine.tools.selectSearchResult();
				});
				
			}
			else {
				// Invalid input handler
				// This will require throw error dom functionality
			}
			
		}
		else {
			
			let name = input.replace(/\|/g,' ').replace(' ','|').split('|');
				
			_engine.search._person(function(){
				
				console.log( name );
				
				_engine.domTools.set.searches.fieldFill("First Name", name[0]);
				
				if( name[1] ) _engine.domTools.set.searches.fieldFill("Last Name", name[1]);
				
				_engine.tools.selectSearchResult();
				
			});
			
		}
		
	});

});