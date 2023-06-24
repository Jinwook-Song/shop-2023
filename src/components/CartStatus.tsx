import { useQuery } from '@tanstack/react-query';
import { getCart } from 'api/firebase';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuthContext } from './context/AuthContext';

export default function CartStatus() {
  const uid = useAuthContext()?.user?.uid!;
  const { data: products } = useQuery(['carts'], () => getCart(uid));

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && (
        <p className='w-6 h-6 text-center bg-brand text-white font-semibold rounded-full absolute -top-1 -right-3'>
          {products.length}
        </p>
      )}
    </div>
  );
}
