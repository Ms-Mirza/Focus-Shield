const toggleBtn = document.getElementById("toggleBtn");
const passwordInput = document.getElementById("passwordInput");
const setPasswordBtn = document.getElementById("setPasswordBtn");
const passwordSection = document.getElementById("passwordSection");
const changeSection = document.getElementById("changeSection");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const message = document.getElementById("message");

// Load state
chrome.storage.local.get(["isEnabled", "password"], (data) => {
  let isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
  updateButton(isEnabled);

  // Password already set → hide setup, show change button
  if (data.password) {
    passwordSection.style.display = "none";
    changeSection.style.display = "block";
  }

  // Toggle button
  toggleBtn.addEventListener("click", () => {

    // Turning ON → no password needed
    if (!isEnabled) {
      isEnabled = true;
      chrome.storage.local.set({ isEnabled: true });
      updateButton(isEnabled);
      return;
    }

    // Turning OFF → check password
    chrome.storage.local.get("password", (data) => {

      if (!data.password) {
        isEnabled = false;
        chrome.storage.local.set({ isEnabled: false });
        updateButton(isEnabled);
        return;
      }

      const userInput = prompt("Enter password to turn off:");
      if (userInput === null) return;

      if (userInput === data.password) {
        isEnabled = false;
        chrome.storage.local.set({ isEnabled: false });
        updateButton(isEnabled);
        message.textContent = "";
      } else {
        message.textContent = "❌ Wrong password!";
      }
    });
  });
});

// Set password — first time only
setPasswordBtn.addEventListener("click", () => {
  const passwordValue = passwordInput.value;

  if (passwordValue === "") {
    message.textContent = "⚠️ Please enter a password!";
    return;
  }

  chrome.storage.local.set({ password: passwordValue });
  message.textContent = "✅ Password saved!";

  // Hide setup → show change button
  passwordSection.style.display = "none";
  changeSection.style.display = "block";
  passwordInput.value = "";
});

// Change password — asks old password first
changePasswordBtn.addEventListener("click", () => {
  chrome.storage.local.get("password", (data) => {

    // Step 1: Ask old password
    const oldInput = prompt("Enter your OLD password:");
    if (oldInput === null) return;

    // Step 2: Compare
    if (oldInput !== data.password) {
      message.textContent = "❌ Wrong old password!";
      return;
    }

    // Step 3: Ask new password
    const newInput = prompt("Enter your NEW password:");
    if (newInput === null) return;

    // Step 4: New password can't be empty
    if (newInput === "") {
      message.textContent = "⚠️ New password can't be empty!";
      return;
    }

    // Step 5: Save new password
    chrome.storage.local.set({ password: newInput });
    message.textContent = "✅ Password changed!";
  });
});

function updateButton(isEnabled) {
  toggleBtn.textContent = isEnabled ? "ON" : "OFF";
  toggleBtn.style.backgroundColor = isEnabled ? "#4CAF50" : "#f44336";
}