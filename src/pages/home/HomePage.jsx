import axios from "axios"
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router';
import Header from "../../components/Header";
import "./Homepage.css";
import {ProductsGrid} from "./ProductsGrid";

function Homepage({cart, loadCart}) {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    document.title = "MyShop";
    const setFavicon = (url) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = url;
    };
    // favicon file placed in public folder; adjust path if located elsewhere
    setFavicon("/home-favicon.png");
  }, []);

  // async function getProducts() {
  //   const response = await fetch("http://localhost:3000/api/products")
  //   const data = await response.json()
  //   console.log(data);

  // }


  // getProducts()
  // useEffect(() => {
  //   axios.get("/api/products")
  //     .then((response) => {
  //       setProducts(response.data)
  //     })
  // },[])

  useEffect(() => {
    const getHomeData = async () => {
      const url = search ? `/api/products?search=${search}` : "/api/products";
      const response = await axios.get(url)
      setProducts(response.data)
    }

    getHomeData()
  }, [search])


    
  
  return (
    <>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}

export default Homepage;
