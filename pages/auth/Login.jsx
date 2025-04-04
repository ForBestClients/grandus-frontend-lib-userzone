import { Suspense } from "react";
import { getMetaData } from "@/grandus-lib/utils/meta";
import RegistrationForm from '@/components/forms/registration/RegistrationForm';
import Box from '@/components/_other/box/Box';
import LoginForm from '@/components/forms/login/LoginForm';

export const generateMetadata = async (props) => {
  return getMetaData(
    `Prihlásenie`,
    "",
    "",
    {},
    {
      viewport: { disable: true },
    }
  );
};

const Login = ({ params }) => {
  return (
    <section className="bg-white text-base">
    <div className={"container py-12"}>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch justify-center'}>
        <div className={'flex justify-center w-full'}>
          <Box className="max-w-screen-xs w-full">
            <Suspense fallback={''}>
              <LoginForm title={'Prihlásenie'} redirectToProfile/>
            </Suspense>
          </Box>
        </div>
      <Box>
      <Suspense fallback={""}>
          <RegistrationForm title={"Registrácia"}/>
      </Suspense>
      </Box>
    </div>
    </div>
    </section>
  );
};

export default Login;
