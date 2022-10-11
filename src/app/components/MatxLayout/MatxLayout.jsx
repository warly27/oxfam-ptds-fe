// import useSettings from "app/hooks/useSettings";
import { MatxLayouts } from "./index";

const MatxLayout = (props) => {
  // const { settings } = useSettings();
  const Layout = MatxLayouts["layout1"];

  return <Layout {...props} />;
};

export default MatxLayout;
