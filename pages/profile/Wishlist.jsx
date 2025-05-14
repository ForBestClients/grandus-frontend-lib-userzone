import {Suspense} from "react";
import WishlistContent from "../../components/profile/wishlist/WishlistContent";
import SEO from '@/utils/seo';
import { initTranslations } from '@/app/i18n';

export const generateMetadata = async ({ params }) => {
  const { t } = await initTranslations(params?.locale);

  return SEO.getDefaultMetaObject(t('wishlist_page.title'), '');
};

const Wishlist = () => {
  return (
      <Suspense>
            <WishlistContent />
      </Suspense>
  );
};
export default Wishlist;