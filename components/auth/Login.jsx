'use client';
import useUser from '@/grandus-lib/hooks/useUser';

import SocialLogin from '@/modules/userzone/components/auth/SocialLogin';;
import LoginForm from 'components/forms/Login';
import CustomButton from '@/components/_other/button/CustomButton';

import styles from './Login.module.scss';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'utils/translations';

import ImageNext from 'next/image';

import personImg from 'public/graphics/login-person.png';
import handImg from 'public/graphics/login-hand.png';

const Login = ({ returnUrl, afterLoginCallback, closeLogin }) => {
  const { user, isLoading } = useUser({
    redirectTo: returnUrl ? returnUrl : '/',
    redirectIfFound: true,
  });

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h2 className="d-block my-4 text-center">
          <br />
          <br />
          <span>🚧</span> pracujem s prihlásením...
          <br />
          <br />
        </h2>
      </div>
    );
  }

  if (user?.accessToken) {
    return (
      <div className={styles.loading}>
        <h2 className="d-block my-4">
          <br />
          <br />
          <span>🎉</span> Vitajte späť,{' '}
          {user?.fullName ? user?.fullName : user?.email}
          <br />
          <br />
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className={styles.login__social}>
        <div className={styles.login__socialLinks}>
          <h4 className="mb-3">Prihlásiť sa pomocou</h4>
          <SocialLogin returnUrl={returnUrl} layout="row" />
        </div>
        <div>
          <ImageNext
            src={personImg}
            width={368}
            height={317}
            alt="Postava"
            className={styles.login__img}
            placeholder="blur"
          />
        </div>
      </div>
      <div className={styles.login__form}>
        <h4 className="mb-3">Prihlásenie</h4>
        <LoginForm afterLoginCallback={afterLoginCallback} />
      </div>
      <div className={styles.login__registration}>
        <div className={styles.login__registrationText}>
          <p>
            <strong>
              <span>{t('Registrujte sa')}</span>
              <br />
            </strong>
            {t('a získajte ')} <strong>{t('zľavy, ')}</strong> <br />
            <strong>{t(' bonusy a rôzne výhody')}</strong>.
          </p>
          <CustomButton
            href="/registracia"
            as={`/registracia`}
            htmlType="a"
            type="border"
            size="medium"
            fullWidth={true}
            onClick={closeLogin}
          >
            {upperFirst(t('registrujte sa'))}
          </CustomButton>
        </div>
        <div className={styles.login__registrationImg}>
          <ImageNext
            src={handImg}
            width={444}
            height={296}
            alt="Ruka"
            placeholder="blur"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
