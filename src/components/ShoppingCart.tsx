import Offcanvas from "react-bootstrap/Offcanvas";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Stack } from "react-bootstrap";
import CartItem from "./CartItem";
type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </Stack>
        <div className="ms-auto fw-bold fs-5">Total </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
