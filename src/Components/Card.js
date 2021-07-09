import React, {useEffect, useState} from "react";
import './Card.css'
import ReactStars from 'react-stars'
import { AiFillPlusSquare } from "react-icons/ai";
import axios from "axios";





function Card({ title, imageUrl, body, span, ratings }) {
  const [cards, setCards] = useState([]);


  
  useEffect(() => {
    const getData = async () => {
      const res =  await axios.get('https://asm-dev-api.herokuapp.com/api/v1/food')
      setCards(res.data.data.meals);
      console.log(res.data.data.meals);
    }
    getData()
  }, [])




  const CardComponent = ({ title, span, imageUrl, value }) => (
    <div className="card-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <p>{body}</p>
        </div>
        <div className="card-span">
          <h4>{span}</h4>
        </div>
        <div className="card-span">
          <a>{span}</a>
        </div>
        <div className="btn">
          <ReactStars
            count={5}
            size={24}
            color2={'#ffd700'}
            value={value}
          />
        </div>
      </div>
      <div className="button">
        <a>
          <AiFillPlusSquare />
        </a>
      </div>
    </div>
  );



  return (
    <div className="container">
      {cards.map((card) =>
        CardComponent({
          id: card.id,
          title: card.strMeal,
          span: card.price,
          imageUrl: card.strMealThumb,
          value: card.ratings
        })
      )}
    </div>
    
  );
}




export default Card
