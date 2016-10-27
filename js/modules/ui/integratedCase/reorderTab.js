_engine.module.define('ui/integratedCase/reorderTab',function( target, insertAfter ){
	
	_engine.domTools.test.hcrTabActiveIsIC(function(result){ 
		if(result){
			
			if( typeof target === 'string' && typeof insertAfter === 'string' && target !== insertAfter ){

				target = target.toLowerCase();
				insertAfter = insertAfter.toLowerCase();

				$.each(_engine.domTools.get.icFrame.icTabList(),function(key,tab){

					let tabTitle = $(tab)[0].innerText.toLowerCase().trim();

					if( tabTitle === target ) target = tab;
					if( tabTitle === insertAfter ) insertAfter = tab;

				});

				if( typeof target === 'object' && typeof insertAfter === 'object' ){

					$( target ).insertAfter( $( insertAfter ) );

				}

			}
			
		}
	});
	
});