import React, { memo, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import "./style.scss";

const Header = ({ openSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Button clicked!");
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown((prevIsOpenDropdown) => !prevIsOpenDropdown);
  };

  const items = [
    { id: 1, name: "My account" },
    { id: 2, name: "Information" },
    { id: 3, name: "Log out" },
  ];

  return (
    <>
      <div className="header">
        <div className="row">
          <div className="col-8 ">
            <div className="header-left">
              <button className="sidebar-button" onClick={openSidebar}>
                <AiOutlineMenu />
              </button>
              Welcome to My Page
            </div>
          </div>
          <div className="col-4">
            <div className="header-right">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  onClick={toggleDropdown}
                >
                  admin &nbsp; <BsChevronDown />
                </button>
                <div
                  className={`dropdown-menu${isOpenDropdown ? " show" : ""}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  {items.map((item) => (
                    <a
                      key={item.id}
                      className="dropdown-item"
                      href="#"
                      onClick={toggleDropdown}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
