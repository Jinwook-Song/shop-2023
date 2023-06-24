import { useQuery } from '@tanstack/react-query';
import { getCart } from 'api/firebase';
import CartItem from 'components/CartItem';
import { useAuthContext } from 'components/context/AuthContext';
import PriceCard from 'components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;

export default function MyCart() {
  const uid = useAuthContext()?.user?.uid!;
  const {
    data: products, //
    isLoading,
  } = useQuery(['carts'], () => getCart(uid));
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
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products.map((product) => (
              <CartItem key={product.id} product={product} uid={uid} />
            ))}
          </ul>
          <div>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals />
            <PriceCard text='총 가격' price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
}
