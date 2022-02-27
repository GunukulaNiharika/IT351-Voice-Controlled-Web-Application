import React from "react";
import Layout from "../../Components/Layout/Layout";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories/ClothingAndAccessories";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore/ProductStore";
import "./ProductListPage.css";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "Store":
        content = <ProductStore {...props} />;
        break;
      case "Page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }

    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;