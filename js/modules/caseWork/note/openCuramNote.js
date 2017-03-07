/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/openCuramNote',function( callback ){
	_engine.caseWork.global.onCaseScreen(function(){
		
		let curamObj = curam.tab.getSelectedTab().params.tabDescriptor;
		
		let openModal = function( url ){
			
			curam.util.openModalDialog({ href: url }, '');
			
			let count = 0;
		
			let modalOpen = setInterval(function(){
				if( count <= 400 ){
					if( _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal( false ) ){
						if( typeof callback === 'function' ) callback();
						clearInterval( modalOpen );
					}
					count++;
				}
				else {
					clearInterval( modalOpen );
				}
			},25);
			
		}
		
		$.ajax({
			url: 'en_US/DefaultIC_listNotePage.do',
			data: {
				o3ctx: curamObj.tabContent.parameters.o3ctx,
				caseID: curamObj.tabContent.parameters.caseID,
				o3nocache: curam.util.getCacheBusterParameter().split('=')[1]
			},
			async: true,
			success: function(data){
				let node = $.grep($.parseHTML(data),function(ele){ 
					return($(ele).attr('id') === 'content'); 
				});
				
				let url = $(node).find('.action-set a').attr('onclick').split(/'/g)[1];
				
				openModal( url );
				
			}
		});
		
	},true);
});