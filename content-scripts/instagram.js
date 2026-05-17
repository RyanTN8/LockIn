(() => {
  const { hide, setEnabled } = window.LockIn;

  hide('a[href$="/reels/"]:has(svg[aria-label="Reels"])');
  hide('article:has(a[href^="/reels/"])');

  const refresh = async () => {
    const { settings = {} } = await chrome.storage.sync.get('settings');
    setEnabled(settings.instagram?.enabled ?? true);
  };

  refresh();
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.settings) refresh();
  });
})();
