"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const pathname = usePathname();

  const toggleMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const menuData = [
    {
      label: "Home",
      icon: "ti-home side-menu__icon",
      link: "/dashboard",
    },
    {
      label: "Categories",
      icon: "ti ti-users",
      link: "/categories",
    },

    {
      label: "Services",
      icon: "ti ti-users",
      link: "/service",
    },
  ];

  return (
    <aside className="app-sidebar sticky" id="sidebar">
      <div className="main-sidebar" id="sidebar-scroll">
        <nav className="main-menu-container nav nav-pills flex-column sub-open">
          <ul className="main-menu">
            {menuData.map((menu, index) => (
              <li
                key={index}
                className={`slide ${
                  pathname.startsWith(menu.link) ? "active" : ""
                }`}
                onClick={() => toggleMenu(index)}
              >
                <Link
                  href={menu?.link}
                  className={`side-menu__item ${
                    pathname.startsWith(menu.link) ? "active" : ""
                  }`}
                >
                  <i className={`${menu.icon} side-menu__icon`}></i>
                  <span className="side-menu__label">{menu.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
