import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill } from 'react-icons/bs';
import { AdminUser, login, logout, onUserStateChange } from 'api/firebase';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';

export default function NavBar() {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  console.log(user);

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
        {user && <Avatar user={user} />}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}
