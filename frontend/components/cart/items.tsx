import Item from "./item";
import repeat from "@/lib/util/repeat";
import { HttpTypes } from "@medusajs/types";

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart;
};

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items;
  return (
    <div>
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
            {items
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
                  })
                  .map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        currencyCode={cart?.currency_code}
                      />
                    );
                  })
              : repeat(5).map((i) => {
                  return <SkeletonLineItem key={i} />;
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTemplate;

const SkeletonLineItem = () => {
  return <div>SkeletonLineItem</div>;
};

export { SkeletonLineItem };
