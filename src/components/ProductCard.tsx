import { ProductType } from 'api/firebase';

type Props = {
  product: ProductType;
};
export default function ProductCard({
  product: { id, title, category, price, imageUrl },
}: Props) {
  return (
    <li className='rounded-lg shadow-md overflow-hidden cursor-pointer'>
      <img
        className='w-full aspect-[3/4] object-cover'
        src={imageUrl}
        alt={title}
      />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className='mb-2 px-2 opacity-70 '>{category}</p>
    </li>
  );
}
