/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/_ajaxAndReturnIframeContentDiv',function( reqObj, callback ){
	
	var ajaxObj = function( inputObj ){

		var ajaxReturn = {};

		$.each(inputObj,function(scope,data){

			if( typeof data.url !== 'undefined' ){

				$.ajax({
					url: data.url,
					async: false,
					success: function( data ){
						var parsed = $.parseHTML( data );
						$.each(parsed,function(keyParsed,valueParsed){
							if( $(valueParsed).attr('id') === 'content' ){
								ajaxReturn[scope] = {
									"content" : valueParsed
								}
							}
						});
					}
				});

			} else {

				ajaxReturn[scope] = {
					"content" : undefined
				}

			}

		});

		return ajaxReturn;

	}

	var returnObj = {};

	var deepObj = false;

	var requestScope = Object.getOwnPropertyNames( reqObj )[0];

	var deepScope = ["evidenceData","evidenceItem"];

	if( deepScope.indexOf( requestScope ) > -1 ) deepObj = true;

	/* Deep Object */
	if( deepObj ){
		if( requestScope === 'evidenceItem' ){	

			returnObj[requestScope] = ajaxObj( reqObj[requestScope] );

		} else {

			returnObj[requestScope] = {};

			$.each(reqObj[requestScope],function(k,v){

				var result = ajaxObj( v );

				returnObj[requestScope][k] = result;

			});

		}
	} 
	/* Shallow Object */
	else returnObj = ajaxObj( reqObj );

	if( typeof callback === 'function' ) callback( returnObj );
	else return returnObj;
	
});