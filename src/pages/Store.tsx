import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

export type Prods = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const Store = () => {
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

  return (
    <Row md={2} xs={1} lg={3} className="g-3">
      {prod.map((item) => {
        return (
          <Col key={item.id}>
            <StoreItem item={item} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Store;
