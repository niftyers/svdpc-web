import MetaConfig from "@/meta.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Dashboard - ${MetaConfig.title}`,
  description: MetaConfig.description,
}

const PageDashboard = () => {
  return <div>Dashboard</div>
}

export default PageDashboard
