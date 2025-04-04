import {Suspense} from "react";
import first from "lodash/first";
import getStaticBlocks from "@/grandus-utils/fetches/ssr/StaticBlocks";
import Orders from "@/components/pages/profile/order/listing/Orders";

const Page = async () => {
    const { data: staticBlocks } = await getStaticBlocks({hash: "ucet_objednavka"})
    const orderBlock = first(staticBlocks)

    return (
      <Suspense>
        <Orders staticBlock={orderBlock} />
      </Suspense>
    );
};

export default Page;
