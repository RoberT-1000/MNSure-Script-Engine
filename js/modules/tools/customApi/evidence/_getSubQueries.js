/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/_getSubQueries',function( reqObj, callback ){
	
	var processSubQueries = function( inputObj, deepObj ){
		
		let objClassArray = $( inputObj[Object.getOwnPropertyNames( inputObj )[0]].content ).find('table').attr('class').split(" ");
		
		let returnScope;
		
		$.each(objClassArray,function(key,objClass){

			if(objClass.indexOf("list-id-Evidence") > -1) {

				var scopeid = objClass.split("_")[1].split("-")[0];

				if( scopeid === 'workspaceTypeList' ) returnScope = "evidenceItem";
				if( scopeid === 'listEvdInstanceChanges' ) returnScope = "evidenceData";

			}

		});

		let subQueryReturn = {};
				subQueryReturn[returnScope] = {};
		
		$.each(inputObj,function( scope, contentObj ){
			
			var queryElements = $( contentObj.content ).find('table tbody tr, table tbody script');
			
			let parsedTable = $('<tbody>',{})[0];
			
			$.each(queryElements,function(key, queryElement){
				
				if( $( queryElement ).hasClass('empty-row') && key === 0 ) return false;
				else {
					
					if( $( queryElement ).is('script') ){
						 $( parsedTable ).append( $.parseHTML( $( queryElement )[0].innerHTML ));
					}
					
				}
				
			});
			
			if( returnScope === 'evidenceItem' ){

				var parsedRows = $( parsedTable ).find('.list-details-row');

				var count = 0;

				$.each( parsedRows, function( key, parsedRow ){

					var url = "en_us/" + $( parsedRow ).find('div').attr('url');

					subQueryReturn[returnScope][count] = {
						"url": url
					}

					count++;

				});

			}

			if( returnScope === "evidenceData" ){

				var parsedRows = $( parsedTable ).find('tr');

				var currentUrl, pastObj, pastUrl;
				var pastEnd = "";

				$.each( parsedRows, function( key, row ){

					if( !$( row ).hasClass('list-details-row') ){

						var relevantDateItem = $( row ).find('td')[4];

						var relevantDateEnd = $( relevantDateItem )[0].innerText.replace(/ /g,"").split("-")[1];

							// Setup Current Evidence
						if(relevantDateEnd === ""){

							currentUrl = "en_us/" + $( parsedRows[key+1] ).find('div').attr('url');

						}

						if(relevantDateEnd !== ""){

							if( pastEnd === "" ){

								pastEnd = relevantDateEnd;
								pastObj = parsedRows[key+1];

							} else {

								var pastDate = new Date( pastEnd ).getTime();
								var testDate =  new Date( relevantDateEnd ).getTime();

								if( pastDate < testDate ){

									pastEnd = relevantDateEnd;
									pastObj = parsedRows[key+1];

								}

							}

						}

					}

				});

				if( pastEnd === '' ) pastUrl = undefined;
				else pastUrl = "en_us/" + $( pastObj ).find('div').attr('url');

				subQueryReturn[returnScope][scope] = {
					"current": {
						url: currentUrl
					},
					"history": {
						url: pastUrl
					}
				}

			}
			
		});
		
		return subQueryReturn;

	}

	let returnObj = {},
			deepObj = false;

	let requestScope = Object.getOwnPropertyNames( reqObj )[0];
	
	if( ["evidenceData","evidenceItem"].indexOf( requestScope ) > -1 ) deepObj = true;

	/* Deep Object */
	if( deepObj ) returnObj = processSubQueries( reqObj[requestScope], deepObj );
	/* Shallow Object */
	else returnObj = processSubQueries( reqObj, deepObj );

	if( typeof callback === 'function' ) callback( returnObj );
	else return returnObj;
	
});