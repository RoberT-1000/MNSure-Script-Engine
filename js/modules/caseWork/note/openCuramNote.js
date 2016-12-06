/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/openCuramNote',function( callback ){
	_engine.caseWork.global.onCaseScreen(function(){
		
		let curamObj = _engine.storage._curamCreatedObject.get();
		
		let __o3rpu = 'DefaultIC_listNotePage.do';
		
		__o3rpu += curam.util.makeQueryString({
			'o3ctx': curamObj.tabContent.parameters.o3ctx,
			'caseID': curamObj.tabContent.parameters.caseID
		});
		
		let url = 'Case_createNote1Page.do';
		
		let description = curamObj.tabContent.tabName.split('-')[0].trim().replace('Insurance Affordability','Insurance+Affordability').replace(' ','+-+');
		
		url += curam.util.makeQueryString({
			'caseID' : curamObj.tabContent.parameters.caseID,
			'pageDescription': 'DESCRIPTION',
			'o3ctx' : '256',
			'__o3rpu' : __o3rpu
		});
		
		url = curam.util.replaceUrlParam(url,'pageDescription',description);
		
		curam.util.openModalDialog({ href: url }, '');
		
		let count = 0;
		
		let modalOpen = setInterval(function(){
			if( count <= 400 ){
				if( _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal( false ) ){
					if( typeof callback === 'function' ) callback();
					clearInterval( modalOpen );
				}
				count++
			}
			else {
				clearInterval( modalOpen );
			}
		},25);
	},true);
});