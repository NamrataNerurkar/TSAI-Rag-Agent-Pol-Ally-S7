// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openUrlAndHighlight') {
    const { url, text } = request;
    
    // Open the URL in a new tab
    chrome.tabs.create({ url }, (tab) => {
      // Wait for the page to load
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          // Remove the listener
          chrome.tabs.onUpdated.removeListener(listener);
          
          // Execute script to highlight text
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: highlightText,
            args: [text]
          });
        }
      });
    });
  }
});

// Function to highlight text on the page
function highlightText(text) {
  // Create a highlight style
  const style = document.createElement('style');
  style.textContent = `
    .pol-ally-highlight {
      background-color: yellow;
      padding: 2px;
      border-radius: 2px;
    }
  `;
  document.head.appendChild(style);

  // Find and highlight the text
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while (node = walker.nextNode()) {
    const content = node.textContent;
    if (content.includes(text)) {
      const span = document.createElement('span');
      span.className = 'pol-ally-highlight';
      span.textContent = text;
      
      const newContent = content.replace(text, span.outerHTML);
      const temp = document.createElement('div');
      temp.innerHTML = newContent;
      
      node.parentNode.replaceChild(temp.firstChild, node);
    }
  }
} 