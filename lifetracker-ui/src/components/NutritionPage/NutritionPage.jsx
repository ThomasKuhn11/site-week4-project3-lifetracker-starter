import * as React from "react";
import { useState } from "react";
import "./NutritionPage.css";

import axios from "axios";

export default function NutritionPage({ user }) {
  const [errors, setErrors] = useState({});
  console.log(user?.firstName)

  //const isAuthenticated = Boolean(user?.email)

  const [item, setItem] = useState({
    name: "",
    category: "",
    calories: 0,
    imageUrl: "",
  });

  const [itemList, setItemList] = useState([])

  const handleInputChange = (event) => {
    setItem((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleAdd = async (event) => {
    event.preventDefault();


    
   
      const res = await axios.post("http://localhost:3001/auth/nutrition", {
        name: item.name,
        category: item.category,
        calories: item.calories,
        imageUrl: item.imageUrl,
        userId: user.id
      });
  
      //if (res?.data?.list) {
        //check this
        
        
        setItemList([...itemList, item]);
        setItem({
          name: '',
          category: '',
          calories: 0,
          imageUrl: '',
        });

        //setIsLoading(false)
        console.log(itemList)
     // }

  }


  const DisplayList = () => {
    console.log(itemList)
    return (
      <div className="item-list">
        {itemList.map((item, index) => (
          <div className="item" key={index}>
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Calories: {item.calories}</p>
            {item.imageUrl && <img src={item.imageUrl} alt="Item Image" />}
          </div>
        ))}
      </div>
    );
  };


  

  const isAuthenticated = Boolean(user?.email);

  const content = isAuthenticated ? (
      <>
      <form className="form-container">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleInputChange}
          ></input>
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleInputChange}
          ></input>
        </label>
        <br />
        <label>
          Calories:
          <input
            type="text"
            name="calories"
            value={item.calories}
            onChange={handleInputChange}
          ></input>
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleInputChange}
          ></input>
        </label>
        <br />
        <button type="submit" onClick={handleAdd}>
          Add
        </button>
      </form>
      <div>

      <DisplayList/>

      </div>
      </>
    ) : (
      <p className="appt">Please Log In to see your nutrition information!</p>
    )

  return (
    <div className="NutritionPage">
      {content}   
    </div>
  );
}
