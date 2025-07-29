export default function Cart2() {
  return (
    <>
      <link rel="stylesheet" href="/homepage/css/style.css" />
      <link rel="stylesheet" href="/homepage/css/responsive.css" />
      <link rel="stylesheet" href="/homepage/css/font-awesome.min.css" />
      <link rel="stylesheet" href="/homepage/css/swiper-bundle.min.css" />
      <link rel="stylesheet" href="/homepage/css/select2.min.css" />
      <link rel="stylesheet" href="/homepage/css/flatpickr.min.css" />
      <link rel="stylesheet" href="/homepage/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/homepage/css/custom.css" />
      <link rel="stylesheet" href="/homepage/css/animate.css" />
      <link rel="stylesheet" href="/homepage/css/magnific-popup.css" />

      {/*----------- Header Section start ---------*/}
      <div className="ayur-menu-wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-4 col-sm-5 col-6">
              <div className="ayur-menu-logo">
                <a href="index.html">
                  <img src="assets/images/Logo.png" />
                </a>
              </div>
            </div>
            <div className="col-lg-10 col-md-8 col-sm-7 col-6">
              <div className="ayur-navmenu-wrapper">
                <div className="ayur-nav-menu">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="shop.html">Shop</a>
                    </li>
                    <li>
                      <a href="services.html">Services</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li className="ayur-has-menu">
                      <a href="javascript:void(0)">
                        Pages
                        <svg
                          version="1.1"
                          x={0}
                          y={0}
                          viewBox="0 0 491.996 491.996"
                          // style={{ enableBackground: "new 0 0 512 512" }}
                        >
                          <g>
                            <path
                              d="m484.132 124.986-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z"
                              opacity={1}
                            />
                          </g>
                        </svg>
                      </a>
                      <ul className="ayur-submenu">
                        <li>
                          <a href="blog-single.html">Blog Single</a>
                        </li>
                        <li>
                          <a href="shop-single.html">Shop Single</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="profile.html">Profile</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="ayur-nav-icons">
                  <div className="ayur-nav-like">
                    <a href="wishlist.html">
                      <span className="icon">
                        <svg
                          width={21}
                          height={17}
                          viewBox="0 0 21 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.6647 0C12.9947 0 11.5308 0.744645 10.4311 2.15348C10.2912 2.33306 10.16 2.51925 10.0379 2.7114C9.91579 2.51925 9.78456 2.33306 9.64463 2.15348C8.54497 0.744645 7.08101 0 5.41104 0C2.25633 0 0 2.64149 0 5.81114C0 9.43548 2.97046 12.8513 9.63153 16.8865C9.75642 16.9622 9.89715 17 10.0379 17C10.1786 17 10.3193 16.9622 10.4442 16.8866C17.1053 12.8513 20.0757 9.43552 20.0757 5.81118C20.0757 2.64318 17.8213 0 14.6647 0ZM16.4353 10.3241C15.0486 11.8714 12.953 13.5007 10.0379 15.2969C7.12277 13.5007 5.02717 11.8714 3.64041 10.3241C2.24617 8.7684 1.56842 7.2922 1.56842 5.81118C1.56842 3.52898 3.11072 1.56842 5.41104 1.56842C6.58249 1.56842 7.58134 2.07776 8.37986 3.08233C9.01836 3.88572 9.28738 4.71529 9.28927 4.72121C9.33905 4.88083 9.43853 5.02035 9.57321 5.11943C9.7079 5.2185 9.87072 5.27194 10.0379 5.27194C10.2051 5.27194 10.3679 5.2185 10.5026 5.11943C10.6373 5.02035 10.7368 4.88083 10.7866 4.72121C10.789 4.71329 11.05 3.90959 11.6675 3.11848C12.4703 2.08992 13.4787 1.56838 14.6647 1.56838C16.9675 1.56838 18.5073 3.53082 18.5073 5.81114C18.5073 7.29216 17.8296 8.76836 16.4353 10.3241Z"
                            fill="#222222"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                  <div className="ayur-nav-product">
                    <a href="cart.html">
                      <span className="icon">
                        <svg
                          width={16}
                          height={17}
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.91343 4.14634H2.81175C2.44474 4.14636 2.09137 4.28542 1.82279 4.53554C1.55421 4.78565 1.39037 5.12824 1.36426 5.49432L0.65358 15.4455C0.639403 15.6443 0.666313 15.8439 0.732633 16.0318C0.798954 16.2197 0.903263 16.3919 1.03906 16.5378C1.17486 16.6836 1.33924 16.7999 1.52195 16.8794C1.70466 16.9589 1.9018 17 2.10107 17H13.5881C13.7873 16.9999 13.9844 16.9587 14.1671 16.8792C14.3497 16.7996 14.514 16.6833 14.6498 16.5375C14.7856 16.3917 14.8899 16.2195 14.9563 16.0316C15.0226 15.8438 15.0496 15.6443 15.0356 15.4455L14.3249 5.49432C14.2988 5.12824 14.1349 4.78565 13.8664 4.53554C13.5978 4.28542 13.2444 4.14636 12.8774 4.14634H11.7836V3.93902C11.7836 2.89433 11.3686 1.89242 10.6299 1.15371C9.89118 0.415003 8.88927 0 7.84458 0C5.7486 0 3.81143 1.66932 3.90556 3.93902L3.91343 4.14634ZM11.7836 5.39024V8.5C11.7836 8.66495 11.7181 8.82315 11.6014 8.93979C11.4848 9.05642 11.3266 9.12195 11.1617 9.12195C10.9967 9.12195 10.8385 9.05642 10.7219 8.93979C10.6052 8.82315 10.5397 8.66495 10.5397 8.5V5.39024H5.14946V8.5C5.14946 8.66495 5.08393 8.82315 4.96729 8.93979C4.85065 9.05642 4.69246 9.12195 4.52751 9.12195C4.36255 9.12195 4.20436 9.05642 4.08772 8.93979C3.97108 8.82315 3.90556 8.66495 3.90556 8.5C3.90556 8.5 3.95946 7.04671 3.94163 5.39024H2.81175C2.7594 5.39032 2.70902 5.41019 2.67072 5.44588C2.63241 5.48156 2.60903 5.53042 2.60526 5.58263L1.89417 15.5339C1.89211 15.5623 1.89594 15.5908 1.90541 15.6177C1.91488 15.6446 1.92979 15.6692 1.94921 15.69C1.96862 15.7109 1.99213 15.7275 2.01825 15.7389C2.04438 15.7503 2.07257 15.7561 2.10107 15.7561H13.5881C13.6165 15.756 13.6447 15.7501 13.6708 15.7386C13.6968 15.7272 13.7203 15.7106 13.7397 15.6898C13.7591 15.669 13.774 15.6444 13.7835 15.6176C13.793 15.5907 13.7969 15.5622 13.795 15.5339L13.0839 5.58263C13.0801 5.53042 13.0567 5.48156 13.0184 5.44588C12.9801 5.41019 12.9298 5.39032 12.8774 5.39024H11.7836ZM10.5397 4.14634V3.93902C10.5397 3.22423 10.2558 2.53872 9.75032 2.03329C9.24489 1.52785 8.55937 1.2439 7.84458 1.2439C7.12979 1.2439 6.44427 1.52785 5.93884 2.03329C5.43341 2.53872 5.14946 3.22423 5.14946 3.93902V4.14634H10.5397Z"
                            fill="#222222"
                          />
                        </svg>
                      </span>
                      <span className="ayur-nav-provalue">2</span>
                    </a>
                  </div>
                  <div className="ayur-nav-user">
                    <a href="profile.html">
                      <span className="icon">
                        <svg
                          width={15}
                          height={17}
                          viewBox="0 0 15 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.66405 0C10.1737 0 12.2106 2.03684 12.2106 4.54651C12.2106 7.05619 10.1737 9.09302 7.66405 9.09302C5.15438 9.09302 3.11754 7.05619 3.11754 4.54651C3.11754 2.03684 5.15438 0 7.66405 0ZM7.66405 1.18605C5.80907 1.18605 4.30359 2.69153 4.30359 4.54651C4.30359 6.40149 5.80907 7.90698 7.66405 7.90698C9.51903 7.90698 11.0245 6.40149 11.0245 4.54651C11.0245 2.69153 9.51903 1.18605 7.66405 1.18605ZM14.978 15.6163C14.978 15.9833 14.8322 16.3352 14.5727 16.5947C14.3132 16.8542 13.9613 17 13.5943 17H1.73382C1.36683 17 1.01488 16.8542 0.75538 16.5947C0.495882 16.3352 0.350098 15.9833 0.350098 15.6163C0.350098 13.9911 0.995714 12.4324 2.14492 11.2832C3.29413 10.134 4.85278 9.48837 6.478 9.48837H8.8501C10.4753 9.48837 12.034 10.134 13.1832 11.2832C14.3324 12.4324 14.978 13.9911 14.978 15.6163ZM14.4016 16.1927C14.3913 16.1967 14.385 16.2014 14.385 16.2093L14.4016 16.1927ZM1.53614 15.6163C1.53614 15.7254 1.6247 15.814 1.73382 15.814H13.5943C13.6467 15.814 13.697 15.7931 13.7341 15.7561C13.7711 15.719 13.792 15.6687 13.792 15.6163C13.792 14.3056 13.2713 13.0486 12.3445 12.1219C11.4177 11.1951 10.1608 10.6744 8.8501 10.6744H6.478C5.16734 10.6744 3.91036 11.1951 2.98358 12.1219C2.0568 13.0486 1.53614 14.3056 1.53614 15.6163Z"
                            fill="#222222"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="ayur-toggle-btn">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*----------- Header Section End ---------*/}
      {/*----------- Breadcrumb Section start ---------*/}
      <div className="ayur-bread-section">
        <div className="ayur-breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="ayur-bread-content">
                  <h2>Cart</h2>
                  <div className="ayur-bread-list">
                    <span>
                      <a href="index.html">Home</a>
                    </span>
                    <span className="ayur-active-page">Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*----------- Breadcrumb Section end ---------*/}
      {/*----------- Cart page Section start ---------*/}
      <div className="ayur-bgcover ayur-cartpage-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="ayur-cart-table table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img src="https://dummyimage.com/95x95/" alt="image" />
                      </td>
                      <td>
                        <h2>Black Organic Tea</h2>
                      </td>
                      <td>$50</td>
                      <td>
                        <input type="number" defaultValue={1} min={1} />
                      </td>
                      <td>$50</td>
                      <td>
                        <a
                          href="javascript:void(0)"
                          className="ayur-tab-delete"
                        >
                          <img src="assets/images/delete.png" alt="delete" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <img src="https://dummyimage.com/95x95/" alt="image" />
                      </td>
                      <td>
                        <h2>Loose Leaf Tea</h2>
                      </td>
                      <td>$50</td>
                      <td>
                        <input type="number" defaultValue={1} min={1} />
                      </td>
                      <td>$50</td>
                      <td>
                        <a
                          href="javascript:void(0)"
                          className="ayur-tab-delete"
                        >
                          <img src="assets/images/delete.png" alt="delete" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <img src="https://dummyimage.com/95x95/" alt="image" />
                      </td>
                      <td>
                        <h2>Oolong Tea</h2>
                      </td>
                      <td>$50</td>
                      <td>
                        <input type="number" defaultValue={1} min={1} />
                      </td>
                      <td>$50</td>
                      <td>
                        <a
                          href="javascript:void(0)"
                          className="ayur-tab-delete"
                        >
                          <img src="assets/images/delete.png" alt="delete" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="ayur-coupon-code">
                          <form className="form-inline">
                            <div className="ayur-form-input">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Coupon Code"
                                name="coupon_code"
                              />
                              <button
                                type="submit"
                                className="ayur-btn"
                                name="apply_coupon"
                                value="Apply Coupon"
                              >
                                Apply Coupon
                              </button>
                            </div>
                          </form>
                        </div>
                      </td>
                      <td colSpan={4} className="ayur-updatecart-btn">
                        <button className="ayur-btn">Update Cart</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ayur-carttotal-wrapper">
                <div className="ayur-cart-total">
                  <h2>Cart Totals</h2>
                  <table className="table table-bordere">
                    <tbody>
                      <tr className="ayur-cartsubtotal">
                        <th>Subtotal</th>
                        <td>
                          <span className="amount">$150</span>
                        </td>
                      </tr>
                      <tr className="ayur-ordertotal">
                        <th>Total</th>
                        <td>
                          <span className="amount">$150</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="ayur-checkout-btn">
                    <a href="checkout.html" className="ayur-btn">
                      Proceed to Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*----------- Cart page Section end ---------*/}
      {/*----------- footer Section start ---------*/}
      <div className="ayur-footer-section">
        <div className="container">
          <div className="ayur-sign-sec">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="ayur-sign-head">
                  <h3>Sign Up To Get Updates &amp; News About Us..</h3>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12">
                <form method="" className="ayur-subscribe-sec">
                  <div className="ayur-form-input">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email..."
                      name="email"
                    />
                  </div>
                  <div className="ayur-form-btn">
                    <a href="javascript:void(0)" className="ayur-btn">
                      Subscribe
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="ayur-footer-sec">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="ayur-footer-logosec">
                  <div className="ayur-footer-logo">
                    <img src="assets/images/footer-logo.svg" alt="logo" />
                  </div>
                  <p>
                    Amet minim mollit non deserunt ullamco est sit Velit officia
                    consequat duis enim velit mollit. sunt nostrud amet.
                    Excepteur sint occaecat.
                  </p>
                  <ul className="ayur-social-link">
                    <li>
                      <a href="javascript:void(0)">
                        <svg
                          width={11}
                          height={20}
                          viewBox="0 0 11 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.74157 20V10.8777H9.80231L10.2615 7.32156H6.74157V5.05147C6.74157 4.0222 7.02622 3.32076 8.50386 3.32076L10.3854 3.31999V0.13923C10.06 0.0969453 8.94308 0 7.64308 0C4.92848 0 3.07002 1.65697 3.07002 4.69927V7.32156H0V10.8777H3.07002V20H6.74157Z"
                            fill="#E4D4CF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8138 8.46864L19.0991 0H17.3727L11.0469 7.3532L5.9944 0H0.166992L7.8073 11.1193L0.166992 20H1.89349L8.57377 12.2348L13.9095 20H19.7369L11.8133 8.46864H11.8138ZM9.4491 11.2173L8.67498 10.1101L2.51557 1.29967H5.16736L10.1381 8.40994L10.9122 9.51718L17.3735 18.7594H14.7218L9.4491 11.2177V11.2173Z"
                            fill="#E4D4CF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <svg
                          width={17}
                          height={20}
                          viewBox="0 0 17 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.89667 0C3.41417 0.000833333 0.5 3.51333 0.5 7.34333C0.5 9.11917 1.4925 11.335 3.08167 12.0375C3.535 12.2417 3.475 11.9925 3.865 10.5008C3.88295 10.4406 3.88454 10.3766 3.8696 10.3156C3.85466 10.2545 3.82374 10.1985 3.78 10.1533C1.50833 7.52583 3.33667 2.12417 8.5725 2.12417C16.15 2.12417 14.7342 12.6092 9.89083 12.6092C8.6425 12.6092 7.7125 11.6292 8.00667 10.4167C8.36333 8.9725 9.06167 7.42 9.06167 6.37917C9.06167 3.75583 5.15333 4.145 5.15333 7.62083C5.15333 8.695 5.53333 9.42 5.53333 9.42C5.53333 9.42 4.27583 14.5 4.0425 15.4492C3.6475 17.0558 4.09583 19.6567 4.135 19.8808C4.15917 20.0042 4.2975 20.0433 4.375 19.9417C4.49917 19.7792 6.01917 17.6108 6.445 16.0433C6.6 15.4725 7.23583 13.1558 7.23583 13.1558C7.655 13.9125 8.86333 14.5458 10.1508 14.5458C13.9808 14.5458 16.7492 11.1792 16.7492 7.00167C16.7358 2.99667 13.3083 0 8.89667 0Z"
                            fill="#E4D4CF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <svg
                          width={21}
                          height={20}
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.4996 0H5.49988C2.75019 0 0.5 2.25019 0.5 4.99988V15.0001C0.5 17.7491 2.75019 20 5.49988 20H15.4996C18.2493 20 20.4995 17.7491 20.4995 15.0001V4.99988C20.4995 2.25019 18.2493 0 15.4996 0ZM18.8328 15.0001C18.8328 16.8376 17.3381 18.3333 15.4996 18.3333H5.49988C3.66218 18.3333 2.16671 16.8376 2.16671 15.0001V4.99988C2.16671 3.16193 3.66218 1.66671 5.49988 1.66671H15.4996C17.3381 1.66671 18.8328 3.16193 18.8328 4.99988V15.0001Z"
                            fill="#E4D4CF"
                          />
                          <path
                            d="M15.9172 5.83295C16.6075 5.83295 17.1672 5.27332 17.1672 4.58298C17.1672 3.89264 16.6075 3.33301 15.9172 3.33301C15.2269 3.33301 14.6672 3.89264 14.6672 4.58298C14.6672 5.27332 15.2269 5.83295 15.9172 5.83295Z"
                            fill="#E4D4CF"
                          />
                          <path
                            d="M10.4999 5C7.73793 5 5.5 7.23818 5.5 9.99988C5.5 12.7606 7.73793 15.0002 10.4999 15.0002C13.261 15.0002 15.4998 12.7606 15.4998 9.99988C15.4998 7.23818 13.261 5 10.4999 5ZM10.4999 13.3335C8.65915 13.3335 7.16671 11.8411 7.16671 9.99988C7.16671 8.15866 8.65915 6.66671 10.4999 6.66671C12.3406 6.66671 13.833 8.15866 13.833 9.99988C13.833 11.8411 12.3406 13.3335 10.4999 13.3335Z"
                            fill="#E4D4CF"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6">
                <div className="ayur-footer-box">
                  <h4>Useful Links</h4>
                  <ul className="ayur-links">
                    <li>
                      <a href="javascript:void(0)">Shipping Options</a>
                    </li>
                    <li>
                      <a href="wishlist.html">My Wishlist</a>
                    </li>
                    <li>
                      <a href="profile.html">My Account</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Return Policy</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Shopping FAQss</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="ayur-footer-box">
                  <h4>Contact Info</h4>
                  <ul className="ayur-contact-list">
                    <li className="ayur-contact-box">
                      <img src="assets/images/location.png" alt="icon" />
                      <p>
                        4517 Washington Ave. <br /> Manchester, Kentucky 39495
                      </p>
                    </li>
                    <li className="ayur-contact-box">
                      <img src="assets/images/mobile.png" alt="icon" />
                      <p>(208) 555-0112</p>
                    </li>
                    <li className="ayur-contact-box">
                      <img src="assets/images/email.png" alt="icon" />
                      <p>example@gmail.com</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 px-0">
                <div className="ayur-footer-box">
                  <h4>Recent Blog</h4>
                  <ul className="ayur-recent-blog">
                    <li className="ayur-recentblog-box">
                      <div className="ayur-recentblog-boximg">
                        <img src="https://dummyimage.com/70x70/" alt="image" />
                      </div>
                      <div className="ayur-recentblog-text">
                        <p className="date">Jun 10,2024</p>
                        <h3 className="text">
                          Amet minim mollit non deserunt est sit Velit officia
                          consequat.
                        </h3>
                      </div>
                    </li>
                    <li className="ayur-recentblog-box">
                      <div className="ayur-recentblog-boximg">
                        <img src="https://dummyimage.com/70x70/" alt="image" />
                      </div>
                      <div className="ayur-recentblog-text">
                        <p className="date">Jun 10,2024</p>
                        <h3 className="text">
                          Amet minim mollit non deserunt est sit Velit officia
                          consequat.
                        </h3>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="ayur-copyright-para">
                <p>Copyright © 2024. All Right Reserved.&nbsp;Pure Ayurveda</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ayur-bgshape ayur-footer-bgshape">
          <img src="https://dummyimage.com/325x284/" alt="img" />
          <img src="assets/images/footer-right.png" alt="img" />
        </div>
      </div>
      {/*----------- footer Section end ---------*/}
      {/* custom link  */}
    </>
  );
}
