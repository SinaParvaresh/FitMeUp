import { Outlet } from "react-router";
import FooterLinks from "./Footer/FooterLinks";
import { HeaderMegaMenu } from "./HeaderMegaMenu";

const Layout = () => {
  return (
    <>
      <HeaderMegaMenu />
      <Outlet />
      <FooterLinks />
    </>
  );
};

export default Layout;
