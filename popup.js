// Send the tab ID to use when the page is ready
document.addEventListener('DOMContentLoaded', function () {
  	chrome.tabs.query({'active': true,  'currentWindow': true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: 'http://www.yahoo.com'}) 
		chrome.extension.sendMessage({paranoidTabId: tabs[0].id});
	});
});
