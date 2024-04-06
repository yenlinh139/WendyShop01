import { memo, useState } from "react";
import Header from "../Header";
import Menu from "../MenuLeft";
import "./style.scss";

const MasterLayout = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div {...props}>
      <Header />
      <Menu />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default memo(MasterLayout);
