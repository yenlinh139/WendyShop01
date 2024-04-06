import React, { memo, useState, useRef, useEffect } from "react";
import Header from "../Header";
import {
  AiFillDashboard,
  AiFillShop,
  AiFillFileZip,
  AiFillDatabase,
  AiOutlineLineChart,
} from "react-icons/ai";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import "./style.scss";

const MenuLeft = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [menus] = useState([
    {
      name: "Dashboard",
      icon: <AiFillDashboard className="icon" />,
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Cửa hàng",
      icon: <AiFillShop className="icon" />,
      path: ROUTERS.USER.STORE,
    },
    {
      name: "Dữ liệu",
      icon: <AiFillDatabase className="icon" />,
      path: ROUTERS.USER.DATA,
    },
    {
      name: "Thống kê",
      icon: <AiOutlineLineChart className="icon" />,
      path: "",
    },
    {
      name: "Profile",
      icon: <BsFillPeopleFill className="icon" />,
      path: ROUTERS.USER.PROFILE,
    },
    {
      name: "Activity Logs",
      icon: <AiFillFileZip className="icon" />,
      isShowSubmenu: false,
      child: [
        {
          name: "Hàng nhập",
          path: "",
        },
        {
          name: "Hàng tồn kho",
          path: "",
        },
        {
          name: "Đơn đặt hàng",
          path: "",
        },
        {
          name: "New Profile",
          path: "",
        },
        {
          name: "Update Profile",
          path: "",
        },
      ],
    },
    {
      name: "Users",
      icon: <BsFillPersonFill className="icon" />,
      path: "",
    },
  ]);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <Header openSidebar={openSidebar} />{" "}
      {/* Truyền hàm openSidebar từ Component B sang Component A */}
      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <aside>
          <h3 className="as-title">WendyShop</h3>
          <ul>
            {menus?.map((menu, menuKey) => (
              <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                <Link to={menu?.path}>
                  {" "}
                  {menu?.icon}
                  &nbsp; &nbsp;{menu?.name}
                </Link>
                {menu.child && (
                  <ul className="header-menu-dropdown">
                    {menu.child.map((childItem, childKey) => (
                      <li key={`${menuKey}-${childKey}`}>
                        <Link to={childItem?.path}>{childItem?.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default memo(MenuLeft);
