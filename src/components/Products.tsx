import useProducts from 'hooks/useProducts';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    productsQuery: { data: products, isLoading, error },
  } = useProducts();

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
