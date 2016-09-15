/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

/*   Script Engine Functions
---------------------------------------------*/
	
var _engine = {
	
	/* Core Functions
	===================*/

	//**************//
	//*   Search   *//
	//**************//
	
	search: {
		//Navigate to HCR tab and open person search
		_person: function(){
			_engine.navigation.hcr();
			curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Person_search1","");
		},
		//Navigate to HCR tab and open case search
		_case: function(){
			_engine.navigation.hcr();
			curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Case_search1",""); 
		}
	},
	
	//***************//
	//* DOM Toolbox *//
	//***************//
	
	domTools: {
		
		/* Tools in the "Get" section of the 
		|* toolbox are designed to return elements
		|* of the webpage.
		\*-----------------------------------------------*/
		
		get: {
			
				/* Returns an array of the top level tabs ( Home, 
				|* HCR Cases and Outcomes, Inbox, and Calendar )
				\*----------------------------------------------------------*/
			mainTabList: function(){
				return $('#app-sections-container-dc_tablist > div.dijitTabListWrapper.dijitTabContainerTopNone.dijitAlignClient > div > div.visible');
			},
			
				/* Returns the tab in the top level that is presently 
				|* selected
				\*----------------------------------------------------------*/
			mainTabActive: function(){
				return $('#app-sections-container-dc_tablist > div.dijitTabListWrapper.dijitTabContainerTopNone.dijitAlignClient > div > div.visible.dijitTabChecked.dijitChecked')[0];
			},
			
				/* Returns an array of the tabs that are currently 
				|* open on the HCR Cases and Outcomes screen.
				\*----------------------------------------------------------*/
			hcrTabList: function(){
				_engine.navigation.hcr();
				return $('[widgetid="HCRCASEAPPWorkspaceSection-stc_tablist"] div.dijitTabContainerTop-tabs div.dijitTab');
			},
			
				/* Returns the tab that is currently the focus on the
				|* HCR Cases and Outcomes screen.
				\*----------------------------------------------------------*/
			hcrTabActive: function(){
				_engine.navigation.hcr();
				return $('[widgetid="HCRCASEAPPWorkspaceSection-stc_tablist"] div.dijitTabContainerTop-tabs div.dijitTab.dijitTabChecked.dijitChecked')[0];
			},
			
				/* Returns the iFrame for the tab that is currently the
				|* focus on the HCR Cases and Outcomes screen.
				|* This can be thought of as the wrapper for the tabs
				|* content.
				\*----------------------------------------------------------*/
			hcrTabActiveFrame: function(){
				_engine.navigation.hcr();
				var _t = _engine.domTools.get.hcrTabActive();
				var _id = $( _t ).attr( 'widgetid' ).split('-')[1].split('_');
				var _f = _id[2] + "_" + _id[3] + "_" + _id[4] + "_" + _id[5];
				
				return $('[widgetid="'+_f+'"]')[0];
			},
			
				/* These functions get elements that are contained inside the 
				|* iFrame returned from '_engine.domTools.get.hcrTabActiveFrame()' 
				\*----------------------------------------------------------*/
			icFrame: {
				
					/* This returns an array of tabs that are available on the 
					|* currently focused icFrame ( Home, Evidence, Participants, 
					|* Assessments, Services, etc... )
					\*----------------------------------------------------------*/
				icTabList: function(){
					_engine.navigation.hcr();
					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabActiveFrame();
						return $( _tp ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible');
					} else {
						_engine.caseWork.caseSelection();
					}
				},
				
					/* This returns the tab that is currently the focused tab 
					|* of the open Integrated case. ( Home, Evidence, Participants, 
					|* Assessments, Services, etc... )
					\*----------------------------------------------------------*/
				icTabActive: function(){
					_engine.navigation.hcr();
					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabActiveFrame();
						return $( _tp ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible.dijitTabChecked.dijitChecked');
					} else {
						_engine.caseWork.caseSelection();
					}
				},
				
					/* This returns the left hand sub menu of screens that have 
					|* one. Example: 'Contact Tab' - [Notes, Attachements, 
					|* Meeting Minutes, Communications]
					\*----------------------------------------------------------*/
				icTabActiveSubMenu: function(){
					_engine.navigation.hcr();
					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabActiveFrame();
						return $( _tp ).find('div.dijitStackContainer-child.dijitVisible');
					}
				},
				
					/* Returns the frame that is from the currently focused tab
					|* on the currently focused IC Tab [This is the lower portion
					|* of the currently open IC Tab.]
					\*----------------------------------------------------------*/
				icTabActiveFrame: function(){
					_engine.navigation.hcr();
					if(_engine.domTools.test.hcrTabActiveIsIC()){
						var _tp = _engine.domTools.get.hcrTabActiveFrame();
						
						return $( _tp ).find('.content-area-container iframe').contents().find('body');
					}
				},
				
					/* Returns elements that are a subset of the home tab
					|* on an IC Case
					\*----------------------------------------------------------*/
				homeTab: {
					
						/* Returns an array of the cases that display on the Home Tab
						\*----------------------------------------------------------*/
					cases: function(){
						_engine.navigation.hcr();
						if(_engine.domTools.test.hcrTabActiveIsIC()){
							var _tp = _engine.domTools.get.icFrame.icTabActiveFrame();
							return $( _tp ).find('#content > div:nth-child(6)');
						}
					}
				},
				contactTab: {
					caseNoteModal:{
						_activeModal: function(){
							
							var _modalFrame = $('iframe[title="Modal Frame - New Note"].curam-active-modal');
							
							if( typeof _modalFrame[0] != "undefined" ){
								
								var _bodyFrame = $( _modalFrame ).contents().find('iframe.cke_wysiwyg_frame');
								
								//Modal is open
								if ( typeof _bodyFrame[0] != 'undefined' ){
									
									//Modal is loaded
									_engine.debug.info("- * [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open and fully loaded.");
									return _modalFrame;
									
								} else {
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open but not fully loaded.");
									return false;
								}
							} else {
								_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Unable to target an open case note modal.");
								return false;
							}
						},
						_subject: function(){
							
							var _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();
							
							if( _activeModal != false ){
								
								return $( _activeModal ).contents().find('input[title="Subject Mandatory"]');
								
							}
						},
						_body: function(){
							
							var _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();
							
							if( _activeModal != false ){
								
								return $( _activeModal ).contents().find('iframe.cke_wysiwyg_frame').contents().find('body');
								
							} else {
								
								return false;
								
							}
						}
					}
				}
			}
		},
		set:{
			icFrame: {
				contactTab: {
					caseNoteModal:{
						subject: function( _s ){
							
							_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.subject() ] Started | Input: " + _s);
							
							if(typeof _engine.domTools.get.icFrame.contactTab.caseNoteModal._subject() != 'undefined'){
								
								_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.subject() ] Located modal subject");
								
								_engine.domTools.get.icFrame.contactTab.caseNoteModal._subject().val( _s );
								
							} else {
								_engine.debug.warn("- * Fail Reason: [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.subject() ]: Could not add line. Subject returning 'undefined'.")
							}
							
							_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.subject() ] Complete");
							
						},
						body: {
							addLine: function( _s ){
								
								_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Started | Input: " + _s);
								
								var _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body();
								
								if(typeof $( _modalBody ) != 'undefined'){
									
									_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Located modal body");

									//Wrap input in div tags
									var line = $('<div>',{'html':_s});
									
									//Check if body is empty
									
									if(_engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty()){
										
										_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Body empty. Writing Line.");
										
										//If empty, set first line
										
										$( _modalBody ).html( line );
										
									} else {
										
										_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Body not empty. Writing Line.");
										
										//If not empty, add to body
										$( _modalBody ).append( line );

									}
									
								} else {
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ]: Could not add line. Body returning 'undefined'.")
								}
								
								_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Complete");
								
							}
						}
					}
				}
			}
		},
		test: {
			hcrTabActiveIsIC: function(){
				if(_engine.domTools.get.hcrTabActive().innerText.indexOf("Insurance Affordability") != -1){
					if(_engine.domTools.get.hcrTabActive().innerText.indexOf("Insurance Affordability") == 0){
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			icFrame: {
				contactTab: {
					caseNoteModal:{
						body: {
							isEmpty: function(){
								
								var _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body();
								
								if( _modalBody != false ){
									if( $( _modalBody ).text() == ""){
										return true;
									} else {
										return false;
									}
								} else {
									_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty() ]: Case note body object is returning undefined. Not loaded.")
									return undefined;
								}
							}
						}
					}
				},
				onTab: function( _t ){
					var current_tab = _engine.domTools.get.icFrame.icTabActive().text().replace("Close Tab", "").trim().toLowerCase();
					if( _t.toLowerCase() == current_tab ){
						return true;
					} else {
						return false;
					}
				}
			}
		}
	},
	
	//***************//
	//*     Nav     *//
	//***************//
	
	navigation: {
		//Nav functions fire only if the user is not already on the
		//screen they are trying to get to.
		hcr: function(){
			if( $( "[title='HCR Cases and Outcomes']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="HCR Cases and Outcomes"]')[0].click();
			}
		},
		home: function(){
			if( $( "[title='Home']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="Home"]')[0].click();
			}
		},
		inbox: function(){
			if( $( "[title='Inbox']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="Inbox"]')[0].click();
			}
		},
		calendar: function(){
			if( $( "[title='Calendar']", _engine.domTools.get.mainTabActive() ).length !== 1 ){
				$('[title="Calendar"]')[0].click();
			}
		},
		icTabs: {
			home: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("Home");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			evidence: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("EvidenceFolder");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			participants: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("ParticipantFolder");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			assessments: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("Assessments");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			services: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("Services");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			referrals: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("Referrals");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			contact: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("ContactFolder");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			tasks: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("Tasks");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			issuesAndProceedings: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("IssuesAndProceedings");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			administration: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("AdminFolder");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			elections: function(){
				_engine.navigation.hcr();
				if(_engine.domTools.test.hcrTabActiveIsIC()){
					_engine.navigation.icTabs.icNavCore("ElectionsFolder");
				} else {
					_engine.caseWork.caseSelection();
					return false;
				}
			},
			icNavCore: function( _t ){
				var _tl = _engine.domTools.get.icFrame.icTabList();
				$.each( _tl, function( k, v ){
					_tabID = $( v ).attr('widgetid').split('-');
					if( $.inArray( _t, _tabID ) > -1 ){
						if(!$( _engine.domTools.get.icFrame.icTabList()[k] ).hasClass('dijitTabChecked')){
							_engine.domTools.get.icFrame.icTabList()[k].click();
						}
						return false;
					}
				});
			}
		}
		
	},
	
	//***************//
	//* UI Building *//
	//***************//
	
	ui: {
		scriptMenu: {
			items: {
				'Searches' : {
					_events: "",
					_submenu: {
						"Person...": {
							_events: "search[_person]"
						},
						"Case...": {
							_events: "search[_case]"
						}
					}
				},
				'Case Notes': {
					_events:"",
					_submenu: {
						"Returned Mail...":{
							_events: "caseWork[writeNote(Returned Mail)]"
						},
						"Test Note...": {
							_events: "caseWork[writeNote(Test)]"
						}
					}
				}
			},			
			build: function( menu ){ 
				
				/* Build menu */
				var nav = $('<ul>',{id: 'script-launcher-nav'});
				
				/* Attach built menu */
				$('#script-launcher').append( nav );
				
				$.each(menu, function(k,v){
				
					var navItem = $('<li>');
					var navLink = $('<a>',{text: k, onClick: '_engine.events.handleClickEvent("'+v._events+'")' });
					
					/* Attach anchor to list item */
					$( navItem ).append( navLink );
					/* Attach list item to list */
					$( '#script-launcher-nav' ).append( navItem )
					
					if(typeof v._submenu === "object"){
						
						/* Build Subnav Menu */
						var subnav = $('<ul>',{class: 'script-launcher-subnav'});
						
						/* Attach built menu */
						$( navItem ).append( subnav );
						
						$.each(v._submenu, function(k2,v2){ 
						
							var navItemSub = $('<li>');
							var navLinkSub = $('<a>',{text: k2, onClick: '_engine.events.handleClickEvent("'+v2._events+'")'});
						
							/* Attach anchor to list item */
							$( navItemSub ).append( navLinkSub );
							/* Attach list item to list */
							$( subnav ).append(navItemSub)
						
						});
					}
					
				});
			
			},
			destroy: function(){
				
				$('#script-launcher-nav').remove();
				
			} 
		},
		modal: {
			build: function( title, layout ){

					//Add modal class to body
				$('body').addClass('modal');
			
					//Greyed out layout background
				var overlay = $('<div>',{'class':'modal-overlay'});
				$('body').append( overlay );
				
					//Modal Wrapper Div
				var contentWrapper = $('<div>',{'class':'modal-content-wrapper dijitDialog'});
				$('div.modal-overlay').append( contentWrapper );
				
					//Title Bar
				var titlebar = $('<div>',{'class':'dijitDialogTitleBar modal-titlebar'});
				$('div.modal-content-wrapper').append( titlebar );
				
					//Title text in title bar
				var dialogTitle = $('<span>',{'class':'dijitDialogTitle','text':title});
				$('div.modal-titlebar').append( dialogTitle );
				
					//Close X on title bar
				var closeButton = $('<span>',{'class':'dijitDialogCloseIcon', 'onClick':'_engine.events.handleClickEvent("ui[closeModal]")'});
				$('div.modal-titlebar').append( closeButton );
				
					//Wapper for the layout from the view template
				var modalContentContainer = $('<div>',{'class': 'modal-content-container'});
				$( 'div.modal-content-wrapper' ).append( modalContentContainer );
				
					//Load view template into wrapper
				$('div.modal-content-container').append( layout );
				
					//Modal footer - Wrapper
				var mnsModalFooter = $('<div>', {id:'mns-modal-actions', 'class':'actions-panel'});
				
					//Modal footer - Button Container
				var mnsModalFooterButtonContainer = $('<div>', {'class':'action-set center'});
				
					//Button Text
				var _submit = "Submit"
				
					//Modal footer - Button Anchor
				var mnsModalFooterSubmitButton = $('<a>', {'onClick':'_engine.events.handleClickEvent("ui[submitModal(casenote)]")', 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+ _submit +'</span></span></span>'});
				
					//Modal footer - Filler Span
				var mnsModalFooterFiller = $('<span>', {'class':'filler'});

					//Button Text
				var _cancel = "Cancel"
				
					//Modal footer - Button Anchor
				var mnsModalFooterCancelButton = $('<a>', {'onClick':'_engine.events.handleClickEvent("ui[closeModal]")', 'html':'<span class="left-corner"><span class="right-corner"><span class="middle">'+ _cancel +'</span></span></span>'});
				
					//Add footer to modal
				$( 'div.modal-content-wrapper' ).append( mnsModalFooter );
				
					//Add button container
				$( '#mns-modal-actions' ).append( mnsModalFooterButtonContainer );
				
					//Add submit button
				$( '#mns-modal-actions div.action-set' ).append( mnsModalFooterSubmitButton );
				
					//Add filler
				$( '#mns-modal-actions div.action-set' ).append( mnsModalFooterFiller );
				
					//Add cancel button
				$( '#mns-modal-actions div.action-set' ).append( mnsModalFooterCancelButton );
				
			},
			destroy: function(){
				
				$('div.modal-overlay').remove();
				
				$('body').removeClass('modal');
				
			},
			_storeParams: function(){
				
				var _fields = $('.mns-modal-template > .mns-input-group');
				
				var _fieldCount = $('.mns-modal-template > .mns-input-group').length;
				
				var _params = "";
				
				$.each(_fields,function(k,v){
					
					//Start Object
					_params += "{";
					
					//Cleaning up descriptor
					var _descriptor = '';
					if($( v ).find( '.mns-input-descriptor' ).length > 0){
						_descriptor = $( v ).find( '.mns-input-descriptor' ).text();
					}
					_params += '"descriptor":"' + _descriptor + '",';
					
					
					//Cleaning up input text
					var _input = '';
					
					if($( v ).find( 'input, select' ).length > 0){
						//Preform storage action based on input type
						switch( $( v ).find( 'input, select' ).attr("type") ){
							case "text":
								var _input = $( v ).find( 'input' ).val().replace(/"/g,'&quot;');
								_input = _input.replace('"','\"');
								break;
							case "select":
								var _input = $( v ).find( 'select' ).val().replace(/"/g,'&quot;');
								_input = _input.replace('"','\"');
								break;
							default:
								var _input = "";
								break;
						}
					}
					_params += '"value":"'+ _input +'"';
					
					
					//End object accounting for multiple inputs
					if(k != _fieldCount-1){
						_params += "},"
					} else {
						_params += "}"
					}
					
				});
				
				//Place objects into an array
				_engine.storage.modalParams.set( '[' + _params + ']' );
				
				return;
				
			},
			_submit:function( _type ){
				
				switch( _type.toLowerCase() ){
					case "casenote":
						
						_engine.ui.modal._storeParams();
						
						_engine.caseWork.note._completeNote();

						break;
					default:
						_engine.debug.error("- * Fail Reason: Modal Error [_engine.ui.modal._submit( type )]: Type error or type not found.")
						break;
					
				}
				
				_engine.ui.modal.destroy();
				
			}
		},
		topNotification: function( msg ){
			
			//Create Element
			var _span = $('<span>',{'html':msg});
			//Swap content
			$('div.center-box').html( _span );
			
		}
	},
	
	//**************//
	//*   Events   *//
	//**************//
	//
	// - Dev Notes -
	//
	// This section is used to interpolate what operations should be
	// performed in the event that a button is clicked.
	//
	
	events: {
		_startUp: function() {
			
			if( !_engine.storage.engineStatus.get() ){
			
				setTimeout(function(){
					/* Loaded
					/* Scripts Main Button
					========================*/
					
					//********** Left Click **********//
					// Opens a small settings menu

					$('#script-launcher a').click(function(){

						console.log('SETTINGS MENU - NON FUNCTIONAL');

					});

					//********** Right Click **********//
					// Performs Quick Load of Searches

					$('#script-launcher a').contextmenu(function(e){
						
							// Prevent context menu pop-up
						e.preventDefault();
						
							// Open Case Search
						_engine.search._case();
						
							// Open Person Search
						_engine.search._person();
						
					});
					
					_engine.beta.enableRelease();
					
					_engine.ui.scriptMenu.build( _engine.ui.scriptMenu.items );
					
					_engine.storage.engineStatus.set( true );
				
				},2000);
			
			}

		},
		handleClickEvent: function( e ){
			
			var eventLog = e.split('/');
			
			$.each(eventLog,function(k,v){
				
				var _f = v.substring( 0, v.lastIndexOf("[") )
				if( v.indexOf("(") == -1 ){
					var _c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("]") );
					var _sc = null;
				} else
				{
					var _c = v.substring( v.lastIndexOf("[")+1,v.lastIndexOf("(") );
					var _sc = v.substring( v.lastIndexOf("(")+1,v.lastIndexOf(")") );
				}

					/* Function Tree */
					
				switch( _f ){
						
						/* Navigation Functions */
					case "navigation":
						switch( _c ){
							case "hcr":
								_engine.navigation.hcr();
								break;
								
							case "":
								break;
							default:
								_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						}
						break;
						
						/* Search Functions */
					case "search":
						switch( _c ){
							case "_person":
								_engine.search._person();
								break;
							case "_case":
								_engine.search._case();
								break;
								
							case "":
								break;
							default:
								_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						}						
						break;
						
					case "caseWork":
						switch( _c ){
							case "writeNote":
								_engine.caseWork.note.write( _sc );
								break;
							
							case "":
								break;
							default:
								_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						}
						break;
						
					case "ui":
						switch( _c ){
							case "closeModal":
								_engine.ui.modal.destroy();
								break;
							case "submitModal":
								//Perform Modal Submission Actions
								_engine.ui.modal._submit( _sc );
								break;
								
							case "":
								break;
							default:
								_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_c': "+_c);
						}
						
						break;
					case "":
						break;
					default:
						_engine.debug.error("- * Fail Reason: Error found in event handler. Could not translate '_f': "+_f);
				}
				
			});
			
			
		}
	},
	caseWork: {
		note: {
			write: function( _note ){
				// Verifies a view has been specified
				
				_noteLocation = null;
				
				switch( _note.toLowerCase() ){
					case "returned mail":
						_noteLocation = "case notes/returned mail.html"
						break;
					case "test":
						_noteLocation = "case notes/test.html"
						break;
					default:
						break;
				}
				
				if( _noteLocation != null ){
					
					// Gathers HTML for view and stores to local storage
					_engine.advanced.getView( _noteLocation );

					// Check every 100ms for info in local storage. Timeout after 2000ms.
					
					var _c = 0;
					
					var buildFrame = setInterval(function(){
						if(_c <= 25){
							
							if(_engine.storage.html.get() != false){
								// Gather html for modal
								var _html = _engine.storage.html.get();
								
								// Clear html storage
								_engine.storage.html.clear();
								
								//Build modal
								_engine.ui.modal.build( _note, _html );
								
								clearInterval( buildFrame );
								
							}
							
							_c++;
							
						} else {
							_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( _note )]: Build frame html timed out.");	
							_engine.storage.html.clear();
							clearInterval( buildFrame );
						}
					}, 100);
					
					buildFrame;

				} else {
					_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( note )]: A valid note type must be specified to run this command.")
				}
			},
			_completeNote: function(){
				
				// Timeout Counter
				_c1 = 0;
				
				// Run a max of 2500ms
				var _nav = setInterval(function(){
					if(_c1 <= 25){
						
						_engine.debug.info("========== START NAVIGATING TO CONTACT [ attempt: " + _c1 + " ] ==========");
						
						var _contactNav = _engine.navigation.icTabs.contact();
						
						if( _contactNav != false){
						
							var _src = $( _engine.domTools.get.hcrTabActiveFrame() ).find('.content-area-container iframe').attr('src');

							if( typeof _src != "undefined" && _src.split("?")[0].split("/")[1].split("_")[1].split(".")[0].replace("Page",'').toLowerCase() == "listnote" ){

								var _id = $( _engine.domTools.get.hcrTabActiveFrame() ).find('.content-area-container iframe').contents().find('body').attr('id');
								
								if( typeof _id != "undefined" && _id.split("_")[ _id.split("_").length - 1 ].toLowerCase() == "listnote" ){
									
									_engine.debug.info("- ****** Completed navigation on attempt: " + _c1 + " ******");
									
									$( _engine.domTools.get.icFrame.icTabActiveFrame() ).find('a[title="New"]')[0].click();
									
									_engine.debug.info("- * Clicked new case note");
									
									//OPEN MODAL COUNTER
									_c2 = 0;

									var _openModal = setInterval(function(){
										
										//Setup loop to test for the modal being open
										
										_engine.debug.info("- * Attempting to target modal window [ attempt: "+ _c2 +" ]");
										
										if(_c2 <= 40){
											
											// _openModal interval has not timed out
											
											if(_engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() != false){
												
												_engine.debug.info("- * Targeted modal");
												
												//Gather Params now that window is open
												
												//Start param gather counter
												_c3 = 0;

												var _gatherParams = setInterval(function(){
													
													//Setup loop to gather modal params
													
													if( _c3 <= 25 ){
														
														_engine.debug.info("- * Attempting to gather params [ attempt: "+ _c3 +" ]");
														
														if( _engine.storage.modalParams.get() != false ){
															
															//Perform actions on the stored params
															
															_engine.debug.info("- * Params Gathered");
															
															$.each( _engine.storage.modalParams.get(),function(k,v){
																if( v.descriptor.toLowerCase() == "subject" ){
																	
																	_engine.debug.info("- * SUBJECT: [ " + v.value + " ]");
																	
																	_engine.domTools.set.icFrame.contactTab.caseNoteModal.subject( v.value );
																	
																} else {
																	
																	var line = "";
																	
																	if( v.descriptor != "" && v.value == "" ){
																		line += v.descriptor;
																	} else if( v.descriptor == "" && v.value != "" ){
																		line += v.value;
																	} else if( v.descriptor != "" && v.value != "" ){
																		line += v.descriptor + ": " + v.value;
																	}
																	
																	_engine.debug.info("- * BODY: [ " + line + " ]");
																	
																	_engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine( line );
																	
																}
																
															});
															
															_engine.debug.info("- * Clearing params");
															
															_engine.storage.modalParams.clear();
															
															clearInterval( _gatherParams );
														
														}
														
														_c3++;
														
													} else {
														
														_engine.debug.info("- * Fail Reason: Error [_engine.caseWork.note._completeNote()]: Failed to gather params.");							
														clearInterval( _gatherParams );
														
													}

												}, 100);

												_gatherParams;
												
												//Clear wrapping interval to escape it
												clearInterval( _openModal );
												
											}
											
											//Modal window is not yet open advance counter
											
											_c2++;
											
										} else {
											
											//_openModal Interval has timed out clear interval
											
											_engine.debug.error("- * Fail Reason: [_engine.caseWork.note._completeNote()]: Failed to open or target case note modal. Request timed out.");							
											clearInterval( _openModal );
											
										}
											
									}, 100);

									_openModal;
									
									clearInterval(_nav);
									
								}
								
							}
							
							_c1++
						
						} else {
						
							clearInterval(_nav);
							
						}
						
					} else {
						
						_engine.debug.error("- * Fail Reason: [_engine.caseWork.note._completeNote()]: Failed to navigate to contact screen.");	
						
						clearInterval(_nav);
						
					}
					
				},100);

				_nav;
				
			}
		},
		caseSelection: function(){
			
			_engine.debug.info("- * [ _engine.caseWork.caseSelection() ] Starting integrated case selection.");
			_engine.debug.error("- * [ _engine.caseWork.caseSelection() ] Case selection feature is in development. Please manually select an IC.");
			
		}
	},
	advanced: {
		extensionURL: function(){
			return $('script[data-scriptengine]').attr('data-chromeurl');
		},
		extensionID: function(){
			return $('script[data-scriptengine]').attr('data-extensionID');
		},
		betaCommit: function(){
			return $('script[data-scriptengine]').attr('data-beta');
		},
		masterCommit: function(){
			return $('script[data-scriptengine]').attr('data-master');
		},
		getView: function( _f ){

			var _html = null;
			
			if( _engine.storage.betaStatus.get() ){
				var _c = _engine.advanced.betaCommit();
			} else {
				var _c = _engine.advanced.masterCommit();
			}
			
			chrome.runtime.sendMessage( _engine.advanced.extensionID(), { file: _f, commit: _c },
				function( response ){
					
					_engine.storage.html.set( response );
					
				}
			);
			
			return;
			
		}
	},
	storage: {
		html: {
			set: function( _html ){
				window.localStorage.setItem( "mnsEngine_html", _html );
			},
			get: function(){
				if(typeof window.localStorage.mnsEngine_html != 'undefined'){
					return $.parseHTML( window.localStorage.mnsEngine_html );
				} else {
					return false;
				}
			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_html" );
			}
		},
		modalParams: {
			set: function( _params ){
				
				var encodedParams = encodeURIComponent( _params );
				
				window.localStorage.setItem( "mnsEngine_modalParams", encodedParams );
				
			},
			get: function(){
				if(typeof window.localStorage.mnsEngine_modalParams != 'undefined'){
					
					var decodedParams = decodeURIComponent( window.localStorage.mnsEngine_modalParams );
					
					return $.parseJSON( decodedParams );
				} else {
					return false;
				}
			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_modalParams" );
			}
		},
		engineStatus: {
			set: function( _status ){
				
				window.localStorage.setItem( "mnsEngine_Status", _status );
				
			},
			get: function(){
					
					return String( window.localStorage.mnsEngine_Status.toLowerCase() ) == "true";

			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_Status" );
			}
		},
		betaStatus: {
			set: function( _status ){
				
				window.localStorage.setItem( "mnsEngine_betaStatus", _status );
				
			},
			get: function(){
					
				if( typeof window.localStorage.mnsEngine_betaStatus == 'undefined' ){
					_engine.storage.betaStatus.set( false );
				}
				
				return String( window.localStorage.mnsEngine_betaStatus.toLowerCase() ) == "true";

			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_betaStatus" );
			}
		},
		debugStatus: {
			set: function( _status ){
				
				window.localStorage.setItem( "mnsEngine_debugStatus", _status );
				
			},
			get: function(){
				
				if( typeof window.localStorage.mnsEngine_debugStatus == 'undefined' ){
					_engine.storage.mnsEngine_debugStatus.set( false );
				}
					
				return String( window.localStorage.mnsEngine_debugStatus.toLowerCase() ) == "true";

			},
			clear: function(){
				localStorage.removeItem( "mnsEngine_debugStatus" );
			}
		}
	},
	debug: {
		toggle: function(){
			//Set debug status to oppo
			_engine.storage.debugStatus.set( !_engine.storage.debugStatus.get() );
			console.debug("_engine.debug: Debugging status changed to - " + _engine.storage.debugStatus.get() );
		},
		log: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.log("_engine.debug: " + msg);
			}
		},
		info: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.info("_engine.debug: " + msg); 
			}
		},
		warn: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.warn("_engine.debug: " + msg);
			}
		},
		error: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.error("_engine.debug: " + msg);
			}
		},
		debug: function( msg ){
			if( _engine.storage.debugStatus.get() ){
				console.debug("_engine.debug: " + msg);
			}
		}
	},
	beta: {
		enableBeta: function(){
			//Enable Debugging
			_engine.storage.debugStatus.set( true );
			//Enable Beta
			_engine.storage.betaStatus.set( true );
			
			var _betaCommit = _engine.advanced.betaCommit();
			
			//Change CSS Repo
			$('link[data-scriptengine]').attr("href", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _betaCommit +"/css/appStyles.css");
			//Change Script Repo
			$('script[data-scriptengine]').attr("src", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _betaCommit +"/js/app.js" );
			_engine.ui.topNotification("Scripts Enabled: Beta");
			_engine.debug.debug("Beta User Access Enabled. Logging Enabled.");
		},
		enableRelease: function(){
			//Enable Debugging
			_engine.storage.debugStatus.set( false );
			//Enable Beta
			_engine.storage.betaStatus.set( false );
			
			var _masterCommit = _engine.advanced.masterCommit();
			
			//Change CSS Repo
			if( $('link[data-scriptengine]').attr("href") != "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _masterCommit +"/css/appStyles.css" ){
				$('link[data-scriptengine]').attr("href", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _masterCommit +"/css/appStyles.css");
			}
			//Change Script Repo
			if( $('script[data-scriptengine]').attr("src") != "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _masterCommit +"/js/app.js" ){
				$('script[data-scriptengine]').attr("src", "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/"+ _masterCommit +"/js/app.js" );
				console.debug("_engine.debug: Release Access Enabled. Logging Disabled.");
			}
			_engine.ui.topNotification("Scripts Enabled: Release");

		}
	}
}

/*   Onload
---------------------------------------------*/

_engine.events._startUp();