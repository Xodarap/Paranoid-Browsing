// Tab that we're using for paranoid browsing
var extTabId;

// How many clicks away from the top-level page we've gone
var currentDepth = 0;

// Returns a random top-level site to start browsing from
function getNewSite() {
	var topSites;
	if (!localStorage.pbPageList) {
		topSites = []; //no topsites list configured yet, use defaults
	} else {
		topSites = JSON.parse(localStorage.pbPageList);
	}

	if (!topSites) {
		topSites = []; //couldn't parse saved topsites list, use defaults
	}

	// List of top-level news-type sites to start browsing from. Taken from http://www.alexa.com/topsites/countries/US
	// In some cases modified away from the splash page so that randomly selected links are better
	//TODO - make this a constant somewhere so it's the same between here and options.js
	if (topSites.length === 0) {
		topSites = ['http://www.cnn.com/',
					'http://news.yahoo.com',
					'http://en.wikipedia.org/wiki/Main_Page',
					'http://www.craigslist.org/',
					'http://www.go.com',
					'http://www.msn.com',
					'http://www.aol.com'];
	}
	var index = Math.floor(Math.random() * topSites.length);
	return topSites[index];
}

// Moves page to one of the initial selections
function performInitialNavigation(){
	console.log('Restarting. Current depth: ' + currentDepth);
	currentDepth = 0;
	var newUrl = getNewSite();
	chrome.tabs.update(extTabId, { url: newUrl });
}

function init() {
	extTabId = undefined;
	currentDepth = 0;
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		// New tab started browsing; set or update the ID
		if (request['paranoidTabId']) {
			extTabId = request['paranoidTabId'];
			console.log('New session started. Tab ID: ' + extTabId);
			performInitialNavigation();
		}

		// Content.js couldn't find anything to click on
		if (request.paranoidRestart == true) {
			console.log('Restarting due to message from content.js');
			performInitialNavigation();
		}
		return true;
	});
}

// Called when a tab changes.
function tabUpdated(tabId, changeInfo, tab) {
	// Ignore if it's not our paranoid tab or unless the URL is updated
	if (!changeInfo.url || tabId != extTabId) { return; }

	// We sometimes click on a link which opens in a new tab, or in some way doesn't
	// work. In that case, try again.
	setTimeout(function() {
		chrome.tabs.get(extTabId, function(tab) {
			if(tab && tab.url == changeInfo.url) {
				console.log('Page timed out. Restarting');
				performInitialNavigation();
			}
		})
	}, 20000);

	// Inject our random-click script
	currentDepth++;
	console.log('Injecting into ' + changeInfo.url + '; depth: ' + currentDepth);
	if (currentDepth < 16) {
		try {
			chrome.tabs.executeScript(extTabId, {'file' : 'content.js'});
		} catch (e) {
			// If this failed, it's because they are on a site we don't have access to
			// (probably an https one, which we don't want to be messing with). Start over.
			performInitialNavigation();
		}
	} else {
		console.log('Depth >= 16. Restarting');
		performInitialNavigation();
	}
}

chrome.tabs.onUpdated.addListener(tabUpdated);
if (chrome.runtime) {
  chrome.runtime.onStartup.addListener(init);
}

init();
