type Props = {
  text: string;
  price: number;
};
export default function PriceCard({ text, price }: Props) {
  return (
    <div>
      <p>{text}</p>
      <p>{price}</p>
    </div>
  );
}
