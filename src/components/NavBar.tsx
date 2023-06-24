import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill } from 'react-icons/bs';
import Avatar from './Avatar';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';
import CartStatus from './CartStatus';

export default function NavBar() {
  const auth = useAuthContext();
  if (!auth) return <></>;

  const { user, login, logout } = auth;

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to={'/products'}>Products</Link>
        {user && (
          <Link to={'/carts'}>
            <CartStatus />
          </Link>
        )}
        {user?.isAdmin && (
          <Link to={'/products/new'} className='text-2xl'>
            <BsPencilFill />
          </Link>
        )}
        {user && <Avatar user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </nav>
    </header>
  );
}
