function processPage(depth) {
	if(depth > 8) {
		console.log('Paranoid: No good links found on page. Restarting.')
		chrome.extension.sendMessage({ paranoidRestart: true });
	}

	var allLinks = document.getElementsByTagName('a');
	linkCount = allLinks.length;

	if(linkCount == 0) {
		console.log('Paranoid: No links found on page. Restarting.');
		chrome.extension.sendMessage({ paranoidRestart: true });
		return;
	}
	
	var linkSel = Math.floor(Math.random() * linkCount);
	var newLink = allLinks[linkSel];
	var pattern = new RegExp('^https?:\/\/.*')  // basic URL check, just to avoid javascript-only links
	
	// Don't "navigate" to links which are on the same page
	// or aren't real links
	if(newLink.href == document.URL ||
		newLink.href == (document.URL + '#') ||
		!pattern.test(newLink.href)) {
		processPage(depth + 1)
	}
	
	// Wait some random, pseudo-realistic amount of time
	var waitTime = Math.floor(Math.random() * 15000) + 5000;
	setTimeout(function() {
		console.log('Paranoid: sending to: ' + newLink.href + ' choice  ' + linkSel);
		newLink.click();
	}, waitTime);
}

processPage(0);