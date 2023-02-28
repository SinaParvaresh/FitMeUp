import { Outlet } from "react-router";
import FooterLinks from "./Footer/FooterLinks";
import { HeaderMegaMenu } from "./Header/HeaderMegaMenu";

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
