import EmptyCartMessage from "./empty-cart";
import { HttpTypes } from "@medusajs/types";
import Summary from "./summary";
import ItemsTemplate from "./items";

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  return (
    <div>
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
      <div className="ayur-bgcover ayur-cartpage-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ItemsTemplate cart={cart} />
              <Summary cart={cart as any} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTemplate;
