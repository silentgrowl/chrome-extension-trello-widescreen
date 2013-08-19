var store = chrome.storage.sync;

function insertCSS(cssToInsert) {
  var head = document.getElementsByTagName('head')[0];
  if(!head)
    return;
  var style = document.createElement('style');
  style.setAttribute('type','text/css');
  style.appendChild(document.createTextNode(cssToInsert));
  head.appendChild(style);
}

function calculateWidth(selection, custom) {
  if (selection === "default") {
    return 690;
  } else if (selection === "wide") {
    return 900;
  } else if (selection === "wider") {
    return 1200;
  } else if (selection === "even_wider") {
    return 1500;
  } else {
    return custom;
  }
}

store.get(['selection', 'custom'], function(result) {
  var width = calculateWidth(result.selection, result.custom);
  var offset = width - 690;
  var cssString = ".window { width: " + width + "px !important; }"
  cssString += " .window-main-col { width: " + (472 + offset) + "px !important; }"
  insertCSS(cssString);
});
