# shop

| 프로젝트 기간 | 23.06.17~23.06.24                         |
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

- isAdmin

realtime database에 admin uid를 등록해두고 속성에 추가

```tsx
export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

export type AdminUser = User & {
  isAdmin?: boolean;
};
async function adminUser(user: User) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val() as string[];
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}
```

## Auth Context

```tsx
import { AdminUser, login, logout, onUserStateChange } from 'api/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: AdminUser | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
```

- routes

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/products', element: <AllProducts /> },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requiredAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      { path: '/products/:id', element: <ProductDetail /> },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
```

- protected component

```tsx
import { useAuthContext } from 'components/context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  requiredAdmin?: boolean;
};

export default function ProtectedRoute({
  children,
  requiredAdmin = false,
}: Props) {
  const user = useAuthContext()?.user;

  if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
}
```

## File Upload (cloudinary)

[docs](https://cloudinary.com/documentation/upload_images#code_explorer_upload_multiple_files_using_a_form_unsigned)

api > upload.ts

```tsx
export async function uploadImage(file: File) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET!);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL!, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
```

## React query with Custom Hook

- useProducts

```tsx
import { ProductType, getProducts, addNewProduct } from 'api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductInputType } from 'pages/NewProduct';

type AddNewProduct = {
  product: ProductInputType;
  imageUrl: string;
};

// ui, biz 분리
export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<ProductType[]>(['products'], getProducts, {
    staleTime: 1000 * 60,
  });

  const addProductMutation = useMutation<void, unknown, AddNewProduct>({
    mutationFn: ({ product, imageUrl }) => addNewProduct({ product, imageUrl }),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return { productsQuery, addProductMutation };
}
```

- useCart

```tsx
import {
  getCart,
  AddOrUpdateCart,
  addOrUpdateToCart,
  removeFromCart,
} from 'api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from 'components/context/AuthContext';

export default function useCart() {
  const uid = useAuthContext()?.user?.uid || '';

  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid], () => getCart(uid), {
    enabled: !!uid, // 사용자 없는경우, query가 수행되지 않도록
    staleTime: 1000 * 60,
  });

  const addOrUpdateToCartMutation = useMutation<
    void,
    unknown,
    AddOrUpdateCart['product']
  >({
    mutationFn: (product) => addOrUpdateToCart({ uid, product }),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeFromCartMutation = useMutation<void, unknown, string>({
    mutationFn: (productId) => removeFromCart({ uid, productId }),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return {
    cartQuery,
    addOrUpdateToCartMutation,
    removeFromCartMutation,
  };
}
```
