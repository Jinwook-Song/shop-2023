import { cls } from 'utils/util';

type Props = {
  text: string;
  onClick: (_?: any) => void;
  className?: string;
  disabled?: boolean;
};
export default function Button({
  text,
  onClick,
  className,
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={cls(
        className!,
        'bg-brand py-2 px-4 text-white rounded-sm shadow-md hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
