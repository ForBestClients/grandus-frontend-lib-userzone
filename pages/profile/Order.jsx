import OrderDetail from "@/components/pages/profile/order/detail/Order";
import {Suspense} from "react";

const Order = ({ params }) => {
    return (
        <Suspense>
            <OrderDetail orderId={params.id} />
        </Suspense>
    )
};

export default Order;
