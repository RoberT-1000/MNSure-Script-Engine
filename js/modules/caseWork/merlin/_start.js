/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_start',function( input ){
	
	_engine.caseWork.global.onCaseScreen(function(){
		
		let config = null;
		
		switch( input.toLowerCase() ){
			case 'client contact':
				config = {
					title: 'Client Contact',
					tasks: {
						note: 'client contact'
					}
				}
				break;
			default:
				_engine.debug.warn(`${ input } is not a valid definition to launch merlin.`);
				break;
		}
		
		if( config !== null ){
			_engine.caseWork.merlin.cast( config );
		}
		
	},true);
	
});