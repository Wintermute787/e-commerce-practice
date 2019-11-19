import React, { Component } from "react";
import axios from "axios";
import ProductCard from "../../presentation/ProductCard/ProductCard";
import "./Home.css";
import Loader from "../../presentation/Loader/Loader";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    };
  }
  componentDidMount() {
    axios
      .get("/api/products")
      .then(res => {
        console.log("res.data products -------------", res.data);
        this.setState({ products: res.data, loading: false });
      })
      .catch(err => console.log("read all products error ---------", err));
  }

  render() {
    const { products, loading } = this.state;
    let productsItems;

    if (products === null || loading) {
      productsItems = <Loader />;
    } else {
      if (products.length > 0) {
        productsItems = products.map(product => (
          <ProductCard key={product.id} {...product} />
        ));
      } else {
        productsItems = null;
      }
    }
    return (
      <div className="home container">
        <div className="home-products container">
          <div>{productsItems}</div>
        </div>
      </div>
    );
  }
}

export default Home;
