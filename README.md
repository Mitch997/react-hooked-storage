# react-hooked-storage

🚀 A lightweight React hooks library for managing `localStorage` and `sessionStorage` with advanced features like TTL (time-to-live), cross-tab sync, and in-memory fallback.

This library provides a set of composable React hooks that simplify access to browser storage in a secure, declarative, and extensible way.

---

## ✨ Features

- 🔒 `usePersistentState`: add TTL with automatic expiration
- 🔁 `useStorage`: generic hook for `localStorage` or `sessionStorage`
- 💾 `useLocalStorage`: works directly with `localStorage`
- 🗂️ `useSessionStorage`: works directly with `sessionStorage`
- 🧠 In-memory fallback for server-side or incognito environments
- 📡 Tab sync support (coming soon)
- 🧪 Fully typed and test-friendly

1. useLocalStorage
   - Stores a value in localStorage and keeps it in sync with React state.
   - Automatically parses and stringifies JSON values.
   - Provides methods to set and remove the stored value.

2. useSessionStorage
   - Works the same as useLocalStorage but uses sessionStorage.
   - Useful for short-lived data that should not persist after the tab is closed.


3. useStorage
   - A generic hook that supports both localStorage and sessionStorage based on an option.



4. usePersistentState
   - Adds TTL (Time-To-Live) support to stored values.
   - Automatically removes expired values and resets the state.
   - Accepts an `onExpire()` callback to perform custom logic when the value expires.
   - Ideal for authentication tokens, temporary sessions, or expirable caches.

---

## 📦 Installation

npm install react-hooked-storage

## 💡 Usage Example

Here’s how to use `useLocalStorage` to persist a username:

```jsx
import { useLocalStorage } from 'react-hooked-storage';

function UsernameForm() {
  const [username, setUsername, clearUsername] = useLocalStorage('username', '');

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={clearUsername}>Clear</button>
    </div>
  );
}
```
Here’s how to use `useSessionStorage` to persist a username:

```jsx
import { useSessionStorage } from 'react-hooked-storage';

function UsernameForm() {
  const [username, setUsername, clearUsername] = useSessionStorage('username', '');

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={clearUsername}>Clear</button>
    </div>
  );
}
```
Here’s how to use `useStorage` to persist a username:

```jsx
import { useStorage } from 'react-hooked-storage';

function UsernameForm() {
  const [username, setUsername, clearUsername] = useStorage('username', '',{type:'session'});

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={clearUsername}>Clear</button>
    </div>
  );
}
```

Or use usePersistentState with TTL (Time-To-Live):


```jsx
import { usePersistentState } from 'react-hooked-storage';

function AuthToken() {
  const [token, setToken] = usePersistentState('auth-token', null, {
    ttl: 10000, // 10 seconds
    onExpire: () => alert('Your session expired.'),
  });

  return (
    <div>
      <p>Token: {token}</p>
      <button onClick={() => setToken('abc123')}>Set Token</button>
    </div>
  );
}
```

🛠 Compatibility

    ✅ React 18+

    ✅ Vite / CRA / Next.js

    ✅ SSR / Node.js environments

    ✅ Works with jsdom, jest, vitest

📘 License
    © 2025 Michele Cavallaro Venditti


🐙 GitHub repository

    https://github.com/Mitch997/react-hooked-storage


🚀 Roadmap (coming soon)

- useSyncedStorage
  Synchronizes values between open browser tabs using the "storage" event.

- useEncryptedStorage
  Automatically encrypts and decrypts values using a secret key.

- Hook Factory
  Create custom hooks with predefined encoding/decoding strategies.

- Compression Support
  Compress stored data to save space using libraries like LZ-string.

🙌 Contributing
    Found a bug or have a suggestion?
    Open an issue or submit a pull request.

 appreciate all contributions!





