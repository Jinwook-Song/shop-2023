import CartItem from 'components/CartItem';
import PriceCard from 'components/PriceCard';
import Button from 'components/ui/Button';
import useCart from 'hooks/useCart';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;

export default function MyCart() {
  const {
    cartQuery: { data: products, isLoading },
  } = useCart();
  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    (products &&
      products.reduce(
        (prev, curr) => prev + parseInt(curr.price) * curr.quantity,
        0
      )) ||
    0;

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-semibold'>내 장바구니</p>
      <hr className='my-4' />

      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <hr className='my-4' />
          <div className='flex justify-between items-center mb-8 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총 가격' price={totalPrice + SHIPPING} />
          </div>
          <Button text='주문하기' onClick={() => {}} />
        </>
      )}
    </section>
  );
}
