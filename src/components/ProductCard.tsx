import { ProductType } from 'api/firebase';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: ProductType;
};
export default function ProductCard({
  product,
  product: { id, title, category, price, imageUrl },
}: Props) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate(`/products/${id}`, { state: { product } })}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer'
    >
      <div className='w-full aspect-[4/5] overflow-hidden'>
        <img
          className='w-full h-full object-cover hover:scale-105 transition-transform'
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className='mb-2 px-2 opacity-70 '>{category}</p>
    </li>
  );
}
