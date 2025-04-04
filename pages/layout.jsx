import {Suspense} from "react";
import UserMenu from "@/modules/userzone/components/profile/sidebar/menu/UserMenu";
import {AuthGuard} from "@/modules/userzone/components/auth/RedirectToLogin";

export default function RootLayout({children}) {
  return (
    <AuthGuard>
        <Suspense>
          <main className="bg-white py-4">
            <div className={"container"}>
              <div className="grid grid-cols-5 lg:grid-cols-6 gap-8 py-8">
                <div className="col col-span-full md:col-span-1 flex flex-col gap-6">
                  <UserMenu />
                </div>
                <div className="col col-span-full md:col-span-4 lg:col-span-5">
                  <Suspense>
                    {children}
                  </Suspense>
                </div>
              </div>
            </div>
          </main>
        </Suspense>
    </AuthGuard>
  );
}
