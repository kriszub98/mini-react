import React from "react";
import "./Home.css";
import Card from "../../components/Card/Card";
import Clock from "../../components/Clock/Clock";
import { useFetch } from "./Home.hooks";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Home = () => {
  const { data, loading, error } = useFetch<Product>(
    "https://fakestoreapi.com/products/1"
  );

  return (
    <main>
      <Clock timer={data?.title} label={data?.image} />
      <Card label="Open Card" />
    </main>
  );
};

export default Home;
