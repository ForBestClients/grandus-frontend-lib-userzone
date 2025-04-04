import styles from './ForgottenPassword.module.scss';
import PasswordChange from '@/components/forms/forgottenPassword/PasswordChange';
import Box from '@/components/_other/box/Box';
import { initTranslations } from '@/app/i18n';

const PasswordRecovery = async ({ params }) => {
  const { t } = await initTranslations(params?.locale);

  const hash = params?.hash;
  return (
    <div>
      <div className="container py-5">
        <Box className={styles.forgottenPass}>
          <h1>{t('auth.forgotten_password.reset_title')}</h1>
          <p className="mb-8">
            {t('auth.forgotten_password.reset_subtitle')} <b>{hash}</b>.
          </p>
          <PasswordChange hash={hash} />
        </Box>
      </div>
    </div>
  );
};

export default PasswordRecovery;
