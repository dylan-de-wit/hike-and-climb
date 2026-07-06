/**
 * Onthoudt de gekozen knopen.json (File System Access handle) in IndexedDB,
 * zodat je 'm na een herlaad niet opnieuw hoeft te koppelen.
 */
const DB = 'knoop-editor';
const STORE = 'handles';
const KEY = 'knopen-bestand';

function db(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

export async function bewaarHandle(handle: FileSystemFileHandle): Promise<void> {
  const d = await db();
  await new Promise((res, rej) => {
    const t = d.transaction(STORE, 'readwrite');
    t.objectStore(STORE).put(handle, KEY);
    t.oncomplete = () => res(null);
    t.onerror = () => rej(t.error);
  });
}

export async function leesHandle(): Promise<FileSystemFileHandle | null> {
  try {
    const d = await db();
    return await new Promise((res) => {
      const t = d.transaction(STORE, 'readonly');
      const rq = t.objectStore(STORE).get(KEY);
      rq.onsuccess = () => res((rq.result as FileSystemFileHandle) ?? null);
      rq.onerror = () => res(null);
    });
  } catch {
    return null;
  }
}

/** Of de browser File System Access ondersteunt (Chrome/Edge). */
export function steuntBestandsopslag(): boolean {
  return typeof (window as unknown as { showSaveFilePicker?: unknown }).showSaveFilePicker === 'function';
}
