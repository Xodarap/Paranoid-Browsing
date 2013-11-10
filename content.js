function processPage(depth) {
	if(depth > 8) {
		console.log('Paranoid: No good links found on page. Restarting.');
		chrome.extension.sendMessage({ paranoidRestart: true });
	}

	var allLinks = document.getElementsByTagName('a');
	linkCount = allLinks.length;

	if(linkCount === 0) {
		console.log('Paranoid: No links found on page. Restarting.');
		chrome.extension.sendMessage({ paranoidRestart: true });
		return;
	}

	var linkSel = Math.floor(Math.random() * linkCount);
	var newLink = allLinks[linkSel];
	// Address we will be going to
	var newAddress = newLink.href;
	// Only to go real links
	var pattern = new RegExp('^https?:\/\/');

	// Don't "navigate" to links which are on the same page
	// or aren't real links
	if(!newAddress.lastIndexOf(document.URL, 0) || !pattern.test(newAddress)) {
		return processPage(depth + 1);
	}

	// Wait some random, pseudo-realistic amount of time
	var waitTime = Math.floor(Math.random() * 10000) + 5000;
	setTimeout(function() {
		console.log('Paranoid: sending to: ' + newAddress);
		newLink.click();
	}, waitTime);
}

processPage(0);
