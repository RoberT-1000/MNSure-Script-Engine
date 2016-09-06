chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	
	if(changeInfo.status == "complete"){
		if( tab.url.indexOf("people.mnsure.org") > -1 ){
			
			chrome.runtime.onMessageExternal.addListener(
				function(request, sender, sendResponse){
					
					var result = null;
					
					$.ajax({
						url: 'views/'+request.file,
						type: 'get',
						dataType: 'html',
						async: false,
						success: function( data ){
							
							result = data;
							
						}
					});

					sendResponse( result );
					
				}
			);
			
			
		}
	}

});