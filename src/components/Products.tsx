import { useQuery } from '@tanstack/react-query';
import { getProducts, ProductType } from 'api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<ProductType[]>(['products'], getProducts);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{`${error}`}</p>}
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
