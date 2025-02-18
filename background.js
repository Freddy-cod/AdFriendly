// Runs when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("AdFriend Extension Installed");

  // Set default messages if not already saved
  chrome.storage.sync.get("customMessages", (data) => {
    if (!data.customMessages) {
      chrome.storage.sync.set({
        customMessages: ["Stay positive!", "Keep going!", "You got this!"],
      });
    }
  });
});

// Listen for messages from content.js or popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getMessages") {
    chrome.storage.sync.get("customMessages", (data) => {
      sendResponse({ messages: data.customMessages || [] });
    });
    return true; // Required to use sendResponse asynchronously
  }
});

// Optional: Add context menu support (Right-click to add a new message)
chrome.contextMenus.create({
  id: "addMotivationalMessage",
  title: "Add this as a motivational message",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "addMotivationalMessage" && info.selectionText) {
    chrome.storage.sync.get("customMessages", (data) => {
      let messages = data.customMessages || [];
      messages.push(info.selectionText);
      chrome.storage.sync.set({ customMessages: messages }, () => {
        console.log("Message added:", info.selectionText);
      });
    });
  }
});
