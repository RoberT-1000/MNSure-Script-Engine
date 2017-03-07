/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_prefillFromDataQuery',function( type, callback ){

	type = type.toLowerCase();

	var scope = 'current';

	if( type.indexOf("(") !== -1 ){
		
		scope = type.substring( type.lastIndexOf("(")+1,type.lastIndexOf(")") );
		type = type.substring( 0 ,type.lastIndexOf("(") );
		
	} else {
		
		_engine.debug.warn(`No scope defined in prefill call. Defaulting to current.`);
		
	}

	if( scope !== 'history' ){
		if( scope !== 'current' ){
			_engine.debug.warn(`Invalid use of prefill scope: ${ scope }. Using current instead.`);
			scope = 'current';
		}
	}

	var returnConstructor = function( dataObject ){
		
		let useObject = {
					current: {},
					history: {}
				}, 
				prefillString = '';
		
		if( Object.getOwnPropertyNames( dataObject ).length === 1 ){
			/* Use the only piece of evidence available */
			useObject = dataObject[0];
		}
		else if (  Object.getOwnPropertyNames( dataObject ).length > 1  ){
			/* Determine what evidence to use */
			
			$.each(_engine.storage.nocache.query('caseData.participants'),function(key,participant){
				if( participant.role === 'Primary Client' ){
					
					let matchedName = participant.name.toLowerCase(),
							useScope = 'current',
							nameField = '0',
							type = 'residential';
					
					$.each(dataObject,function(key,value){
							// If current is an invalid field set scope to history
						if( typeof value[useScope].evidence_unavailable !== 'undefined' ){ useScope = 'history'; }
						
						if( typeof value[useScope].evidence_unavailable === 'undefined' ){
							
							if( value[useScope][nameField].toLowerCase().indexOf( matchedName ) > -1 ){
								
								if(typeof value[useScope].to !== 'undefined'){
									
									if(typeof value[useScope].type !== 'undefined'){
										
										useObject[useScope][value[useScope].type] = value[useScope];
										
									}
									else {
										
										useObject[useScope] = value[useScope];
										
									}
									
								}
								
							}
							
						}
						
					});
					
				}
			});
		}
		else {
			/* No results - setup prefill to n/a */
			prefillString += 'n/a';
			_engine.debug.error('No data was available to prefill requested field.');
		}
		
		var isAvailable = function(){
			let result;
			typeof useObject[scope].evidence_unavailable === 'undefined' ?
				result = true :
				result = false;
			if( result === false ) prefillString += "n/a";
			return result;
		}
		
		switch( type ){
			case 'income':
					
					_engine.debug.warn('income prefill is in need of definition');
					
				break;
			case 'addresses':
				
				if( isAvailable() ){
					
					let result = useObject[scope].Residential;
					
					if( typeof result !== 'undefined' ){
					
						if( result.apt_suite !== "" ) prefillString += result.apt_suite + ", ";
						if( result.street_1 !== "" ) prefillString += result.street_1 + ", ";
						if( result.street_2 !== "" ) prefillString += result.street_2 + ", "; 
						if( result.city !== "" ) prefillString += result.city + ", "; 
						if( result.state !== "" ) prefillString += result.state + ", "; 
						if( result.zip !== "" ) prefillString += result.zip; 
						
					}
					else {
						prefillString += "n/a";
					}
					
				}
				
				break;
			case 'service agency':
				
				if( isAvailable() ){
					
					let result = useObject[scope];
					if( result[0] !== "" ) prefillString += result[0];
					
				}
				
				break;
			default:
				
				_engine.debug.info("The requested autofill type has no definitions.");
				
				break;
				
		}
		if(typeof callback === 'function') callback( prefillString );
	}

	_engine.storage.prefillCache.checkPrefillCache( type, function( evidenceFromCacheObj ){
		if( typeof evidenceFromCacheObj === 'undefined' ){
			
			_engine.debug.info(`Obtaining result set from via data query for request type: ${ type }`);
			_engine.tools.customApi.evidence.queryAndCache( type, function(results){
				
				returnConstructor( results );
				
			});
			
		} else {
			
			_engine.debug.info(`Obtaining result set from internal cache for request type: ${ type }`);
			returnConstructor( evidenceFromCacheObj );
			
		}
	});

});