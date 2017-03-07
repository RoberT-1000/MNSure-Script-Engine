/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_start',function( input ){
	
	_engine.caseWork.global.onCaseScreen(function(){
		
		let config = false;
		
		switch( input.toLowerCase() ){
			case 'client contact':
				config = {
					title: 'Client Contact',
					tasks: [
						{
							title: 'Case Note',
							action: 'writeNote/client contact'
						}
					]
				}
				break;
			default:
				_engine.debug.warn(`${ input } is not a valid definition to launch merlin.`);
				break;
		}
		
		if( config ) _engine.caseWork.merlin.cast( config );
		
	}, true);
	
});