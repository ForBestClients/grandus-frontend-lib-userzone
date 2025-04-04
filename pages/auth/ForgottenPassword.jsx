import ForgottenPassword from '@/components/forms/forgottenPassword/ForgottenPassword';
import Box from '@/components/_other/box/Box';

import styles from './ForgottenPassword.module.scss';
import { initTranslations } from '@/app/i18n';

const ForgottenPasswordPage = async ({ params}) => {
  const { t } = await initTranslations(params?.locale);
  return (
    <div>
      <div className="container py-5">
        <Box className={styles.forgottenPass}>
          <h1>{t('auth.forgotten_password.title')}</h1>
          <p className="mb-5">{t('auth.forgotten_password.subtitle')}</p>
          <ForgottenPassword />
        </Box>
      </div>
    </div>
  );
};
export default ForgottenPasswordPage;
