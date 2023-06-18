import { cls } from 'utils/util';

type Props = {
  text: string;
  onClick: () => {};
  className?: string;
};
export default function Button({ text, onClick, className }: Props) {
  return (
    <button
      className={cls(
        className!,
        'bg-brand py-2 px-4 text-white rounded-sm shadow-md hover:brightness-110'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
