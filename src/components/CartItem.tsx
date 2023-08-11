import { useEffect, useState } from "react";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Prods } from "../pages/Store";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const [prod, setProd] = useState<Prods[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const details = await axios.get(`https://dummyjson.com/products`);
        setProd(details.data.products);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    getData();
  }, []);
  const { removeFromCart } = useShoppingCart();
  const item = prod.find((item) => item.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.images[0]}
        style={{ width: "125px", height: "105px", objectFit: "cover" }}
      />
      <div className="me-auto">
        {item.title}
        {quantity > 1 && (
          <span className="text-muted" style={{ fontSize: ".75rem" }}>
            x{quantity}
          </span>
        )}
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {formatCurrency(item.price * quantity)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        ❌
      </Button>
    </Stack>
  );
}

export default CartItem;
