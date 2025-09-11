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
      <div className="ayur-bgcover">
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
