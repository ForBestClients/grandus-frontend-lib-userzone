import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

import styles from "./ProfileHeader.module.scss";

const ProfileHeader = ({ breadcrumbs, title, extra }) => {
    return (
        <>
            <Breadcrumbs data={breadcrumbs} current={breadcrumbs?.current} />
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                {extra}
            </div>
        </>
    );
};

export default ProfileHeader;
