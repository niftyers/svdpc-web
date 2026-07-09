import MetaConfig from "@/meta.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Login - ${MetaConfig.title}`,
  description: MetaConfig.description,
}

const PageLogin = () => {
  return <div>Login</div>
}

export default PageLogin
