"use client"
import UserForm from "@/modules/userzone/components/profile/profile/form/UserForm";
import useUser from "@/grandus-lib/hooks/useUser";
import ProfileHeader from "@/modules/userzone/components/profile/header/ProfileHeader";
import upperFirst from "lodash/upperFirst";
import {useTranslation} from "@/app/i18n/client";

const UserPage = ({ towns, countries }) => {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <main id={"user page"}>
      <ProfileHeader
        title={upperFirst(t('profile.form.title'))}
        breadcrumbs={{
            current: upperFirst(t('profile.form.user_profile')),
        }}
     />
      <UserForm user={user} towns={towns} countries={countries} />
    </main>
  );
};

export default UserPage;
