var store = chrome.storage.sync;
var key = 'trello_width';
var tabs = chrome.tabs;

function setWidth() {
  var width = document.getElementById("width").value;
  store.set({'trello_width': width}, function(result) {
    console.log("setting Trello width to: " + width);
    chrome.tabs.query({url: "*://trello.com/*"}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.reload(tab.id);
      });
    });
    window.close();
  });
}

function loadWidth() {
  store.get(key, function(result) {
    var width = result.trello_width;
    if (width === undefined) { width = 690; }
    console.log("loading Trello width of: " + width);
    document.getElementById("width").value = width;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('set_width').addEventListener('click', setWidth);
  loadWidth();
});
