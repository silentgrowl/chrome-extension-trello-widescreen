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

store.get('trello_width', function(result) {
  var width = result.trello_width;
  var offset = width - 690;
  var cssString = ".window { width: " + width + "px !important; }"
  cssString += " .window-main-col { width: " + (472 + offset) + "px !important; }"
  insertCSS(cssString);
});
