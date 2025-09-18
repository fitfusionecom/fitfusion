import { Table } from "@medusajs/ui";
import repeat from "@/lib/util/repeat";
import { HttpTypes } from "@medusajs/types";
import Item from "@/components/cart/item";

type ItemsProps = {
  order: HttpTypes.StoreOrder;
};

const Items = ({ order }: ItemsProps) => {
  const items = order.items;

  return (
    <div>
      <h3 className="h5 mb-3">Order Items</h3>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody data-testid="products-table">
            {items?.length
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
                  })
                  .map((item, index) => {
                    return (
                      <Item
                        isOrder={true}
                        key={item.id}
                        // @ts-ignore
                        item={item}
                        type="full"
                        currencyCode={order.currency_code}
                        index={index + 1}
                      />
                    );
                  })
              : repeat(5).map((i) => {
                  return (
                    <tr key={i}>
                      <td colSpan={6} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
