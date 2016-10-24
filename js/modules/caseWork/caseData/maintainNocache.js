/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/caseData/maintainNocache',function(){

	_engine.domTools.test.hcrTabActiveIsIC(function( result ){

		if(result){

			let obj = _engine.storage._curamCreatedObject.get();

			let href = 'en_US/DefaultIC_listCaseMemberPage.do';

			var processResponse = function( data ){
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
				
				_engine.debug.info('Nocache Refreshed (caseData): ', _engine.storage.nocache.data);

			}

			$.ajax({
				url: href,
				data: {
					o3ctx: obj.tabContent.parameters.o3ctx,
					caseID: obj.tabContent.parameters.caseID,
					o3nocache: curam.util.getCacheBusterParameter().split('=')[1]
				},
				async: true,
				success: function(data){	
					processResponse( data );
				}
			});

		} else {
			
			console.log('Not an IC');
			
			//If not an IC and not relevant to cache -> purge caseCache
			
		}

	});
});