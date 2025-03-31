"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (!authToken) {
      router.push("/");
    }
  }, [authToken, router]);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };
  return (
    <header className="app-header">
      <div className="main-header-container container-fluid"  >
        {/* <div className="header-content-left"><h4> {userData.user.assessor_company_name ? userData.user.assessor_company_name : ""} </h4></div> */}
        {/* commenting this start as per figma */}
        {/* <div className="header-content-left">
          <div className="header-element">
            <div className="horizontal-logo">
              <a href="index.html" className="header-logo">
                <img
                  src="/images/brand-logos/desktop-logo.png"
                  alt="logo"
                  className="desktop-logo"
                />
                <img
                  src="/images/brand-logos/toggle-logo.png"
                  alt="logo"
                  className="toggle-logo"
                />
                <img
                  src="/images/brand-logos/desktop-dark.png"
                  alt="logo"
                  className="desktop-dark"
                />
                <img
                  src="/images/brand-logos/toggle-dark.png"
                  alt="logo"
                  className="toggle-dark"
                />
                <img
                  src="/images/brand-logos/desktop-white.png"
                  alt="logo"
                  className="desktop-white"
                />
                <img
                  src="/images/brand-logos/toggle-white.png"
                  alt="logo"
                  className="toggle-white"
                />
              </a>
            </div>
          </div>

          <div className="header-element">
            <a
              aria-label="Hide Sidebar"
              className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
              data-bs-toggle="sidebar"
              href="javascript:void(0);"
            >
              <span></span>
            </a>
          </div>

          <div className="main-header-center d-none d-lg-block header-link">
            <div className="input-group"> */}
              {/* <div className="input-group-btn search-panel">
                <select
                  className="js-example-basic-single"
                  name="state"
                  data-trigger
                >
                  <option value="s-1">Choose one</option>
                  <option value="s-2">T-Projects...</option>
                  <option value="s-3">Microsoft Project</option>
                  <option value="s-4">Risk Management</option>
                  <option value="s-5">Team Building</option>
                </select>
              </div> */}
              {/* <input
                type="text"
                className="form-control"
                id="typehead"
                placeholder="Search for results..."
                autoComplete="off"
              />
              <button className="btn btn-primary">
                <i className="fe fe-search" aria-hidden="true"></i>
              </button>
            </div>
            <div id="headersearch" className="header-search">
              <div className="p-3">
                <div className="">
                  <p className="fw-semibold text-muted mb-2 fs-13">
                    Recent Searches
                  </p>
                  <div className="ps-2">
                    <a href="javascript:void(0)" className="search-tags">
                      <i className="fe fe-search me-2"></i>People<span></span>
                    </a>
                    <a href="javascript:void(0)" className="search-tags">
                      <i className="fe fe-search me-2"></i>Pages<span></span>
                    </a>
                    <a href="javascript:void(0)" className="search-tags">
                      <i className="fe fe-search me-2"></i>Articles<span></span>
                    </a>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="fw-semibold text-muted mb-2 fs-13">
                    Apps and pages
                  </p>
                  <ul className="ps-2 list-unstyled">
                    <li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
                      <a href="full-calendar.html">
                        <span>
                          <i className="bx bx-calendar me-2 fs-14 bg-primary-transparent p-2 rounded-circle "></i>
                          Calendar
                        </span>
                      </a>
                    </li>
                    <li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
                      <a href="mail-inbox.html">
                        <span>
                          <i className="bx bx-envelope me-2 fs-14 bg-primary-transparent p-2 rounded-circle"></i>
                          Mail
                        </span>
                      </a>
                    </li>
                    <li className="p-1 d-flex align-items-center text-muted mb-2 search-app">
                      <a href="buttons.html">
                        <span>
                          <i className="bx bx-dice-1 me-2 fs-14 bg-primary-transparent p-2 rounded-circle "></i>
                          Buttons
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="fw-semibold text-muted mb-2 fs-13">Links</p>
                  <ul className="ps-2 list-unstyled">
                    <li className="p-1 align-items-center text-muted mb-1 search-app">
                      <a href="javascript:void(0)" className="text-primary">
                        <u>http://spruko/html/spruko.com</u>
                      </a>
                    </li>
                    <li className="p-1 align-items-center text-muted mb-1 search-app">
                      <a href="javascript:void(0)" className="text-primary">
                        <u>http://spruko/demo/spruko.com</u>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="py-3 border-top px-0">
                <div className="text-center">
                  <a
                    href="javascript:void(0)"
                    className="text-primary text-decoration-underline fs-15"
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}

         {/* commenting this end as per figma */}

        <div className="header-content-right">
          {/* <div className="header-element header-theme-mode">
            <a
              href="javascript:void(0);"
              className="header-link layout-setting"
            >
              <span className="light-layout">
                <i className="fe fe-moon header-link-icon lh-2"></i>
              </span>
              <span className="dark-layout">
                <i className="fe fe-sun header-link-icon lh-2"></i>
              </span>
            </a>
          </div> */}

          {/* <div className="header-element country-selector">
            <a
              href="javascript:void(0);"
              className="header-link dropdown-toggle country-Flag"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <circle cx="256" cy="256" r="256" fill="#f0f0f0" />
                  <g fill="#0052b4">
                    <path d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zM503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zM189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zM322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zM370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z" />
                  </g>
                  <g fill="#d80027">
                    <path d="M509.833 222.609H289.392V2.167A258.556 258.556 0 00256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 000 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0066.783 0V289.392h220.442A258.533 258.533 0 00512 256c0-11.317-.744-22.461-2.167-33.391z" />
                    <path d="M322.783 322.784L437.019 437.02a256.636 256.636 0 0015.048-16.435l-97.802-97.802h-31.482v.001zM189.217 322.784h-.002L74.98 437.019a256.636 256.636 0 0016.435 15.048l97.802-97.804v-31.479zM189.217 189.219v-.002L74.981 74.98a256.636 256.636 0 00-15.048 16.435l97.803 97.803h31.481zM322.783 189.219L437.02 74.981a256.328 256.328 0 00-16.435-15.047l-97.802 97.803v31.482z" />
                  </g>
                </svg>
              </span>
            </a>
            <ul
              className="main-header-dropdown dropdown-menu dropdown-menu-end"
              data-popper-placement="none"
            >
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <span className="avatar avatar-xs lh-1 me-2">
                    <img src="/images/flags/6.jpg" alt="img" />
                  </span>
                  English
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <span className="avatar avatar-xs lh-1 me-2">
                    <img src="/images/flags/5.jpg" alt="img" />
                  </span>
                  Spanish
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <span className="avatar avatar-xs lh-1 me-2">
                    <img src="/images/flags/1.jpg" alt="img" />
                  </span>
                  French
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <span className="avatar avatar-xs lh-1 me-2">
                    <img src="/images/flags/2.jpg" alt="img" />
                  </span>
                  German
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <span className="avatar avatar-xs lh-1 me-2">
                    <img src="/images/flags/3.jpg" alt="img" />
                  </span>
                  Italian
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <span className="avatar avatar-xs lh-1 me-2">
                    <img src="/images/flags/4.jpg" alt="img" />
                  </span>
                  Russian
                </a>
              </li>
            </ul>
          </div> */}

          {/* <div className="header-element header-fullscreen d-xl-flex d-none">
            <a
              onClick="openFullscreen();"
              href="javascript:void(0);"
              className="header-link"
            >
              <i className="fe fe-maximize full-screen-open header-link-icon"></i>
              <i className="fe fe-minimize full-screen-close header-link-icon d-none"></i>
            </a>
          </div> */}

          {/* <div className="header-element cart-dropdown d-xl-flex d-none">
            <a
              href="javascript:void(0);"
              className="header-link dropdown-toggle"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
            >
              <i className="fe fe-shopping-cart header-link-icon"></i>
              <span
                className="badge bg-primary header-icon-badge"
                id="cart-icon-badge"
              >
                5
              </span>
            </a>
            <div
              className="main-header-dropdown dropdown-menu dropdown-menu-end"
              data-popper-placement="none"
            >
              <div className="p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 fs-17 fw-semibold">Cart Items</p>
                  <span
                    className="badge bg-primary rounded-pill"
                    id="cart-data"
                  >
                    5 Items
                  </span>
                </div>
              </div>
              <div>
                <hr className="dropdown-divider" />
              </div>
              <ul className="list-unstyled mb-0" id="header-cart-items-scroll">
                <li className="dropdown-item">
                  <div className="d-flex align-items-center cart-dropdown-item">
                    <img
                      src="/images/ecommerce/jpg/1.jpg"
                      alt="img"
                      className="avatar avatar-sm br-5 me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start justify-content-between mb-0">
                        <div className="mb-0 fs-13 text-dark fw-medium">
                          <a href="ecommerce-cart.html" className="text-dark">
                            Smart Watch
                          </a>
                        </div>
                        <div>
                          <span className="text-black mb-1 fw-medium">
                            $1,299.00
                          </span>
                        </div>
                      </div>
                      <div className="min-w-fit-content d-flex align-items-start justify-content-between">
                        <ul className="header-product-item d-flex">
                          <li>Qty: 1</li>
                          <li>
                            Status:
                            <span className="text-success">In Stock</span>
                          </li>
                        </ul>
                        <div className="ms-auto">
                          <a
                            href="javascript:void(0);"
                            className="header-cart-remove float-end dropdown-item-close"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-center cart-dropdown-item">
                    <img
                      src="/images/ecommerce/jpg/3.jpg"
                      alt="img"
                      className="avatar avatar-sm br-5 me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start justify-content-between mb-0">
                        <div className="mb-0 fs-13 text-dark fw-medium">
                          <a href="ecommerce-cart.html" className="text-dark">
                            Flowers
                          </a>
                        </div>
                        <div>
                          <span className="text-black mb-1 fw-medium">
                            $179.29
                          </span>
                        </div>
                      </div>
                      <div className="min-w-fit-content d-flex align-items-start justify-content-between">
                        <ul className="header-product-item">
                          <li>Qty: 2</li>
                          <li>
                            <span className="badge bg-pink-transparent fs-10">
                              Free shipping
                            </span>
                          </li>
                        </ul>
                        <div className="ms-auto">
                          <a
                            href="javascript:void(0);"
                            className="header-cart-remove float-end dropdown-item-close"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-center cart-dropdown-item">
                    <img
                      src="/images/ecommerce/jpg/5.jpg"
                      alt="img"
                      className="avatar avatar-sm br-5 me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start justify-content-between mb-0">
                        <div className="mb-0 fs-13 text-dark fw-medium">
                          <a href="ecommerce-cart.html" className="text-dark">
                            Running Shoes
                          </a>
                        </div>
                        <div>
                          <span className="text-black mb-1 fw-medium">
                            $29.00
                          </span>
                        </div>
                      </div>
                      <div className="min-w-fit-content d-flex align-items-start justify-content-between">
                        <ul className="header-product-item d-flex">
                          <li>Qty: 4</li>
                          <li>
                            Status:
                            <span className="text-danger">Out Stock</span>
                          </li>
                        </ul>
                        <div className="ms-auto">
                          <a
                            href="javascript:void(0);"
                            className="header-cart-remove float-end dropdown-item-close"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-center cart-dropdown-item">
                    <img
                      src="/images/ecommerce/jpg/4.jpg"
                      alt="img"
                      className="avatar avatar-sm br-5 me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start justify-content-between mb-0">
                        <div className="mb-0 fs-13 text-dark fw-medium">
                          <a href="ecommerce-cart.html" className="text-dark">
                            Furniture
                          </a>
                        </div>
                        <div>
                          <span className="text-black mb-1 fw-medium">
                            $4,999.00
                          </span>
                        </div>
                      </div>
                      <div className="min-w-fit-content d-flex align-items-start justify-content-between">
                        <ul className="header-product-item d-flex">
                          <li>Gray</li> <li>50LB</li>
                        </ul>
                        <div className="ms-auto">
                          <a
                            href="javascript:void(0);"
                            className="header-cart-remove float-end dropdown-item-close"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-center cart-dropdown-item">
                    <img
                      src="/images/ecommerce/jpg/6.jpg"
                      alt="img"
                      className="avatar avatar-sm br-5 me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start justify-content-between mb-0">
                        <div className="mb-0 fs-13 text-dark fw-medium">
                          <a href="ecommerce-cart.html" className="text-dark">
                            Tourist Bag
                          </a>
                        </div>
                        <div>
                          <span className="text-black mb-1 fw-medium">
                            $129.00
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-start justify-content-between">
                        <ul className="header-product-item d-flex">
                          <li>Qty: 1</li>
                          <li>
                            Status:
                            <span className="text-success">In Stock</span>
                          </li>
                        </ul>
                        <div className="ms-auto">
                          <a
                            href="javascript:void(0);"
                            className="header-cart-remove float-end dropdown-item-close"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="p-3 empty-header-item border-top">
                <div className="d-grid">
                  <a href="ecommerce-checkout.html" className="btn btn-primary">
                    Proceed to checkout
                  </a>
                </div>
              </div>
              <div className="p-5 empty-item d-none">
                <div className="text-center">
                  <span className="avatar avatar-xl avatar-rounded bg-warning-transparent">
                    <i className="ri-shopping-cart-2-line fs-2"></i>
                  </span>
                  <h6 className="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
                  <span className="mb-3 fw-normal fs-13 d-block">
                    Add some items to make me happy :)
                  </span>
                  <a
                    href="ecommerce-products.html"
                    className="btn btn-primary btn-wave btn-sm m-1"
                    data-abc="true"
                  >
                    continue shopping <i className="bi bi-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div> */}

          <div className="header-element notifications-dropdown">
            <a
              href="javascript:void(0);"
              className="header-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              id="messageDropdown"
              aria-expanded="false"
            >
              <i className="fe fe-bell header-link-icon"></i>
              <span
                className="badge bg-secondary header-icon-badge pulse pulse-secondary"
                id="notification-icon-badge"
              >
                5
              </span>
            </a>
            <div
              className="main-header-dropdown dropdown-menu dropdown-menu-end"
              data-popper-placement="none"
            >
              <div className="p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 fs-17 fw-semibold">Notifications</p>
                  <span
                    className="badge bg-secondary rounded-pill"
                    id="notifiation-data"
                  >
                    5 Unread
                  </span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <ul
                className="list-unstyled mb-0"
                id="header-notification-scroll"
              >
                <li className="dropdown-item">
                  <div className="d-flex align-items-start">
                    <div className="pe-2">
                      <span className="avatar avatar-md online bg-primary-transparent br-5">
                        <img alt="avatar" src="/images/faces/5.jpg" />
                      </span>
                    </div>
                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0">
                          <a
                            href="notifications-list.html"
                            className="text-dark"
                          >
                            Congratulate <strong>Olivia James</strong> for New
                            template start
                          </a>
                        </p>
                        <span className="text-muted fw-normal fs-12 header-notification-text">
                          Oct 15 12:32pm
                        </span>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0);"
                          className="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        >
                          <i className="ti ti-x fs-16"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-start">
                    <div className="pe-2">
                      <span className="avatar avatar-md offline bg-secondary-transparent br-5">
                        <img alt="avatar" src="/images/faces/2.jpg" />
                      </span>
                    </div>
                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0">
                          <a
                            href="notifications-list.html"
                            className="text-dark"
                          >
                            <strong>Joshua Gray</strong> New Message Received
                          </a>
                        </p>
                        <span className="text-muted fw-normal fs-12 header-notification-text">
                          Oct 13 02:56am
                        </span>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0);"
                          className="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        >
                          <i className="ti ti-x fs-16"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-start">
                    <div className="pe-2">
                      <span className="avatar avatar-md online bg-pink-transparent br-5">
                        <img alt="avatar" src="/images/faces/3.jpg" />
                      </span>
                    </div>
                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0">
                          <a
                            href="notifications-list.html"
                            className="text-dark"
                          >
                            <strong>Elizabeth Lewis</strong> added new schedule
                            realease
                          </a>
                        </p>
                        <span className="text-muted fw-normal fs-12 header-notification-text">
                          Oct 12 10:40pm
                        </span>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0);"
                          className="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        >
                          <i className="ti ti-x fs-16"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-start">
                    <div className="pe-2">
                      <span className="avatar avatar-md online bg-warning-transparent br-5">
                        <img alt="avatar" src="/images/faces/5.jpg" />
                      </span>
                    </div>
                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0 fw-normal">
                          <a
                            href="notifications-list.html"
                            className="text-dark"
                          >
                            Delivered Successful to <strong>Micky</strong>
                          </a>
                        </p>
                        <span className="text-muted fw-normal fs-12 header-notification-text">
                          Order
                          <span className="text-warning">ID: #005428</span> had
                          been placed
                        </span>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0);"
                          className="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        >
                          <i className="ti ti-x fs-16"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown-item">
                  <div className="d-flex align-items-start">
                    <div className="pe-2">
                      <span className="avatar avatar-md offline bg-success-transparent br-5">
                        <img alt="avatar" src="/images/faces/1.jpg" />
                      </span>
                    </div>
                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0 fw-normal">
                          <a
                            href="notifications-list.html"
                            className="text-dark"
                          >
                            You got 22 requests form <strong>Facebook</strong>
                          </a>
                        </p>
                        <span className="text-muted fw-normal fs-12 header-notification-text">
                          Today at 08:08pm
                        </span>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0);"
                          className="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        >
                          <i className="ti ti-x fs-16"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="p-3 empty-header-item1 border-top">
                <div className="d-grid">
                  <a href="notifications-list.html" className="btn btn-primary">
                    View All
                  </a>
                </div>
              </div>
              <div className="p-5 empty-item1 d-none">
                <div className="text-center">
                  <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                    <i className="ri-notification-off-line fs-2"></i>
                  </span>
                  <h6 className="fw-semibold mt-3">No New Notifications</h6>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="header-element header-shortcuts-dropdown d-xl-flex d-none">
            <a
              href="javascript:void(0);"
              className="header-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              id="notificationDropdown"
              aria-expanded="false"
            >
              <i className="fe fe-grid header-link-icon"></i>
            </a>
            <div
              className="main-header-dropdown header-shortcuts-dropdown dropdown-menu pb-0 dropdown-menu-end"
              aria-labelledby="notificationDropdown"
            >
              <div className="p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 fs-17 fw-semibold">Related Apps</p>
                </div>
              </div>
              <div className="dropdown-divider mb-0"></div>
              <div
                className="main-header-shortcuts p-2"
                id="header-shortcut-scroll"
              >
                <div className="row g-2">
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/figma.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Figma</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img
                            src="/images/apps/microsoft-powerpoint.png"
                            alt=""
                          />
                        </span>
                        <span className="d-block fs-12">Power Point</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/microsoft-word.png" alt="" />
                        </span>
                        <span className="d-block fs-12">MS Word</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/calender.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Calendar</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/sketch.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Sketch</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/google-docs.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Docs</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/google.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Google</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/translate.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Translate</span>
                      </div>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="javascript:void(0);" className="text-dark">
                      <div className="text-center p-3 related-app">
                        <span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
                          <img src="/images/apps/google-sheets.png" alt="" />
                        </span>
                        <span className="d-block fs-12">Sheets</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-3 border-top">
                <div className="d-grid">
                  <a href="javascript:void(0);" className="btn btn-primary">
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div> */}

          <div className="header-element">
            <a
              href="javascript:void(0);"
              className="header-link dropdown-toggle"
              id="mainHeaderProfile"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded={isOpen}
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                toggleDropdown();
              }}
            >

              
              <div className="d-flex align-items-center">
                <div className="header-link-icon">
                  {userData?.user?.image ? <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${userData?.user?.image}`}
                    alt="img"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  /> : <i className="bi bi-person fs-4"/>}
                </div>
                <div className="d-none">
                  <p className="fw-semibold mb-0">Angelica</p>
                  <span className="op-7 fw-normal d-block fs-11">
                    Web Designer
                  </span>
                </div>
              </div>
            </a>
            <ul
              className={`main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end ${
                isOpen ? "show" : ""
              }`}
              style={
                isOpen
                  ? {
                      display: "block",
                      position: "absolute",
                      inset: "0px 0px auto auto",
                      margin: "0px",
                      transform: "translate(0px, 65px)",
                    }
                  : {}
              }
              aria-labelledby="mainHeaderProfile"
            >
              <li>
                <div className="header-navheading border-bottom">
                  <h6 className="main-notification-title">{`${userData?.user?.first_name + " "+(userData?.user?.last_name ? userData.user.last_name : "" )}`}</h6>
                </div>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex border-bottom"
                  href="/dashboard/profile"
                >
                  <i className="fe fe-user fs-16 align-middle me-2"></i>Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex border-bottom"
                  href="mail-inbox.html"
                >
                  <i className="fe fe-inbox fs-16 align-middle me-2"></i>Inbox
                  <span className="badge bg-success ms-auto">25</span>
                </a>
              </li>

              <li>
                <a
                  className="dropdown-item d-flex border-bottom"
                  href="settings.html"
                >
                  <i className="fe fe-settings fs-16 align-middle me-2"></i>
                  Settings
                </a>
              </li>

              <li>
                <div
                  className="dropdown-item d-flex"
                  onClick={() => handleLogout()}
                >
                  <i className="fe fe-power fs-16 align-middle me-2"></i>Log Out
                </div>
              </li>
            </ul>
          </div>

          {/* <div className="header-element right-sidebar d-xl-flex d-none">
            <a
              href="javascript:void(0);"
              className="header-link right-sidebar"
              data-bs-toggle="offcanvas"
              data-bs-target="#right-sidebar-canvas"
            >
              <i className="fe fe-align-right header-icons header-link-icon"></i>
            </a>
          </div> */}

          {/* <div className="header-element">
            <a
              href="javascript:void(0);"
              className="header-link switcher-icon"
              data-bs-toggle="offcanvas"
              data-bs-target="#switcher-canvas"
            >
              <i className="fe fe-settings header-link-icon"></i>
            </a>
          </div> */}
        </div>
      </div>
    </header>
  );
}
