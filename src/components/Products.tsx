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
      <ul>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
