/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/parsedQuery',function(type, callback){
	
	_engine.tools.customApi.evidence._evidenceApiRaw( type, function( evidenceInputObj, queryType ){

		var evidenceContainer = evidenceInputObj[Object.getOwnPropertyNames( evidenceInputObj )[0]];
		
		let totalItems = Object.getOwnPropertyNames( evidenceContainer ).length;
		
		var masterObject = {};

		let count = 0;

		var parsedEvidence = {};

		$.each( evidenceContainer, function( item, evidenceObj ){

			$.each( evidenceObj, function( scope, contentObj ){

				var jsonString = "";

				var unassigned = 0;

				if( scope === 'current' ) parsedEvidence = {};

				if( typeof contentObj.content !== 'undefined' ){

					$.each( $( contentObj.content ).find('div table th.label'), function(k,v){

						var info = $( v )[0];

						var key = info.innerText.trim().toLowerCase().replace(/ |\//g,"_");
						var value = $( info ).next()[0].innerText.trim();

						if( key !== "" || value !== "" ){
							if( key === "" ){
								key = unassigned;
								unassigned++;
							}

							jsonString += '"' + key + '":"' + value + '",'

						}

					});

				} else {

					jsonString = '"evidence_unavailable":"undefined",'

				}

				jsonString = jsonString.substring(0,jsonString.length-1);

				parsedEvidence[ scope ] = $.parseJSON( "{" + jsonString + "}" );

				if(scope === 'history'){
					masterObject[count] = parsedEvidence;
					count++;
				}

			});
			
			if( totalItems === count && typeof callback === 'function') callback( masterObject, type );

		});

	});
	
});