'use client';

import useUser from '@/grandus-lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useCart from '@/grandus-lib/hooks/useCart';
import { useState } from 'react';
import LoadingIcon from '@/components/_other/icons/LoadingIcon';

const LogoutLink = () => {
  const { logoutUser } = useUser();
  const { mutateCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await logoutUser();
      mutateCart({});
      router.push('/odhlasenie');
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <Link href={'#'} onClick={handleClick}>
      {isLoading ? <LoadingIcon /> : 'Odhlásenie'}
    </Link>
  );
};

export default LogoutLink;
