import { usePathname } from 'next/navigation';

import CustomButton from '@/components/_other/button/CustomButton';
import get from 'lodash/get';

import useCart from '@/grandus-lib/hooks/useCart';
import AppleSignin from './AppleSignin';

import googleIcon from '@/public/assets/icons/google-logo.svg';
import facebookIcon from '@/public/assets/icons/facebook-logo.svg';

import style from './SocialLogin.module.scss';

import {
  FACEBOOK_SIGNIN_ENABLED,
  GOOGLE_SIGNIN_ENABLED,
  APPLE_SIGNIN_ENABLED,
} from '@/constants/AppConstants';

import ImageNext from 'next/image';
import useSWR from 'swr';
import useUser from '@/grandus-lib/hooks/useUser';
import isEmpty from 'lodash/isEmpty';
import src from 'public/icons/icon-check.svg'

const SOCIAL_LOGIN_RETURN_DOMAIN = process.env.NEXT_PUBLIC_SOCIAL_LOGIN_DOMAIN;

const SocialLogin = ({
                       returnUrl = '',
                       className = '',
                     }) => {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user } = useUser();

  const { data: webInstance } = useSWR(
    `/api/lib/v1/webinstance`,
    url => fetch(url).then(r => r.json()),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  if (isEmpty(user)) {
    return '';
  }

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

  const backUrl = returnUrl ? returnUrl : pathname;

  const styleFacebook = {
    background: '#4267B2',
    borderColor: '#4267B2',
    justifyContent: 'flex-start',
    paddingLeft: '34px !important',
  };

  const returnDomain = SOCIAL_LOGIN_RETURN_DOMAIN
    ? SOCIAL_LOGIN_RETURN_DOMAIN
    : webInstance?.domain;

  const webInstanceToken = get(webInstance, 'webInstanceToken');
  const cartAccessToken = encodeURIComponent(get(cart, 'accessToken', ''));
  const useAccessToken = encodeURIComponent(get(user, 'accessToken', ''));
  const frontendReturnUrl = `${returnDomain}/api/lib/v1/auth/oauth?backUrl=${backUrl}`;

  const redirectUrlQuery = `webInstanceToken=${webInstanceToken}&cartAccessToken=${cartAccessToken}&userAccessToken=${useAccessToken}&frontendReturnUrl=${frontendReturnUrl}`;

  return (
    <div
      className={`${style.btnWrapper} ${className}`}
    >
      <div className='row'>
        <div className='col-12 text-center mb-1'>
          <strong>Prepojiť účet s:</strong>
        </div>
      </div>

      <div className='row justify-content-center align-items-top'>
        {googleLoginEnabled ? (
          <div className={'col-auto text-center justify-content-center'}>
            <CustomButton
              htmlType='a'
              type='primary'
              size='google'
              className={'google ' + style.button}
              disabled={user?.hasGoogleLogin}
              href={`${process.env.NEXT_PUBLIC_OAUTH_HOST}/api/v2/auth/google?${redirectUrlQuery}`}
            >
              <ImageNext src={googleIcon} className='' alt='google logo' />
            </CustomButton>

            {
              user?.hasGoogleLogin
                ? (
                  <div className={'mt-2 mt-xxl-1 justify-content-center d-flex w-100'}>
                    <div className={style.icon}>
                      <ImageNext src={src} alt={'check'} />
                    </div>
                  </div>
                )
                : ''
            }
          </div>
        ) : null}

        {appleLoginEnabled ? (
          <div className={'col-auto'}>
            <AppleSignin className='' returnUrl={backUrl} disabled={user?.hasAppleLogin} />

            {
              user?.hasAppleLogin
                ? (
                  <div className={'mt-2 mt-xxl-1 justify-content-center d-flex w-100'}>
                    <div className={style.icon}>
                      <ImageNext src={src} alt={'check'} />
                    </div>
                  </div>
                )
                : ''
            }
          </div>
        ) : null}

        {facebokLoginEnabled ? (
          <div className={'col-auto'}>
            <CustomButton
              htmlType='a'
              type='primary'
              size='social'
              style={styleFacebook}
              className={'facebook ' + style.button}
              disabled={user?.hasFacebookLogin}
              href={`${
                process.env.NEXT_PUBLIC_OAUTH_HOST
              }/api/v2/auth/facebook?${redirectUrlQuery}`}
            >
              <ImageNext
                src={facebookIcon}
                className=''
                alt='Facebook logo'
              />
            </CustomButton>

            {
              user?.hasFacebookLogin
                ? (
                  <div className={'mt-2 mt-xxl-1 justify-content-center d-flex w-100'}>
                    <div className={style.icon}>
                      <ImageNext src={src} alt={'check'} />
                    </div>
                  </div>
                )
                : ''
            }
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SocialLogin;
