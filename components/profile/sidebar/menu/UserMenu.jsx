'use client';

import { usePathname } from 'next/navigation';
import useUser from '@/grandus-lib/hooks/useUser';

import get from 'lodash/get';

import LocalizedLink from '@/components/localizedLink/LocalizedLink';

import Box from '@/components/_other/box/Box';
import UserSettingsIcon from '@/components/_other/icons/UserSettingsIcon';
import OrdersIcon from '@/components/_other/icons/OrdersIcon';
import LogoutIcon from '@/components/_other/icons/LogoutIcon';

import styles from './UserMenu.module.scss';
import { startsWith } from 'lodash';
import HeartIcon from '@/components/_other/icons/HeartIcon';
import Divider from '@/components/_other/divider/Divider';
import { CompareIcon } from '@/components/_other/icons/CompareIcon';
import { useTranslation } from '@/app/i18n/client';

const UserMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <ul className={styles?.menu}>
      <li className={pathname === '/profil' ? styles.active : ''}>
        <LocalizedLink href="/profil">
          <UserSettingsIcon className={styles?.icon} />
          {t('profile.menu.profile_settings')}
        </LocalizedLink>
      </li>
      <li className={startsWith(pathname, '/profil/objednavky') ? styles.active : ''}>
        <LocalizedLink href="/profil/objednavky">
          <OrdersIcon className={styles?.icon} />
          {t('profile.menu.orders')}
        </LocalizedLink>
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <LocalizedLink href="/oblubene">
          <HeartIcon className={styles?.icon} />
          {t('profile.menu.wishlist')}
        </LocalizedLink>
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <LocalizedLink href="/odhlasenie" className={styles?.danger}>
          <LogoutIcon className={styles?.icon} />
          {t('profile.menu.logout')}
        </LocalizedLink>
      </li>

      <li className={styles.creditsBlock}>
        <h4>
          {t('profile.credits.title')}
        </h4>
        <Box>
          <div className={styles.creditsTitle}> {t('profile.credits.state')}:</div>
          <div>
            {`${get(user, 'credit', 0)} ${t('profile.credits.credits')}`}
          </div>
        </Box>
      </li>
    </ul>
  );
};

export default UserMenu;
