function checkAndBlock() {
  const url = window.location.href;

  if (
    url.includes("youtube.com/shorts") ||
    url.includes("facebook.com/reel") ||
    url.includes("facebook.com/reels")
  ) {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "https://www.youtube.com/";
    }
  }
}

function blockReels() {
  const SELECTORS = [
    'ytd-rich-shelf-renderer[is-shorts]',
    'ytd-reel-shelf-renderer',
    '[data-pagelet="ReelsUnit"]',
    '[aria-label="Reels"]'
  ];

  SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = "none";
    });
  });
}

chrome.storage.local.get("isEnabled", (data) => {
  const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;

  if (!isEnabled) return;

  checkAndBlock();
  blockReels();

  // ✅ Single combined observer
  let lastUrl = location.href;

  const observer = new MutationObserver(() => {
    blockReels();

    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      checkAndBlock();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// ✅ Handles both ON and OFF
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.isEnabled) {
    location.reload();
  }
});