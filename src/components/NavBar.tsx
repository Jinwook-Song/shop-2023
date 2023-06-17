import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill } from 'react-icons/bs';

export default function NavBar() {
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
        <button>Login</button>
      </nav>
    </header>
  );
}
