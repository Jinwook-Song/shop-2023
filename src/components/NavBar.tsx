import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill } from 'react-icons/bs';

export default function NavBar() {
  return (
    <header>
      <Link to='/'>
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav>
        <Link to={'/products'}>Products</Link>
        <Link to={'/carts'}>Carts</Link>
        <Link to={'/products/new'}>
          <BsPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
