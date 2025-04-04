"use client"

import {usePathname} from "next/navigation";
import useUser from "@/grandus-lib/hooks/useUser";

import get from "lodash/get";

import Link from "next/link";

import Box from "@/components/_other/box/Box";
import UserSettingsIcon from "@/components/_other/icons/UserSettingsIcon";
import OrdersIcon from "@/components/_other/icons/OrdersIcon";
import LogoutIcon from "@/components/_other/icons/LogoutIcon";

import styles from "./UserMenu.module.scss";
import {startsWith} from "lodash";
import HeartIcon from "@/components/_other/icons/HeartIcon";
import Divider from "@/components/_other/divider/Divider";
import {CompareIcon} from "@/components/_other/icons/CompareIcon";
import {useTranslation} from "@/app/i18n/client";

const UserMenu = () => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <ul className={styles?.menu}>
            <li className={pathname === "/profil" ? styles.active : ""}>
                <Link href="/profil">
                    <UserSettingsIcon className={styles?.icon}/>
                    {t('profile.menu.profile_settings')}
                </Link>
            </li>
            <li className={startsWith(pathname, "/profil/objednavky") ? styles.active : ""}>
                <Link href="/profil/objednavky">
                    <OrdersIcon className={styles?.icon}/>
                    {t('profile.menu.orders')}
                </Link>
            </li>
            <li>
                <Divider/>
            </li>
            <li>
                <Link href="/oblubene">
                    <HeartIcon className={styles?.icon}/>
                    {t('profile.menu.wishlist')}
                </Link>
            </li>
            <li>
                <Link href="/porovnanie">
                    <CompareIcon className={styles?.icon}/>
                    {t('profile.menu.compare')}
                </Link>
            </li>
            <li>
                <Divider/>
            </li>
            <li>
                <Link href="/odhlasenie" className={styles?.danger}>
                    <LogoutIcon className={styles?.icon}/>
                    {t('profile.menu.logout')}
                </Link>
            </li>

            <li className={styles.creditsBlock}>
                <h4>
                    {t('profile.credits.title')}
                </h4>
                <Box>
                    <div className={styles.creditsTitle}> {t('profile.credits.state')}:</div>
                    <div>
                        {`${get(user, "credit", 0)} ${t('profile.credits.credits')}`}
                    </div>
                </Box>
            </li>
        </ul>
    )
}

export default UserMenu;
