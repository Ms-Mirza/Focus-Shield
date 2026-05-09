# 🚫 FocusShield(V1.0)

A simple Chrome Extension that blocks YouTube Shorts and Facebook Reels — so you stay focused and in control.

---

## ✨ Features

- Blocks YouTube Shorts and Facebook Reels automatically
- Toggle the blocker ON / OFF with one click
- Password protection — only you can turn it off
- Change password securely (requires old password)
- Remembers your settings even after closing the browser

---

## 📸 Screenshots

> _Coming soon_

---

## 🛠️ Tech Used

- HTML
- CSS
- JavaScript
- Chrome Extension APIs (Manifest V3)
- `chrome.storage.local` — for saving settings
- `MutationObserver` — for detecting dynamic content

---

## 📦 How to Install

1. Download or clone this repository

```bash
git clone https://github.com/Ms-Mirza/reel-blocker.git
```

2. Open Chrome and go to:

```
chrome://extensions
```

3. Turn on **Developer Mode** (top right corner)

4. Click **Load Unpacked**

5. Select the `reel-blocker` folder

✅ The extension is now installed!

---

## 📖 How to Use

### Turn Blocking ON / OFF
- Click the extension icon in Chrome toolbar
- Press the **ON 🟢 / OFF 🔴** button to toggle

### Set a Password
- First time → enter a password in the input field
- Click **Set Password**
- From now on, turning OFF requires the password

### Change Password
- Click **🔑 Change Password**
- Enter your **old password**
- Enter your **new password**
- Done ✅

---

## 🔮 Future Plans

- [ ] Schedule blocking (e.g. block only during work hours)
- [ ] Show stats — how many reels blocked
- [ ] Dark mode for popup UI
- And so on.......
---

## 📁 Project Structure

```
reel-blocker/
├── manifest.json      # Extension config
├── content.js         # Runs on YouTube & Facebook
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 👨‍💻 Author

Made with ❤️ to fight the algorithm.
