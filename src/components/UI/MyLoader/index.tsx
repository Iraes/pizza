import React, {FC} from "react"
import ContentLoader from "react-content-loader"

const MyLoader: FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="410" rx="10" ry="10" width="95" height="30" />
    <rect x="130" y="410" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default MyLoader

