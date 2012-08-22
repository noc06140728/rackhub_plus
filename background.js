var regex = /rackhub\.net/;

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.status == "complete" && regex.test(tab.url)) {
    chrome.pageAction.show(tab.id);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

