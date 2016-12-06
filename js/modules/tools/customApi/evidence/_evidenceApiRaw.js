/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/_evidenceApiRaw',function( type, callback ){
		/* Grab Initial Url for data type */
	_engine.tools.customApi.evidence._evidenceQueryUrlConstructor( type, function( initUrl ){
		/* Axaj Evidence Page */
		_engine.tools.customApi.evidence._ajaxAndReturnIframeContentDiv( initUrl, function( evidenceItemObj ){
			/* Obtain Urls of evidence summarys in evidence page */
			_engine.tools.customApi.evidence._getSubQueries( evidenceItemObj, function( evidenceDataWrapperUrls ){
				/* Query Evidence Summarys */
				_engine.tools.customApi.evidence._ajaxAndReturnIframeContentDiv( evidenceDataWrapperUrls, function( evidenceDataWrapperObj ){
					/* Obtain Urls of current/past evidence details */
					_engine.tools.customApi.evidence._getSubQueries( evidenceDataWrapperObj, function( evidenceDataUrls ){
						/* Query Evidence Details for current/history */
						_engine.tools.customApi.evidence._ajaxAndReturnIframeContentDiv( evidenceDataUrls, function( evidenceDataObj ){

							if( typeof callback === 'function' ) callback( evidenceDataObj, type );

						});
					});
				});
			});
		});
	});
	
});