# shop

| 프로젝트 기간 | 23.06.17~                                 |
| ------------- | ----------------------------------------- |
| 프로젝트 목적 | react + firebase + cloudinary             |
| Github        | https://github.com/Jinwook-Song/shop-2023 |
| Cloudinary    | https://cloudinary.com/documentation      |

---

## Firebase Auth

- src > api > firebase.ts

```tsx
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
```

- NavBar

컴포넌트에서 비즈니스 로직을 알 필요는 없다

```tsx
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from 'api/firebase';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to={'/products'}>Products</Link>
        <Link to={'/carts'}>Carts</Link>
        <Link to={'/products/new'} className='text-2xl'>
          <BsPencilFill />
        </Link>
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}
```
