import AboutDetail from "../components/AboutDetail";
import { getLandingPageSettings } from "../lib/api";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const cmsData = await getLandingPageSettings();
  return <AboutDetail cmsData={cmsData} />;
}