import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import DefaultLayout from "./../components/DefaultLayout";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: "Web designing",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1KAOnGydsVxVzllg-9lwqaeM8cnfQUqU_Qg&usqp=CAU",
    },
    {
      name: "Marketing",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg6OwMtLJHs7NHA30t1hqEbYUJkL3VSg6h_w&usqp=CAU",
    },
    {
      name: "Logo Designing" ,
      imageUrl: "https://banner2.cleanpng.com/20180414/evw/kisspng-graphic-designer-computer-vector-5ad1ac03c58f23.3900852815236904998092.jpg",
    },
    {
      name: "Mobile App development",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPqSliApU4C_nPK6Rngke21vMR4ubCcQo5BQ&usqp=CAU",
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  
  return (
    <DefaultLayout>
            <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
