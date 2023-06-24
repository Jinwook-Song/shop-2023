import {
  AddOrUpdateCart,
  addOrUpdateToCart,
  removeFromCart,
} from 'api/firebase';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';

type Props = {
  product: AddOrUpdateCart['product'];
  uid: string;
};
const ICON_CLASS =
  'cursor-pointer hover:text-brand hover:scale-105 transition-all mx-1';

export default function CartItem({
  product,
  product: { id, imageUrl, title, options, price, quantity },
  uid,
}: Props) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart({ uid, product: { ...product, quantity: quantity - 1 } });
  };
  const handlePlus = () =>
    addOrUpdateToCart({ uid, product: { ...product, quantity: quantity + 1 } });
  const handleDelete = () => removeFromCart({ uid, productId: id });

  return (
    <li className='flex justify-between my-2 items-center'>
      <div className='w-24 md:w-48 rounded-lg overflow-hidden shadow-md'>
        <img className='w-full object-cover' src={imageUrl} alt={title} />
      </div>
      <div className='flex flex-1 justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='text-xl font-semibold text-brand'>{options}</p>
          <p>₩{price}</p>
        </div>
      </div>
      <div className='text-2xl flex items-center'>
        <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
        <span>{quantity}</span>
        <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
        <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
      </div>
    </li>
  );
}
