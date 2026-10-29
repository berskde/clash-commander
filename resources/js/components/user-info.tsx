import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
  user,
  showEmail = false,
}: {
  user: User;
  showEmail?: boolean;
}) {
  const getInitials = useInitials();

  return (
    <div>
      {user.avatar ? (
        <img src={user.avatar} alt="" />
      ) : (
        <span aria-hidden="true">{getInitials(user.name)}</span>
      )}
      <div>
        <p>{user.name}</p>
        {showEmail && <p>{user.email}</p>}
      </div>
    </div>
  );
}
