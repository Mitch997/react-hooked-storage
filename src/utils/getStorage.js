const memoryStorage = (() => {
  let store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

export function getStorage(type = 'local') {
  try {
    if (typeof window === 'undefined') return memoryStorage;
    const storage = type === 'session' ? window.sessionStorage : window.localStorage;
    // Prova a scrivere qualcosa per assicurarti che funzioni
    const testKey = '__test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return storage;
  } catch (e) {
    return memoryStorage;
  }
}
