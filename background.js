// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('aircraftclubs.com') > -1) {
    chrome.pageAction.setPopup({
        tabId:tabId,
        popup:'aircraftclubs_popup.html'
    });
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    debugger;
    console.log(sender.tab ?  "from a content script:" + sender.tab.url : "from the extension");
    console.log(request);
    return true;
});
