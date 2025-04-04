import {Suspense} from "react";
import WishlistContent from "../../components/profile/wishlist/WishlistContent";
import SEO from '@/utils/seo';

export const generateMetadata = async ({ params }) => {
  return SEO.getDefaultMetaObject('Obľúbené produkty', '');
};

const Wishlist = () => {
  return (
      <Suspense>
            <WishlistContent />
      </Suspense>
  );
};
export default Wishlist;