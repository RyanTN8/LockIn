// Hide YouTube Shorts. Selectors are documented in selectors.md — don't edit
// them here without updating that file too.

(() => {
  const { hide, setEnabled } = window.LockIn;

  hide('ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])');
  hide('grid-shelf-view-model:has(a[href^="/shorts"])');
  hide('ytd-video-renderer:has(a[href^="/shorts/"])');
  hide('ytd-guide-entry-renderer:has(a[title="Shorts"])');
  hide('ytd-mini-guide-entry-renderer:has(a[href^="/shorts"])');

  const refresh = async () => {
    const { settings = {} } = await chrome.storage.sync.get('settings');
    setEnabled(settings.youtube?.enabled ?? true);
  };

  refresh();
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.settings) refresh();
  });
})();
