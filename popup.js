document.addEventListener("DOMContentLoaded", function () {
  const messagesTextarea = document.getElementById("messages");
  const saveButton = document.getElementById("save");

  // Load saved messages
  chrome.storage.sync.get("customMessages", (data) => {
    if (data.customMessages) {
      messagesTextarea.value = data.customMessages.join(", ");
    }
  });

  // Save messages
  saveButton.addEventListener("click", () => {
    const customMessages = messagesTextarea.value
      .split(",")
      .map((msg) => msg.trim());
    chrome.storage.sync.set({ customMessages }, () => {
      alert("Messages saved!");
    });
  });
});
