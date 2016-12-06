/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('navigation/mainTabs/mainTabNavi',function( tab, callback ){

	tab = tab.toLowerCase();

	let navTitle = "";

	if(tab === "hcr") tab = "hcr cases and outcomes";

	switch( tab ){
		case "home":
			navTitle = "Home";
			break;
		case "hcr cases and outcomes":
			navTitle = "HCR Cases and Outcomes";
			break;
		case "inbox":
			navTitle = "Inbox";
			break;
		case "calendar":
			navTitle = "Calendar";
			break;
		default:
			break;
	}

	if( navTitle != _engine.domTools.get.mainTabActive().innerText.trim() ){

		$(`[title='${navTitle}']`)[0].click();

	}

	if(typeof callback === 'function') callback();

});