import get from "lodash/get";
import Link from "next/link";

import CustomButton from "@/components/_other/button/CustomButton";
import {redirect} from "next/navigation";


const LogoutPage = () => {
    redirect('/api/signout');

    const user = null;
    if (!user?.accessToken) {
        return (
        <div className="bg-white">
            <div className={"container flex flex-col items-center justify-center py-32"}>
                <h3>Boli ste úspešne odhlásený</h3>
                <div className="mt-16 flex gap-6">
                <CustomButton type="ghost" htmlType="a" key="signout-button-1" href="/prihlasenie" as={`/prihlasenie`}>
                    Prihlásenie
                </CustomButton>
                <CustomButton type="primary" htmlType="a" key="signout-button-2" href="/" as={`/`}>
                    Domovská stránka
                </CustomButton>
                </div>
            </div>
        </div>
        );
    }

    return (
        <div style={{ margin: "50px", textAlign: "center" }}>
            <p>
                Ste prihlásený ako <strong>{get(user, "email")}</strong>
            </p>
            <Link href="/odhlasenie">Odhlasit</Link>
        </div>
    );
};

export default LogoutPage;
