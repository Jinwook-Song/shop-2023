import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { ProductInputType } from 'pages/NewProduct';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

export type AdminUser = User & {
  isAdmin?: boolean;
};
async function adminUser(user: User): Promise<AdminUser> {
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

export type ProductType = Omit<ProductInputType, 'options'> & {
  id: string;
  imageUrl: string;
  options: string[];
};

export async function addNewProduct({
  product,
  imageUrl,
}: {
  product: ProductInputType;
  imageUrl: string;
}) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    options: product.options.split(','),
    imageUrl,
  });
}

export async function getProducts(): Promise<ProductType[]> {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(
  uid: string
): Promise<AddOrUpdateCart['product'][]> {
  return get(ref(database, `carts/${uid}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export type AddOrUpdateCart = {
  uid: string;
  product: Omit<ProductType, 'options'> & {
    options: string;
    quantity: number;
  };
};

export async function addOrUpdateToCart({ uid, product }: AddOrUpdateCart) {
  if (!uid) throw new Error('user not found');
  return set(ref(database, `carts/${uid}/${product.id}`), product);
}

export async function removeFromCart({
  uid,
  productId,
}: {
  uid: string;
  productId: string;
}) {
  return remove(ref(database, `carts/${uid}/${productId}`));
}
