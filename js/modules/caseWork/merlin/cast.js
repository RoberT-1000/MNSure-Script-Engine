/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/cast',function( input ){
	
	_engine.caseWork.global.onCaseScreen(function(){
		
		_engine.advanced.getView('merlin/modal-template.html',function( template ){
			
			let modal = $.parseHTML( template );
			
			let uniqueID = _engine.advanced.generateId();
			
			_engine.storage.nocache.data.modal[uniqueID] = {
				loaded: false,
				tasks: 0
			}
			
			let config = {
				title: 'DEFAULT TITLE',
				tasks: {}
			};
			
			$.each(input,function(k,v){ config[k] = input[k]; });
			
			$( modal ).attr( 'data-id', uniqueID );
			
			$( modal ).find( '.dijitDialogTitle' ).text( config.title );
			
			_engine.ui.dom.dimLights( true );
			
			$( '.modal-overlay' ).append(modal);
			
			_engine.caseWork.merlin._attachTasks( uniqueID, config.tasks );
			
				/* Enable Modal Resizing and Dragging
			***************************************************/
				
				$('[data-id="'+uniqueID+'"]').center();
				
				$('[data-id="'+uniqueID+'"]').draggable({ 
					handle: $('[data-id="'+uniqueID+'"] .dijitDialogTitleBar')[0], 
					stack: '.dijitDialog',
					containment: '.modal-overlay'
				});
				$('[data-id="'+uniqueID+'"]').resizable();
				
			/* Setup Modal Actions 
			***************************************************/
				// Closeout Modal
				
				_engine.caseWork.merlin.setupAction({
					item: '[data-id="'+uniqueID+'"] [data-role="titlebar-close-button"]',
					trigger: 'click',
					action: function(){ _engine.caseWork.merlin.destroy( uniqueID ) }
				});
				
				_engine.storage.nocache.data.modal[uniqueID].loaded = true;
				_engine.storage.nocache.data.modal[uniqueID].role = 'wizard';
				
		});
	
	}, true );

});