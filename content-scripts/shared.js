// LockIn helpers. Loaded before each site-specific script via manifest.json.
// Wrapped in an IIFE because content scripts from the same extension share
// global scope — top-level const/let would collide across files.

(() => {
  const selectors = [];
  let styleInjected = false;
  let observerStarted = false;
  let listenerAdded = false;
  let scheduled = false;
  // Start disabled so the site script controls when hiding kicks in (after
  // it reads chrome.storage). Avoids a flash of hidden content before the
  // user's "off" setting is loaded.
  let enabled = false;

  const ensureStyle = () => {
    if (styleInjected) return;
    styleInjected = true;
    const style = document.createElement('style');
    style.id = 'lockin-styles';
    style.textContent = '[data-lockin-hidden] { display: none !important; }';
    // document.head may not exist yet at document_start; fall back to <html>.
    (document.head || document.documentElement).appendChild(style);
  };

  const apply = () => {
    scheduled = false;
    if (!enabled) return;
    for (const sel of selectors) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.dataset.lockinHidden) continue;
        el.dataset.lockinHidden = '1';
      }
    }
  };

  // ~100ms debounce: coalesces bursts of DOM mutations from scrolling and
  // SPA navigation. Pure-CSS :has() rules force the browser to re-evaluate
  // every paint and tanked YouTube; this caps re-evaluation to ~10/sec.
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(apply, 100);
  };

  const startObserver = () => {
    if (observerStarted) return;
    observerStarted = true;
    new MutationObserver(schedule).observe(document.body, {
      childList: true,
      subtree: true,
    });
    schedule();
  };

  const ensureObserver = () => {
    if (observerStarted) return;
    if (document.body) {
      startObserver();
    } else if (!listenerAdded) {
      listenerAdded = true;
      document.addEventListener('DOMContentLoaded', startObserver);
    }
  };

  const hide = (selector) => {
    selectors.push(selector);
    ensureStyle();
    ensureObserver();
  };

  const setEnabled = (next) => {
    if (enabled === next) return;
    enabled = next;
    if (enabled) {
      schedule();
    } else {
      for (const el of document.querySelectorAll('[data-lockin-hidden]')) {
        delete el.dataset.lockinHidden;
      }
    }
  };

  window.LockIn = { hide, setEnabled };
})();
