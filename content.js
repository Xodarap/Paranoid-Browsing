function processPage(depth) {
	if(depth > 8) {
		console.log('Paranoid: No good links found on page. Restarting.');
		chrome.extension.sendMessage({ paranoidRestart: true });
		return;
	}

	// Remove possible video element to avoid random sounds playing
	// Do this continuously in case of JS loading in videos
	window.setInterval(removeVideos, 500);

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
		window.location = newAddress;
	}, waitTime);
}

function removeVideos() {
	/* Remove possible video tags from page to avoid sound playing. */
	// Tags to remove
	var VIDEO_TAGS = ['object', 'embed', 'video'];

	// Function for shorthand removal of nodes
	function removeNode(node) {
		node.parentNode.removeChild(node);
	}

	// Loop over tags to remove
	for(var i = 0; i < VIDEO_TAGS.length; ++i) {

		// Find all elements of the tag
		var videoElems = document.getElementsByTagName(VIDEO_TAGS[i]);

		// Remove all matching elements
		for(var j = 0; j < videoElems.length; ++j) {
			removeNode(videoElems[j]);
		}
	}
}

processPage(0);
