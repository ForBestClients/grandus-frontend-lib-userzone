"use client"

import {useState} from "react";
import useCart from "@/grandus-lib/hooks/useCart";
import styles from "./Order.module.scss";
import get from "lodash/get";
import round from "lodash/round";
import map from "lodash/map";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import CustomButton from "@/components/_other/button/CustomButton";
import Table from "@/components/_other/table/Table";
import LoadingIcon from "@/components/_other/icons/LoadingIcon";
import SyncIcon from "@/components/_other/icons/SyncIcon";
import Box from "@/components/_other/box/Box";
import Divider from "@/components/_other/divider/Divider";
import upperFirst from "lodash/upperFirst";
import ProfileHeader from "@/components/pages/profile/header/ProfileHeader";
import Link from "next/link";
import useSWR from "swr";
import TableSkeleton from "@/components/pages/profile/skeletons/TableSkeleton";
import EmptyComponent from "@/components/_other/emptyComponent/EmptyComponent";
import {useTranslation} from "@/app/i18n/client";

const OrderDetail = ({ orderId }) => {

    const [errors, setErrors] = useState([])
    const {isLoading: isCartLoading, itemsAdd} = useCart();
    const { t } = useTranslation();

    const { data: order, isValidating } = useSWR(
        `/api/lib/v1/b2b/orders/${orderId}`,
        url => fetch(url).then(r => r.json()),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const isLoading = !order && isValidating;
    const emptyData = !order && !isValidating;

    if (emptyData) {
        return <EmptyComponent
                title={upperFirst(t('profile.order.detail.empty.title'))}
                normalText={upperFirst(t('profile.order.detail.empty.subtitle', { orderId }))}
            />
    }

    const columns = [
        {
            title: upperFirst(t('profile.order.detail.product')),
            render: (item)=> (
                <>
                    {item.name}
                    <div className={styles.subtitle}>
                        {item.product?.subtitle}
                    </div>
                </>
            )
        },
        {
            title: upperFirst(t('profile.order.detail.amount')),
            align: "right",
            render: (item) => {
                return (
                    <>
                        {`${item?.orderCount??0} ${item?.product?.store?.[0]?.name??""}`}
                    </>
                );
            },
        },
        {
            title: upperFirst(t('profile.order.detail.unit_price')),
            align: "center",
            render: (item) => {
                if (!get(item, "basePriceWithFees")) {
                    return "---";
                }
                const price= get(item, "basePriceWithFees")
                return (
                    <>
                        {`${round(price, 2)} ${get(order, "origin.totalSumData.currencySymbol")}`}
                    </>
                )
            },
        },
        {
            title: upperFirst(t('profile.order.detail.price')),
            align: "right",
            render: (item) => {
                if (!get(item, "totalPriceWithFees")) {
                    return "---";
                }
                const price= get(item, "totalPriceWithFees")
                const priceNoVat = get(item, "totalPriceWithFeesWithoutVat")
                return (
                    <>
                        {`${round(price, 2)} ${get(order, "origin.totalSumData.currencySymbol")}`}
                        <div className={styles.subtitle}>
                            {`${round(priceNoVat, 2)} ${get(order, "origin.totalSumData.currencySymbol")}`}
                        </div>
                    </>
                )
            },
        },
    ];

    const products = map(filter(order?.orderItems, item=> item.product), item=> (
        {
            count: item.orderCount,
            sizeId: item?.product?.store?.[0]?.id,
            productId: item?.product?.id
        }
    ))


    const headerData = {
        title: `${get(order, "meta.label", "Objednávka")} ${get(
            order,
            "orderNumber",
            ""
        )}`,
        tags: get(order, "label") ? get(order, "label") : null,
        extra: [
            <CustomButton type={"light-primary"} size={"small"} key="1" loading={isLoading || isCartLoading} onClick={() => itemsAdd(products) }>
                <SyncIcon />
                <div className={"mx-2"}>{upperFirst(t('profile.order.detail.order_again'))}</div>
            </CustomButton>,
        ],
    };

    return (
        <>
            <ProfileHeader
                {...headerData}
                breadcrumbs={{
                    childrens: [
                        <Link key={1} href="/profil/objednavky">
                            {upperFirst(t('profile.order.listing.orders'))}
                        </Link>,
                    ],
                    current: `Objednávka ${get(order, "orderNumber", "")}`,
                  }}
            />

            {isLoading
                ? <TableSkeleton withTitle={false} />
                : <>
                    {!isEmpty(errors) ? (
                        <div className={styles?.errors + " col-12"}>Nepodarilo sa objednať znovu: {errors.join("\n")}</div>
                    ) : null}
                    <div className={styles?.detail}>
                        <div className={`${styles?.info} mb-5`}>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-start gap-3">
                                    <div className="d-flex gap-1">
                                        <strong>{t('profile.order.detail.id')}:</strong>
                                        {get(order, "id")}
                                    </div>
                                    <div className="d-flex gap-1">
                                        <strong>{upperFirst(t('profile.order.detail.status'))}:</strong>
                                        {get(order, "label")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box overflow-auto">
                            <Table columns={columns} dataSource={order?.orderItems} className={styles.dataTable}/>
                        </div>
                        <div className={`flex gap-6 py-5 ${styles?.infoBoxes}`}>
                            <div className="w-full md:w-1/2">
                                <h3>{upperFirst(t('profile.order.detail.invoice_address'))}</h3>
                                <Box>
                                    {order?.origin?.companyName ? (
                                        <>
                                            {order?.origin?.companyName}
                                            <br/>
                                        </>
                                    ) : null}
                                    {order?.origin?.ico ? (
                                        <>
                                            {`ICO: ${order?.origin?.ico}`}
                                            <br/>
                                        </>
                                    ) : null}
                                    {order?.origin?.dic ? <>{`DIC: ${order?.origin?.dic}`}ç</> : null}
                                    {order?.origin?.icDPH ? (
                                        <>
                                            {`IC DPH: ${order?.origin?.icDPH}`}
                                            <br/>
                                        </>
                                    ) : null}

                                    {`${order?.origin?.name} ${order?.origin?.surname}`}
                                    <br/>
                                    {order?.origin?.street}
                                    <br/>
                                    {`${order?.origin?.city} ${order?.origin?.zip}`}
                                    <br/>
                                    {order?.origin?.phone}
                                </Box>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h3>{upperFirst(t('profile.order.detail.delivery_address'))}</h3>
                                <Box>
                                    {`${order?.origin?.deliveryName} ${order?.origin?.deliverySurname}`}
                                    <br/>
                                    {order?.origin?.deliveryStreet}
                                    <br/>
                                    {`${order?.origin?.deliveryCity} ${order?.origin?.deliveryZip}`}
                                    <br/>
                                    {order?.origin?.deliveryPhone}
                                    <br/>
                                    {order?.origin?.deliveryEmail}
                                </Box>
                            </div>
                        </div>
                        <div className={`w-full ${styles?.infoBoxes}`}>
                            <h3>{upperFirst(t('profile.order.detail.information'))}</h3>
                            <Box>
                                <table className={styles?.infoTable}>
                                    <tbody>
                                    <tr>
                                        <td>{upperFirst(t('profile.order.detail.date'))}</td>
                                        <th>
                                            {get(order, "origin.createTime")}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>{upperFirst(t('profile.order.detail.delivery'))}</td>
                                        <th>
                                            {get(order, "origin.delivery")}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>{upperFirst(t('profile.order.detail.payment'))}</td>
                                        <th>
                                            {get(order, "origin.payment")}
                                        </th>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}><Divider className="my-2" /></td>
                                    </tr>
                                    <tr>
                                        <td>{upperFirst(t('profile.order.detail.delivery'))}</td>
                                        <th>
                                            {get(order, "origin.deliveryPriceData.priceFormatted")}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>{upperFirst(t('profile.order.detail.payment'))}</td>
                                        <th>
                                            {get(order, "origin.paymentPriceData.priceFormatted")}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><Divider className="my-2" /></td>
                                    </tr>
                                    <tr>
                                        <td>{t('profile.order.detail.VAT')}</td>
                                        <th>
                                            {get(order, "origin.totalSumData.vatFraction")} %
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>{upperFirst(t('profile.order.detail.sum_without_vat'))}</td>
                                        <th>
                                            {get(order, "origin.totalSumData.priceWithoutVatFormatted")}
                                        </th>
                                    </tr>
                                    <tr className={styles.total}>
                                        <td>{upperFirst(t('profile.order.detail.total_sum'))}</td>
                                        <th>{get(order, "origin.totalSumData.priceFormatted")}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </Box>
                        </div>
                    </div>
                    </>
            }
        </>
    );

}

export default OrderDetail;
