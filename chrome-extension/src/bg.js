
var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            css: [ '*[href*="youtube.com"], *[href*="youtu.be"]' ]
        })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(function(details) {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([rule1]);
	});
});
