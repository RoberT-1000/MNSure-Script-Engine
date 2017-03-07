/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/caseData/maintainNocache',function( pageObj, callback ){
	
	let cacheEmpty = typeof _engine.storage.nocache.data.caseData === 'undefined';
	
	let tabParams;
	
	typeof pageObj === 'undefined' ?
		tabParams = curam.tab.getSelectedTab():
		tabParams = pageObj;
	
	let curamObj = tabParams.params.tabDescriptor;
	
	let updateCaseData = function( data ){
		let parsedData = $.parseHTML( data );

		let caseData = {
			participants:{}
		}

		$.each( parsedData, function(k,v){
			if( typeof $(v).attr('id') !== 'undefined' && $(v).attr('id') === 'content' ){

				let parsedPageData = $.parseHTML( $( v ).find( '.list tbody script' )[0].innerHTML );

				let count = 0;

				$.each( parsedPageData, function(k,v){

					if( !$(v).hasClass('list-details-row') ){
						var rowData = $(v).find('td');

						let urlParams = {};

						$.each($(rowData[1]).find('a')[0].search.replace('?','').split('&'),function(k,v){

							v = v.split('=');

							urlParams[v[0]] = v[1];

						});

						caseData.participants[count] = {
							name: rowData[1].innerText.trim(),
							role: rowData[2].innerText.trim(),
							startDate: rowData[3].innerText.trim(),
							endDate: rowData[4].innerText.trim(),
							endReason: rowData[5].innerText.trim(),
							_status: rowData[6].innerText.trim(),
							url:{
								path: $(rowData[1]).find('a')[0].pathname,
								params: urlParams
							}
						}

						count++;

					}

				});

			}

		});

		_engine.storage.nocache.data.caseData = caseData;
		
		_engine.storage.nocache.data.caseData.caseID = curamObj.tabContent.parameters.caseID;

		_engine.debug.info('Nocache: Case Data Refreshed');

		if(typeof callback === 'function') callback( _engine.storage.nocache.query('caseData') );

	}

	var getData = function( caseId ){

		if(typeof caseId === 'undefined') caseId = curamObj.tabContent.parameters.caseID;

		$.ajax({
			url: 'en_US/DefaultIC_listCaseMemberPage.do',
			data: {
				o3ctx: curamObj.tabContent.parameters.o3ctx,
				caseID: caseId,
				o3nocache: curam.util.getCacheBusterParameter().split('=')[1]
			},
			async: true,
			success: function(data){
				updateCaseData( data );
			}
		});

		if( Object.getOwnPropertyNames( _engine.advanced._vars.queryDefinitions ).length === 0 ){
			$.ajax({
				url:'en_US/HCRDefaultIC_dashboardPage.do',
				data: {
					o3ctx: curamObj.tabContent.parameters.o3ctx,
					caseID: curamObj.tabContent.parameters.caseID
				}
			}).success(function( data ){
				$.each($.parseHTML( data ),function(k,v){
					if(typeof $(v).attr('id') !== 'undefined' && $(v).attr('id') === 'content'){
						$.each($(v).find('div#dashboardData li'),function(k,v){
							_engine.advanced._vars.queryDefinitions[$(v).attr('name').toLowerCase()] = 'evidenceType=' + $(v).attr('evidencetype');
						});
					}
				});
				_engine.debug.info('Nocache: Updated query definitions.');
			});

		}


	}
	
	switch( tabParams.tabDescriptor.tabID ){
		case 'HCRIntegratedCase':
			
			if(cacheEmpty) getData();
				
			else {
				
				if( _engine.storage.nocache.data.caseData.caseID !== curamObj.tabContent.parameters.caseID){
					_engine.storage.nocache.delete('caseData');
					getData();
				}
				
			}
			
			break;
			
		case 'PersonHome':
				
			if(!cacheEmpty){
				
				var participants = _engine.storage.nocache.query('caseData.participants');
				
				var roleIDs = [];
				
				$.each( participants,function(k, participant){
					
					roleIDs.push( participant.url.params.concernRoleID );
					
				});
					
				if( roleIDs.indexOf( curamObj.tabContent.parameters.concernRoleID ) === -1 ){
					_engine.debug.info('Nocache: Tab is not in scope of current nocache. Clearing nocache.');
					_engine.storage.nocache.delete('caseData');
				}
				
			}
			
			break;
			
		case 'EvidenceType':
			if(!cacheEmpty){
				if( curamObj.tabContent.parameters.caseID !== _engine.storage.nocache.query('caseData.caseID') ){
					_engine.debug.info('Nocache: Tab is not in scope of current nocache. Clearing nocache.');
					_engine.storage.nocache.delete('caseData');
					getData( curamObj.tabContent.parameters.caseID );
				}
			}
			else {
				getData( curamObj.tabContent.parameters.caseID );
			}
			break;
			
		default:
			break;
	}
	
});