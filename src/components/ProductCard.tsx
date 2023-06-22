import { ProductType } from 'api/firebase';

type Props = {
  product: ProductType;
};
export default function ProductCard({
  product: { id, title, category, price, imageUrl },
}: Props) {
  return (
    <li>
      <img src={imageUrl} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
}
