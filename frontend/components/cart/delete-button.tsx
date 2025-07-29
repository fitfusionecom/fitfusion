import { useState } from "react";
import { clx } from "@medusajs/ui";
import Spinner from "../blocks/spinner";
import { deleteLineItem } from "@/lib/data/cart";

const DeleteButton = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false);
    });
  };

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? (
          <Spinner />
        ) : (
          <div className="ayur-tab-delete">
            <img src="assets/images/delete.png" alt="delete" />
          </div>
        )}
      </button>
    </div>
  );
};

export default DeleteButton;
