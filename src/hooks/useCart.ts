import {
  getCart,
  AddOrUpdateCart,
  addOrUpdateToCart,
  removeFromCart,
} from 'api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from 'components/context/AuthContext';

export default function useCart() {
  const uid = useAuthContext()?.user?.uid || '';

  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid], () => getCart(uid), {
    enabled: !!uid, // 사용자 없는경우, query가 수행되지 않도록
    staleTime: 1000 * 60,
  });

  const addOrUpdateToCartMutation = useMutation<
    void,
    unknown,
    AddOrUpdateCart['product']
  >({
    mutationFn: (product) => addOrUpdateToCart({ uid, product }),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeFromCartMutation = useMutation<void, unknown, string>({
    mutationFn: (productId) => removeFromCart({ uid, productId }),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return {
    cartQuery,
    addOrUpdateToCartMutation,
    removeFromCartMutation,
  };
}
