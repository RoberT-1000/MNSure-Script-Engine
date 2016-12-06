/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('navigation/icTabs/icTabNavi',function( naviText, callback ){

	if( _engine.domTools.test.hcrTabType() == 'Integrated Case' ){

		naviText = naviText.toLowerCase();
		var pageValidation = null;

		switch( naviText ){
			case "home":
				pageValidation = "home";
				pageNavigation = _engine.navigation.icTabs.icNavCore("Home");
				break;
			case "evidence":
				pageValidation = "dashboard";
				pageNavigation = _engine.navigation.icTabs.icNavCore("EvidenceFolder");
				break;
			case "participants":
				pageValidation = "listcasemember";
				pageNavigation = _engine.navigation.icTabs.icNavCore("ParticipantFolder");
				break;
			case "assessments":
				pageValidation = "listassessment";
				pageNavigation = _engine.navigation.icTabs.icNavCore("Assessments");
				break;
			case "services":
				pageValidation = "listservicedeliveries";
				pageNavigation = _engine.navigation.icTabs.icNavCore("Services");
				break;
			case "referrals":
				pageValidation = "listreferrals";
				pageNavigation = _engine.navigation.icTabs.icNavCore("Referrals");
				break;
			case "contact":
				pageValidation = "listnote";
				pageNavigation = _engine.navigation.icTabs.icNavCore("ContactFolder");
				break;
			case "tasks":
				pageValidation = "listtask";
				pageNavigation = _engine.navigation.icTabs.icNavCore("Tasks");
				break;
			case "issues and proceedings":
				pageValidation = "listinvestigation";
				pageNavigation = _engine.navigation.icTabs.icNavCore("IssuesAndProceedings");
				break;
			case "administration":
				pageValidation = "listcontest";
				pageNavigation = _engine.navigation.icTabs.icNavCore("AdminFolder");
				break;
			case "elections":
				pageValidation = "listcasemembersforelections";
				pageNavigation = _engine.navigation.icTabs.icNavCore("ElectionsFolder");
				break;
			default:
				pageValidation = "";
				pageNavigation = false;
				break;
		}


		// Timeout Counter
		_counter = 0;

		_engine.debug.info("========== Attempting to navigate to " + naviText + " ==========");

		// Run a max of 2500ms
		var _nav = setInterval(function(){

			if(_counter <= _engine.advanced._vars.iterations){

				_engine.debug.info("- * Navigation attempt: " + _counter);

				if( pageNavigation != false){

					var _src = $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').attr('src');

					if( typeof _src != "undefined" && _src.split("?")[0].split("/")[1].split("_")[1].split(".")[0].replace("Page",'').toLowerCase() == pageValidation ){

						var _id = $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').contents().find('body').attr('id');

						if( typeof _id != "undefined" && _id.split("_")[ _id.split("_").length - 1 ].toLowerCase() == pageValidation ){

							/* Extra screen specific validations */

							switch( pageValidation ){
								case "dashboard":
									if( $( _engine.domTools.get.icFrame.icTabActiveFrame()[0] ).find('td:has("a")').length > 1 ){

										_engine.debug.info("========== Completed navigation to " + naviText + " [ attempt: " + _counter + " ] ==========");

										if( typeof callback == 'function' ){
											callback( _engine.domTools.get.icFrame.icTabActiveFrame()[0] );
										}

										clearInterval(_nav);

									}											
									break;
								default:

									_engine.debug.info("========== Completed navigation to " + naviText + " [ attempt: " + _counter + " ] ==========");

									if( typeof callback == 'function' ){
										callback( _engine.domTools.get.icFrame.icTabActiveFrame()[0] );
									}

									clearInterval(_nav);

									break;

							}

						}

					}

					++_counter;

				} else {

					_engine.debug.error("- * Fail Reason: []: Failed to navigate to " + naviText + " tab. You are either not on an integrated case tab or your requested navigation was invalid.");	

					clearInterval(_nav);

				}

			} else {

				_engine.debug.error("- * Fail Reason: []: Failed to navigate to " + naviText + " tab. Navigation timed out.");	

				clearInterval(_nav);

			}

		},_engine.advanced._vars.timeout);

		_nav;

	} else {

		_engine.debug.warn("- * The IC Tab navigation function must be run from an Integrated Case Tab.")

		_engine.caseWork.caseSelection();
		return false;

	}

});