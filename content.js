const adSelectors = [
  "iframe",
  "div[class*='ad']",
  "div[id*='ad']",
  "ins.adsbygoogle",
  "aside[id*='ad']",
];

let customMessages = ["Stay positive! 🌟", "You are amazing! 💪"];

// Load custom messages from storage
chrome.storage.sync.get("customMessages", (data) => {
  if (data.customMessages && data.customMessages.length > 0) {
    customMessages = data.customMessages;
  }
});

function replaceAds() {
  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((ad) => {
      const widget = createWidget();
      ad.replaceWith(widget);
    });
  });
}

function createWidget() {
  const widget = document.createElement("div");
  widget.className = "adfriend-widget";
  widget.style.cssText = `
    background: #f9f9f9;
    border: 2px solid #ffcc00;
    padding: 15px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    border-radius: 8px;
  `;

  widget.textContent =
    customMessages[Math.floor(Math.random() * customMessages.length)];

  return widget;
}

// Run function on page load
replaceAds();

// Observe dynamically loaded ads
const observer = new MutationObserver(replaceAds);
observer.observe(document.body, { childList: true, subtree: true });
