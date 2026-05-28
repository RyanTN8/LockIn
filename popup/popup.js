const SITES = ['youtube', 'instagram'];

const load = async () => {
  const { settings = {} } = await chrome.storage.sync.get('settings');
  for (const site of SITES) {
    // Default to enabled when the user hasn't visited the popup yet.
    document.getElementById(site).checked = settings[site]?.enabled ?? true;
  }
};

const save = async () => {
  const { settings = {} } = await chrome.storage.sync.get('settings');
  for (const site of SITES) {
    settings[site] = {
      ...(settings[site] ?? {}),
      enabled: document.getElementById(site).checked,
    };
  }
  await chrome.storage.sync.set({ settings });
};

document.addEventListener('DOMContentLoaded', () => {
  load();
  for (const site of SITES) {
    const el = document.getElementById(site);
    el.addEventListener('change', () => {
      save();
      const row = el.closest('.row');
      const cls = el.checked ? 'on-anim' : 'off-anim';
      row.classList.remove('on-anim', 'off-anim');
      void row.offsetWidth;
      row.classList.add(cls);
      row.addEventListener('animationend', () => row.classList.remove(cls), { once: true });
    });
  }
});
