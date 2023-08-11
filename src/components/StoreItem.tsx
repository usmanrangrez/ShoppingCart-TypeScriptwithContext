import { Button, Card } from "react-bootstrap";
import { Prods } from "../pages/Store";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  item: Prods;
};

function StoreItem({ item }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(item.id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={item.images[0]}
        height="250px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{item.title}</span>
          <span className="ms-2 text-muted">{formatCurrency(item.price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              onClick={() => increaseCartQuantity(item.id)}
              className="w-100"
            >
              Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                <div>
                  <span className="fs-5 ">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(item.id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreItem;
