import React, { useState, useEffect } from "react";
import axios from "axios";
import Nouislider from "nouislider-react";
import Main from "./Main";
import ToggleList from "./ToggleList";
import ShowSidebarLoader from "./Loader/SidebarLaoder";
import CardLoaderPlaceHolder from "./Loader/CardLoader";
import SideBar from "./SideBar";
import Card from "./CardPhone";
import Pagination from "./Pagination";
import Footer from "./Footer";
import "nouislider/distribute/nouislider.css";
import "./App.css";

const baseUrl = "https://back-phone.herokuapp.com/api/v1";



const App = () => {
  const [phoneData, setPhoneData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [phoneRequest, setPhoneRequest] = useState("buyer");
  const [sliderValue, setSliderValue] = useState({
    min: 30,
    max: 2000,
  });

  useEffect(() => {
    const url = `${baseUrl}/phones?type=buyer&page=1&limit=8`;
    fetchData(url);
  }, []);

  const noResult = () => (
    <div className="no_result">
      <h3>No item match your search</h3>
    </div>
  );

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data.phoneData;
      setPhoneData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  const toggleType = (e) => {
    const { classList, textContent } = e.target;
    const listClassList = classList[1];
    classList.add("active_type");
    if (listClassList === undefined) {
      const element = textContent === "Buy Requests" ? "sell" : "buy";
      const removeClass = document.getElementById(element);
      removeClass.classList.remove("active_type");
    }
    const list = {
      "Buy Requests": "buyer",
      "Sell Requests": "seller",
    };
    const url = `${baseUrl}/phones?type=${list[textContent]}&page=1&limit=8&min=${sliderValue.min}&max=${sliderValue.max}&searchString=${search}`;
    setIsLoading(true);
    fetchData(url);
    setSearch("");
    setPhoneRequest(list[textContent]);
  };

  const handelSearchInput = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearch = (e) => {
    const input = document.getElementById("search");
    const searchValue = input.value;
    if (searchValue !== "") {
      input.value = "";
      const url = `${baseUrl}/phones?type=${phoneRequest}&page=${currentPage}&limit=8&searchString=${search}`;
      setIsLoading(true);
      fetchData(url);
    }
  };

  const showSidebar = (e) => {
    const sidebar = document.querySelector(".section_side_bar");
    sidebar.classList.add("show_side_bar");
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/runseed`);
      const alert = document.getElementById("alert");
      alert.classList.add('successful')
      const url = `${baseUrl}/phones?type=buyer&page=1&limit=8`;
      setIsLoading(true);
      fetchData(url);
      setTimeout(() => alert.classList.remove('successful'), 3000)
    } catch (error) {
      console.log(error);
    }
  };

  const loader = () => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(CardLoaderPlaceHolder(i));
    }
    return arr;
  };

  const handlePageClick = (data) => {
    const selected = data.selected + 1;
    const url = `${baseUrl}/phones?type=${phoneRequest}&page=${selected}&limit=8&min=${sliderValue.min}&max=${sliderValue.max}&searchString=${search}`;
    setCurrentPage(selected);
    fetchData(url);
  };

  const onSlide = (value) => {
    setSliderValue({
      min: Math.round(value[0]),
      max: Math.round(value[1]),
    });
  };

  const Slider = () => (
    <Nouislider
      connect
      start={[sliderValue.min, sliderValue.max]}
      behaviour="tap"
      range={{
        min: [30],
        max: [2000],
      }}
      onSlide={onSlide}
    />
  );

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    setSliderValue({ ...sliderValue, [name]: value });
  };

  const handleRangeSearch = () => {
    const url = `${baseUrl}/phones?type=${phoneRequest}&page=${currentPage}&limit=8&min=${sliderValue.min}&max=${sliderValue.max}`;
    setSearch("");
    setIsLoading(true);
    fetchData(url);
  };

  const closeSideBar = () => {
    const sidebar = document.querySelector(".section_side_bar");
    sidebar.classList.remove("show_side_bar");
  };

  const cardHTML = (data) => (
    <section className="section_content">
      <div className="card_item">
        {isLoading
          ? loader()
          : data.docs && !data.docs.length
          ? noResult()
          : data.docs.map((phone) => Card(phone))}
      </div>
    </section>
  );

  return (
    <>
      <div className="container">
        {Main(showSidebar, handelSearchInput, handleSearch)}
        {ToggleList(toggleType)}
        {isLoading
          ? ShowSidebarLoader()
          : SideBar(
              handlePriceChange,
              handleRangeSearch,
              closeSideBar,
              sliderValue,
              Slider,
              handleUpdate
            )}
        {cardHTML(phoneData)}
        {isLoading ? null : Pagination(phoneData, handlePageClick)}
        {Footer()}
      </div>
    </>
  );
};

export default App;
