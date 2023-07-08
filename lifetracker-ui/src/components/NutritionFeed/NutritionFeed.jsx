
import { useState } from "react";
import React, { useEffect } from 'react';
import axios from "axios";

import "./NutritionFeed.css";

export default function NutritionFeed({ user }) {

    const [itemList, setItemList] = useState([]) 


    

        useEffect(() => {
            const showList=  async () => {
                       //from NutritionFeed
            const res2 = await axios.post("http://localhost:3001/auth/nutritionFeed", 
            {userId: user.id}
                      );

                      console.log(res2)

            setItemList(res2.data.nutri)
            console.log(itemList)
                
            console.log(res2.data.nutri)

            }
            showList()
            
            
            
          }, []);


    

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




}