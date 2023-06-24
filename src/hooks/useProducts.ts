import { ProductType, getProducts, addNewProduct } from 'api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductInputType } from 'pages/NewProduct';

type AddNewProduct = {
  product: ProductInputType;
  imageUrl: string;
};

// ui, biz 분리
export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<ProductType[]>(['products'], getProducts, {
    staleTime: 1000 * 60,
  });

  const addProductMutation = useMutation<void, unknown, AddNewProduct>({
    mutationFn: ({ product, imageUrl }) => addNewProduct({ product, imageUrl }),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return { productsQuery, addProductMutation };
}
