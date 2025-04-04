import UserPage from '@/modules/userzone/components/profile/UserPage';
import getCountries from "@/grandus-utils/fetches/ssr/Countries";
import getTowns from "@/grandus-utils/fetches/ssr/Towns";

const Page = async ()=> {
  const [countries, towns] = await Promise.all([
    getCountries(),
    getTowns(),
  ]);

  return(
    <UserPage towns={towns} countries={countries} />
  )
}
export default Page;
