import { User } from 'firebase/auth';

type Props = {
  user: User;
};

export default function Avatar({ user: { photoURL, displayName } }: Props) {
  return (
    <div className='flex items-center'>
      <img
        className='w-10 h-10 rounded-full mr-2'
        src={photoURL!}
        alt={displayName!}
      />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
