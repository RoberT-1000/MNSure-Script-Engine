/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/_evidenceQueryUrlConstructor',function( type, callback ){
	
	var root = "en_US/Evidence_workspaceTypeListPage.do?";

	var curamObject = _engine.storage._curamCreatedObject.get();

	var caseID = curamObject.tabSignature.split("|")[1];

	var oc3tx = "o3ctx=" + curamObject.tabContent.parameters.o3ctx;

	var evidenceType = _engine.advanced._vars.queryDefinitions;

	var objReturn = {};

	if( _engine.domTools.test.hcrTabType() === "Integrated Case" ){

		var reqUrl = root + oc3tx + "&" + caseID + "&" + evidenceType[ type ];
		
		if( typeof evidenceType[ type ] !== 'undefined' ){

			_engine.debug.info(`Your generated request url is valid. This may be used to request results.`);

			objReturn = {
				"init" : {
					"url": reqUrl
				}
			};

			if( typeof callback === 'function' ) callback( objReturn );
			else return objReturn;

		} else {

			_engine.debug.info(`Your generated request url is invalid. Please define type of: ${ type }.`);

			return false;

		}

	} else if ( _engine.domTools.test.hcrTabType().split("|")[0] === "Evidence" ){

		type = _engine.domTools.test.hcrTabType().split("|")[1].toLowerCase();

		var srcUrl = $('iframe[title="Content Panel - Evidence"]').attr('src');

		if( typeof evidenceType[ type ] !== 'undefined' ){

			var reqUrl = root + oc3tx + "&" + caseID + "&" + evidenceType[ type ];

			if( srcUrl === reqUrl ) {

				_engine.debug.info(`Your generated request url is valid. This may be used to request results.`);

				_engine.debug.info(`Generated: ${reqUrl} | Sourced: ${srcUrl}`);

				return reqUrl;

			} else {

				_engine.debug.warn(`Your generated request url is invalid. Please Verify.`);

				_engine.debug.warn(`Generated: ${reqUrl} | Sourced: ${srcUrl}`);

				return false;

			}

		} else {

			var evidenceString = srcUrl.split('&');

			var evidenceValidator = "";

			$.each(evidenceString,function(k,v){
				if( v.indexOf("evidenceType") > -1 ){

					evidenceValidator += v;

				}
			});

			_engine.debug.warn(`Type of: [ '${ type }' ] is undefined. Define using: ${ evidenceValidator }`);

			return false;

		}

	}
	
});