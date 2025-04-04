"use client"
import get from "lodash/get";
import useSWR from "swr";

import Link from "next/link";

import Table from "components/_other/table/Table";
import ProfileHeader from "@/components/pages/profile/header/ProfileHeader";

import {useSearchParams} from "next/navigation";

import styles from "./Orders.module.scss";
import TableSkeleton from "@/components/pages/profile/skeletons/TableSkeleton";
import EmptyComponent from "@/components/_other/emptyComponent/EmptyComponent";
import upperFirst from "lodash/upperFirst";
import {useTranslation} from "@/app/i18n/client";

const Orders = ({ staticBlock }) => {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const page = searchParams.get('page');

    const { data, isValidating } = useSWR(
        `/api/lib/v1/b2b/orders?page=${page}`,
        url => fetch(url).then(r => r.json()),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const isLoading = !data && isValidating;
    const emptyData = !data && !isValidating

    if (emptyData) {
       return  <EmptyComponent
            title={upperFirst(t('profile.order.listing.empty.title'))}
            normalText={upperFirst(t('profile.order.listing.empty.subtitle'))}
        />
    }

    const columns = [
        {
            title: "Číslo objednávky",
            fixed: "left",
            render: (item) => {
                return (
                    <>
                        <div>
                            <b>
                                <Link
                                    href="/profil/objednavky/[id]"
                                    as={`/profil/objednavky/${item.id}`}
                                >
                                    {get(item, "orderNumber")}
                                </Link>
                            </b>
                        </div>
                        <small>{get(item, "meta.label")}</small>
                    </>
                )
            }
        },
        {
            title: "ID",
            render: (item) => {
                return (
                    <>
                        <b>{get(item, "id")}</b>
                        {get(item, "createType.name") ? (
                            <small>vytvorené: {get(item, "createType.name")}</small>
                        ) : null}
                    </>
                );
            },
        },
        {
            title: "Stav",
            dataIndex: "label",
            render: ({ label }) => {
                if (!label) {
                    return "";
                }
                return <div className={`${styles.normalFont}`}> {label} </div>
            },
        },
        {
            title: "Dátum vytvorenia",
            dataIndex: "createTime",
            render: (date) => {
                if (!date) {
                    return "";
                }
                return <div  className={`${styles.normalFont}`}> {date} </div>
            },
        },
        {
            title: "Cena",
            align: "right",
            render: (item) => {
                if (!get(item, "price")) {
                    return "---";
                }
                const price= get(item, "price")
                const priceNoVat = get(item, "priceWithoutVat")
                return (
                    <div className={"flex flex-col"}>
                        <b className="whitespace-nowrap">{`${price} €`}</b>
                        <small className="whitespace-nowrap">{`${priceNoVat} €`}</small>
                    </div>
                )
            },
        },
        {
            title: "Náhľad",
            ellipsis: {
                showTitle: false,
            },
            align: "right",
            render: (item) => {
                return (
                    <div className={styles?.buttons}>
                        <Link
                            href="/profil/objednavky/[id]"
                            as={`/profil/objednavky/${item.id}`}
                        >
                            Zobraziť
                        </Link>
                    </div>
                );
            },
        },
    ];

    const headerData = {
        title: "Objednávky",
    };



    return (
        <div className={styles?.listing}>
            <ProfileHeader
                {...headerData}
                breadcrumbs={{ current: "Objednávky" }}
            />
            <div className={"row g-4"}>
                {staticBlock ? (
                    <div className={"col-12 col-md-7"}>
                        <div className={styles.staticBlock}>
                            <h5>
                                {staticBlock.perex}
                            </h5>
                            <div className={styles.content}>
                                <div dangerouslySetInnerHTML={{__html: staticBlock.content}}/>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className={"my-5 overflow-auto"}>
                {isLoading
                    ?  <TableSkeleton withTitle={false} />
                    : <Table
                        loading={false}
                        pagination={true}
                        columns={columns}
                        dataSource={data}
                        scroll={{x: true}}
                        rowKey="id"
                    />
                }
            </div>
        </div>
    );
};

export default Orders;
