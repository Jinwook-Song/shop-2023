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
export default function CartItem({
  product,
  product: { id, imageUrl, title, options, quantity },
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
    <li>
      <img src={imageUrl} alt={title} />
      <div>
        <p>{title}</p>
        <p>{options}</p>
      </div>
      <div>
        <AiOutlineMinusSquare onClick={handleMinus} />
        <span>{quantity}</span>
        <AiOutlinePlusSquare onClick={handlePlus} />
        <RiDeleteBin5Fill onClick={handleDelete} />
      </div>
    </li>
  );
}
