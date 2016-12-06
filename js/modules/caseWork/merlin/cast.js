/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/cast',function( input ){

	/*

		IFRAME CARD

			width: 94%;
			height: 96%;
			box-shadow: 1px 1px 2px rgba(0,0,0,.5);
			border: 1px solid rgba(0,0,0,.1);
	*/
	
	_engine.caseWork.global.onCaseScreen(function(){
		
		if( typeof _engine.storage.nocache.data.merlin === 'undefined' ) _engine.storage.nocache.data.merlin = {};
		
		let config = {
			title: '',
			tasks: {}
		};
		
		$.each(input,function(k,v){ config[k] = input[k]; });
		
		let uniqueID = _engine.advanced.generateId();
		
		/* Shaded Backdrop
		***************************************************/
			var backDrop = _engine.ui.dom.createElement({ 
				type: 'div', 
				id: uniqueID, 
				classes:'merlin-backdrop'
			});

		/* Modal Wrapper Element
		***************************************************/
			var wrapperDiv = _engine.ui.dom.createElement({ 
				type: 'div', 
				id:'merlinModal-'+uniqueID, 
				classes: 'dijitDialog merlin-wrapper'
			});

		/* Title Bar Elements
		***************************************************/
			var titleBar = _engine.ui.dom.createElement({ 
				type: 'div', 
				id:'merlinTitleBar-'+uniqueID, 
				styles:'height: 21px;width: 100%;', 
				classes:'dijitDialogTitleBar'
			});

			var titleBarText = _engine.ui.dom.createElement({ 
				content: config.title, 
				type: 'span', 
				classes:'dijitDialogTitle'
			});

			var titleBarCloseButton = _engine.ui.dom.createElement({ 
				id:"titleBarCloseButton", 
				type: 'span', 
				classes:'dijitDialogCloseIcon'
			});

		/* Left Content Wrapper
		***************************************************/
			var leftContent = _engine.ui.dom.createElement({ 
				type: 'div',
				classes:'merlin-leftContent',
			});

			var leftContentContainer = _engine.ui.dom.createElement({ 
				type: 'div', 
				id:'merlinTaskBinder',
				classes: 'merlin-taskBinderContainer'
			});

		/* Modal Body Wrapper
		***************************************************/
			var bodyContent = _engine.ui.dom.createElement({ 
				type: 'div', 
				classes:'merlin-bodyContent',
			});
			
			var bodyContentContainer = _engine.ui.dom.createElement({ 
				type: 'div', 
				id:'merlinTaskBoard', 
				classes:'merlin-bodyContentContainer',
			});
			
		/* Apply Backdrop To Screen
		***************************************************/
			$('body').append( backDrop );
			
		/* Build Title Bar
		***************************************************/
			$( titleBar ).append( titleBarText );
			$( titleBar ).append( titleBarCloseButton );
			
		/* Build Left Content
		***************************************************/
			$( leftContent ).append( leftContentContainer );
			
		/* Build Body Content
		***************************************************/
			$( bodyContent ).append( bodyContentContainer );
			
		/* Add Cores To Modal
		***************************************************/
			$( wrapperDiv ).append( titleBar );
			
			$( wrapperDiv ).append( leftContent );
			
			$( wrapperDiv ).append( bodyContent );
			
		/* Launch Modal
		***************************************************/
			$( curam.util.getTopmostWindow().document.body ).append( wrapperDiv );

		/* Enable Modal Resizing and Dragging
		***************************************************/
			$('[data-merlin-id="merlinModal-'+uniqueID+'"]').draggable({ handle: '[data-merlin-id="merlinTitleBar-'+uniqueID+'"]' });
			$('[data-merlin-id="merlinModal-'+uniqueID+'"]').resizable();

		/* Setup Modal Actions 
		***************************************************/
			// Closeout Modal
			_engine.caseWork.merlin.setupAction({
				item: '[data-merlin-id="titleBarCloseButton"]',
				trigger: 'click',
				action: function(){_engine.caseWork.merlin.destroy( uniqueID )}
			});
		
		}, true );

});