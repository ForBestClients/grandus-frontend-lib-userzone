"use client"
import styles from './WishlistContent.module.scss';
import Listing from './Listing';
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs';
import upperFirst from "lodash/upperFirst";
import {useTranslation} from "@/app/i18n/client";

const WishlistContent = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wishlist}>
            <div className='container'>
                <Breadcrumbs current={upperFirst(t('wishlist.title'))} />
                <h1 className="mt-8 mb-4">{upperFirst(t('wishlist.title'))}</h1>
                <Listing />
            </div>
        </div>
    );
};
export default WishlistContent;
