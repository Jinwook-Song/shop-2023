import { AddOrUpdateCart, addOrUpdateToCart, ProductType } from 'api/firebase';
import { useAuthContext } from 'components/context/AuthContext';
import Button from 'components/ui/Button';
import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

type State = {
  state: {
    product: ProductType;
  };
};

export default function ProductDetail() {
  const uid = useAuthContext()?.user?.uid!;
  const {
    state: {
      product,
      product: { imageUrl, title, description, category, price, options },
    },
  } = useLocation() as State;

  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);
  const handleClick = () => {
    const selectedProduct: AddOrUpdateCart['product'] = {
      ...product,
      options: selected,
      quantity: 1,
    };
    addOrUpdateToCart({ uid, product: selectedProduct });
  };
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <div className='px-4 basis-7/12 shadow-md '>
          <img
            className='w-full h-full object-cover'
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-semibold py-2'>{title}</h2>
          <p className='text-2xl font-semibold py-2 border-b border-gray-400'>
            ₩{price}
          </p>
          <p className='text-lg py-4'>{description}</p>
          <div className='flex items-center gap-x-4'>
            <label className='text-brand font-semibold' htmlFor='select'>
              옵션:
            </label>
            <select
              className='p-2 my-4 flex-1 border-2 border-dashed border-brand outline-none'
              id='select'
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
