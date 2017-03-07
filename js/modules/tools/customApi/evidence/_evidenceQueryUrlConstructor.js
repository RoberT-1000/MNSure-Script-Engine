/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/customApi/evidence/_evidenceQueryUrlConstructor',function( type, callback ){
	
	let root = "en_US/Evidence_workspaceTypeListPage.do?",
			curamObject = curam.tab.getSelectedTab().params.tabDescriptor,
			caseID = "caseID=" + curamObject.tabContent.parameters.caseID,
			oc3tx = "o3ctx=" + curamObject.tabContent.parameters.o3ctx,
			queryDefinition = _engine.advanced._vars.queryDefinitions,
			objReturn = false,
			reqUrl = root + oc3tx + "&" + caseID + "&" + queryDefinition[ type ],
			err = false;
	
	if( _engine.domTools.test.hcrTabType() === "Integrated Case" ){
		if( typeof queryDefinition[ type ] !== 'undefined' ){

			objReturn = { "init" : { "url" : reqUrl } };

			if( typeof callback === 'function' ) callback( objReturn );

		}
		else err = `Your generated request url is invalid. Please define type of: ${ type }.`;
	} 
	else if ( _engine.domTools.test.hcrTabType().split("|")[0] === "Evidence" ){
		
		type = _engine.domTools.test.hcrTabType().split("|")[1].toLowerCase();

		let srcUrl = $('#HCRCASEAPPWorkspaceSection-stc > .dijitTabPaneWrapper > [role="tabpanel"].dijitVisible iframe[title="Content Panel - Evidence"]').attr('src');

		if( typeof queryDefinition[ type ] !== 'undefined' ){

			if( srcUrl === reqUrl ) {

				_engine.debug.info(`Generated: ${reqUrl} | Sourced: ${srcUrl}`);

				return reqUrl;

			} else {

				_engine.debug.warn(`Your generated request url is invalid. Please Verify.`);
				_engine.debug.warn(`Generated: ${reqUrl} | Sourced: ${srcUrl}`);

			}

		} else {

			var evidenceString = srcUrl.split('&');

			var evidenceValidator = "";

			$.each(evidenceString,function(k,v){
				if( v.indexOf("queryDefinition") > -1 ){

					evidenceValidator += v;

				}
			});

			_engine.debug.warn(`Type of: [ '${ type }' ] is undefined. Define using: ${ evidenceValidator }`);

		}

	}
	
});