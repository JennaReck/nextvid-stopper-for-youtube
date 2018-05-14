/* Google Chrome Extension */

chrome.storage.local.get('isdisabled', function(result){
		var disabledStatus = result.isdisabled;
	});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'youtube.com' }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

function disableEnableToggle(disabledValue) {
	chrome.storage.local.set({'isdisabled': disabledValue});
}

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.storage.local.get('isdisabled', function(result){
		disabledStatus = result.isdisabled;
		if (disabledStatus !== true) {
		disableEnableToggle(true);
		chrome.pageAction.setIcon({tabId: tab.id, path: 'icon19disabled.png'});
		chrome.pageAction.setTitle({tabId: tab.id, title: 'Nextvid Stopper for YouTube Disabled'});
		if (tab.url.search("youtube.com") != -1) {chrome.tabs.executeScript(tab.id, {
			file: 'reenableautoplay.js'
		});};
	}
	else {
		disableEnableToggle(false);
		chrome.pageAction.setIcon({tabId: tab.id, path: 'icon19.png'});
		chrome.pageAction.setTitle({tabId: tab.id, title: 'Nextvid Stopper for YouTube Enabled'});
		toggleAutoplay(tab.url, tab.id);
	}
	});
	}
);

function toggleAutoplay(currentURL, tabId) {
	if (currentURL.search("youtube.com") != -1 && currentURL.search("list=") != -1) {
		chrome.tabs.executeScript(tabId, {
			file: 'toggle.js'
		});
	}
	else if (currentURL.search("youtube.com") != -1) {
		chrome.tabs.executeScript(tabId, {
			file: 'disablespf.js'
		});
	}
	
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
	chrome.storage.local.get('isdisabled', function(result){
		disabledStatus = result.isdisabled;
		if (disabledStatus !== true) {
		toggleAutoplay(tab.url, tabId);
	} 
	else {
		chrome.pageAction.setIcon({tabId: tab.id, path: 'icon19disabled.png'});
		chrome.pageAction.setTitle({tabId: tab.id, title: 'Nextvid Stopper for YouTube Disabled'});
		}
	});
	
	}
});