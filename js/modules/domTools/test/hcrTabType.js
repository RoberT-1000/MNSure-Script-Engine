/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/hcrTabType',function( _tab ){
	
	if( _engine.domTools.get.hcrTabList().length > 0 ){

		typeof _tab == 'undefined' ? 
			_tab = _engine.domTools.get.hcrTabActive() : 
			typeof _tab[0] != 'undefined' ?
				_tab = _tab[0] :
				_tab = _tab;

		if ( _tab.innerText.match(/\d+/g) == null ){
			// Titles without numbers

				//Titles Containg Search
			if ( _tab.innerText.indexOf("Search") != -1 ){

					// Case Search
				if ( _tab.innerText.indexOf("Case") != -1 ){
					return "Case Search";
					// Person Search
				} else if( _tab.innerText.indexOf("Person") != -1 ){
					return "Person Search";
				} else if( _tab.innerText.indexOf("Employer") != -1 ){
					return "Employer Search";
				} else if( _tab.innerText.indexOf("All Participants") != -1 ){
					return "All Participants Search";
				} else if( _tab.innerText.indexOf("Application") != -1 ){
					return "Application Search";
				} else if( _tab.innerText.indexOf("Investigation") != -1 ){
					return "Investigation Search";
				} else if( _tab.innerText.indexOf("Incident") != -1 ){
					return "Incident Search";
				} else if( _tab.innerText.indexOf("Educational Institute") != -1 ){
					return "Educational Institute Search";
				} else if( _tab.innerText.indexOf("External Party") != -1 ){
					return "External Party Search";
				} else if( _tab.innerText.indexOf("Utility") != -1 ){
					return "Utility Search";
				} else if( _tab.innerText.indexOf("External Party Office") != -1 ){
					return "External Party Office Search";
				}

			} else if( _tab.innerText.indexOf("My Applications") != -1 ){
				return "My Applications";
			} else if( _tab.innerText.indexOf("My Items of Interest") != -1 ){
				return "My Items of Interest";
			} else if( _tab.innerText.indexOf("My Cases") != -1 ){
				return "My Cases";
			} else if( _tab.innerText.indexOf("My Recently Approved Cases") != -1 ){
				return "My Recently Approved Cases";
			} else if( _tab.innerText.indexOf("Cases Recently Assigned to Me") != -1 ){
				return "Cases Recently Assigned to Me";
			}	else if( _tab.innerText.indexOf("Recently Viewed Cases") != -1 ){
				return "Recently Viewed Cases";
			}	else if( _tab.innerText.indexOf("My Service Plans") != -1 ){
				return "My Service Plans";


				//Person Page

			} else {

				_tabFrame = $( _engine.domTools.get.hcrTabFrame( _tab ) ).find('iframe.detailsPanelFrame');

				if( _tabFrame.length == 0 ){

					_returnTab = _engine.domTools.get.hcrTabActive();
					_tab.click();
					_returnTab.click();

					return "Person Page";


				} else if( _tabFrame.length > 0 ){ 

					if( $( _tabFrame ).attr('src').split("/")[1].split(".")[0].replace("TabDetailsPage", "").toLowerCase() == "person_home" ){

						return "Person Page";

					}

					//UNDEFINED
				} else {

					_engine.debug.info("- * UNDEFINED ( w/o numbers )");

					return "UNDEFINED";

				}

			} 

		} else {
			// Titles with numbers

				// Titles containing "Insurance Affordability"
			if( _tab.innerText.indexOf("Insurance Affordability") != -1 ){
					// Integrated Case Screen
				if( _tab.innerText.indexOf("Insurance Affordability") == 0 ){
					return  "Integrated Case";
					// Evidence Screen
				} else if( _tab.innerText.indexOf("Insurance Affordability") > 0 ) {
					return  "Evidence|" + _tab.innerText.split("-")[0].trim() ;
				}
			} else if ( $.inArray( _tab.innerText.replace(/[0-9]/g,"").trim().toLowerCase(), ["medical assistance", "minnesotacare", "unassisted qualified health plan", "insurance assistance"] ) != -1 ) {

				return "PDC|" + _tab.innerText.replace(/[0-9]/g,"").trim();

			} else {

				_engine.debug.info("- * UNDEFINED ( w/numbers )");
				return "UNDEFINED";

			}

		}

	} else {

		_engine.debug.warn("- * There are no open tabs that are available to test.");

		return "UNDEFINED";

	}
	
});