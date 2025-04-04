import { usePathname } from 'next/navigation';

import CustomButton from '@/components/_other/button/CustomButton';
import get from 'lodash/get';

import useCart from '@/grandus-lib/hooks/useCart';
import AppleSignin from './AppleSignin';

import googleIcon from '@/public/assets/icons/google-logo.svg';
import facebookIcon from '@/public/assets/icons/facebook-logo.svg';

import styles from './SocialLogin.module.scss';

import {
  FACEBOOK_SIGNIN_ENABLED,
  GOOGLE_SIGNIN_ENABLED,
  APPLE_SIGNIN_ENABLED,
} from '@/constants/AppConstants';

import ImageNext from 'next/image';
import useSWR from 'swr';

const SOCIAL_LOGIN_RETURN_DOMAIN = process.env.NEXT_PUBLIC_SOCIAL_LOGIN_DOMAIN;

const SocialLogin = ({
  layout = 'column',
  returnUrl = '',
  className = '',
  isPromo = false,
}) => {
  const pathname = usePathname();
  const { cart } = useCart();

  const { data: webInstance } = useSWR(
    `/api/lib/v1/webinstance`,
    url => fetch(url).then(r => r.json()),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const facebokLoginEnabled = get(
    webInstance?.globalSettings,
    FACEBOOK_SIGNIN_ENABLED,
  );
  const googleLoginEnabled = get(
    webInstance?.globalSettings,
    GOOGLE_SIGNIN_ENABLED,
  );
  const appleLoginEnabled = get(
    webInstance?.globalSettings,
    APPLE_SIGNIN_ENABLED,
  );

  const isAnyEnabled = googleLoginEnabled || facebokLoginEnabled || appleLoginEnabled;

  const classNameWrap =
    layout === 'column' ? 'w-full mb-4' : 'w-full mb-4';

  const backUrl = returnUrl ? returnUrl : pathname;

  const styleFacebook = {
    background: '#4267B2',
    borderColor: '#4267B2',
    justifyContent: 'flex-center',
  };

  const returnDomain = SOCIAL_LOGIN_RETURN_DOMAIN
    ? SOCIAL_LOGIN_RETURN_DOMAIN
    : webInstance?.domain;

  if (!isAnyEnabled) {
    return null;
  }

  return (
    <div
      className={`${styles.btnWrapper} ${
        isPromo ? styles.promo : ''
      } ${classNameWrap} ${className}`}
    >
      {isAnyEnabled ? (
          <div className="w-full text-center my-4">
            Alebo sa <strong>prihláste pomocou:</strong>
          </div>
      ) : null}
      <div className="mb-4 flex gap-4 justify-round md:justify-center items-center">
        {googleLoginEnabled ? (
          <CustomButton
            htmlType="a"
            type="ghost"
            className={styles.google}
            href={`${
              process.env.NEXT_PUBLIC_OAUTH_HOST
            }/api/v2/auth/google?webInstanceToken=${get(
              webInstance,
              'webInstanceToken',
            )}&cartAccessToken=${encodeURIComponent(
              get(cart, 'accessToken', ''),
            )}&frontendReturnUrl=${returnDomain}/api/lib/v1/auth/oauth?backUrl=${backUrl}`}
          >
            <ImageNext src={googleIcon} className="" alt="google logo" />
          </CustomButton>
        ) : null}

        {appleLoginEnabled ? (
          <AppleSignin className={styles.appleBtn} returnUrl={backUrl} />
        ) : null}

        {facebokLoginEnabled ? (
          <CustomButton
            htmlType="a"
            type="ghost"
            style={styleFacebook}
            className={styles.facebook}
            href={`${
              process.env.NEXT_PUBLIC_OAUTH_HOST
            }/api/v2/auth/facebook?webInstanceToken=${get(
              webInstance,
              'webInstanceToken',
            )}&cartAccessToken=${encodeURIComponent(
              get(cart, 'accessToken', ''),
            )}&frontendReturnUrl=${returnDomain}/api/lib/v1/auth/oauth?backUrl=${backUrl}`}
          >
            <ImageNext src={facebookIcon} className="" alt="Facebook logo" />
          </CustomButton>
        ) : null}
      </div>
    </div>
  );
};

export default SocialLogin;
