'use client';
import useWishlist from 'grandus-lib/hooks/v2/useWishlist';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import Card from "@/components/product/card/base/Card";
import ProductsLoading from "@/components/pages/category/products/ProductsLoading";
import CategoryGrid from "@/components/pages/category/components/CategoryGrid";
import EmptyComponent from "@/components/_other/emptyComponent/EmptyComponent";
import upperFirst from "lodash/upperFirst";
import {useTranslation} from "@/app/i18n/client";

const Listing = () => {
  const { products, isLoading: isLoadingWishlist } = useWishlist();
  const { t } = useTranslation();

  if (isEmpty(products) && !isLoadingWishlist) {
    return (
      <EmptyComponent title={upperFirst(t('wishlist.empty.title'))} normalText={t('wishlist.empty.subtitle')} />
    );
  }

  if (isLoadingWishlist) {
    return <ProductsLoading />;
  }

  return (
      <CategoryGrid>
          {map(products, product => <Card product={product} key={`wishlist-product-${product?.id}`} imageField={'small_image'} /> )}
      </CategoryGrid>
  );
};

export default Listing;
