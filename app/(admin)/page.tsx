import { Metadata } from "next";

import MetaConfig from "@/meta.json";

export const metadata: Metadata = {
  title: `Dashboard - ${MetaConfig.title}`,
  description: MetaConfig.description,
};

const PageDashboard = () => {
  return <div>Dashboard</div>;
};

export default PageDashboard;
