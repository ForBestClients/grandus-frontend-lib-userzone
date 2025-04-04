'use client';
import useCart from '@/grandus-lib/hooks/useCart';
import { useRouter } from 'next/navigation';

import Script from 'next/script';
import get from 'lodash/get';

import {
  APPLE_SIGNIN_ENABLED,
  APPLE_SIGNIN_CLIENT_ID,
} from '@/constants/AppConstants';

import styles from './AppleSignin.module.scss';
import { useEffect, useState } from 'react';
import appleIcon from '@/public/assets/icons/apple-logo.svg';
import ImageNext from 'next/image';
import useSWR from 'swr';
import useUser from '@/grandus-lib/hooks/useUser';

/**
 * Apple signin which genereates button from Apple configured to work with GRANDUS backend.
 * All data needed for backend are stored is "state"
 *
 * Resources for customization of button:
 * https://developer.apple.com/documentation/sign_in_with_apple/displaying_sign_in_with_apple_buttons_on_the_web
 *
 */

const SOCIAL_LOGIN_RETURN_DOMAIN = process.env.NEXT_PUBLIC_SOCIAL_LOGIN_DOMAIN;

const AppleSignin = ({ className = '', returnUrl = '', disabled = false}) => {
  const router = useRouter();
  const { cart } = useCart();
  const { user } = useUser();

  const backUrl = returnUrl ? returnUrl : router.asPath;
  const [visibleApple, setVisibleApple] = useState(false);

  const { data: webInstance } = useSWR(
    `/api/lib/v1/webinstance`,
    url => fetch(url).then(r => r.json()),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  useEffect(() => {
    window?.AppleID?.auth?.init({
      clientId: get(webInstance?.globalSettings, APPLE_SIGNIN_CLIENT_ID, false),
      scope: 'name email',
      redirectURI: `${process.env.NEXT_PUBLIC_OAUTH_HOST}/api/v2/auth/apple-callback`,
      state: JSON.stringify(state),
    });
    if (!visibleApple) {
      window?.AppleID ? setVisibleApple(true) : '';
    }
  });

  if (!get(webInstance?.globalSettings, APPLE_SIGNIN_ENABLED, false)) {
    return null;
  }

  const returnDomain = SOCIAL_LOGIN_RETURN_DOMAIN
    ? SOCIAL_LOGIN_RETURN_DOMAIN
    : webInstance?.domain;

  const state = {
    ownerToken: get(webInstance, 'ownerToken', false),
    webInstanceToken: get(webInstance, 'webInstanceToken', false),
    frontendReturnUrl: `${returnDomain}/api/lib/v1/auth/oauth?backUrl=${backUrl}`,
    cartAccessToken: get(cart, 'accessToken', ''),
    userAccessToken: get(user, 'accessToken', '')
  };

  return (
    <div className={styles?.wrapper + ' appleWrap ' + (disabled ? styles.disabled : '')}>
      {visibleApple ? (
        <div className={styles?.logo + ' appleBtn'}>
          <ImageNext src={appleIcon} className="" alt="apple logo" />
        </div>
      ) : (
        ''
      )}

      <div
        id="appleid-signin"
        data-height="53"
        data-color="black"
        data-border="true"
        data-type="sign in"
        className={`${styles.appleSignin} ${className}`}
      ></div>
    </div>
  );
};

export default AppleSignin;
