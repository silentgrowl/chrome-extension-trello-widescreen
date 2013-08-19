var store = chrome.storage.sync;
var tabs = chrome.tabs;

function storeValues() {
  var selection = getSelectionValue();
  var custom = document.getElementById("custom_width").value;
  store.set({'custom': custom, 'selection': selection}, function(result) {
    chrome.tabs.query({url: "*://trello.com/*"}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.reload(tab.id);
      });
    });
    window.close();
  });
}

function mapEachSelection(f) {
  var selections = document.getElementsByName("width_selection");
  for (i = 0; i < selections.length; ++i) {
    f(selections[i]);
  }
}

function getSelectionValue() {
  var selections = document.getElementsByName("width_selection");
  for (i = 0; i < selections.length; ++i) {
    if (selections[i].checked == true) {
      return selections[i].value;
    }
  }
}

function loadSelection() {
  store.get('selection', function(result) {
    if (result.selection === "") {
      mapEachSelection(function(sel) {
        if (sel.value == "default") {
          sel.checked = true;
        }
      });
    } else {
      mapEachSelection(function(sel) {
        if (sel.value == result.selection) {
          sel.checked = true;
        }
      });
    }
  });
}

function loadCustomWidth() {
  store.get('custom', function(result) {
    document.getElementById("custom_width").value = result.custom;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  mapEachSelection(function(sel) { sel.addEventListener('change', storeValues); });
  document.getElementById('custom_width').addEventListener('blur', storeValues);
  loadSelection();
  loadCustomWidth();
});
