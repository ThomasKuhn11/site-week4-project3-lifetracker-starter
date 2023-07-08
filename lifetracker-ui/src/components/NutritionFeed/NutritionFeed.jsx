
import { useState } from "react";
import React, { useEffect } from 'react';
import axios from "axios";

import "./NutritionFeed.css";

export default function NutritionFeed({ user, itemList }) {

    const [dbItems, setDbItems] = useState([]) 


    

        useEffect(() => {
            const showList=  async () => {
                       //from NutritionFeed
            const res2 = await axios.post("http://localhost:3001/auth/nutritionFeed", 
            {userId: user.id}
                      );

                      console.log(res2)

            setDbItems(res2.data.nutri)
            console.log(itemList)
                
            console.log(res2.data.nutri)

            }
            showList()
            
            
            
          }, [itemList]);


    

    return (
        <div className="item-list">
        {dbItems.map((item, index) => (
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