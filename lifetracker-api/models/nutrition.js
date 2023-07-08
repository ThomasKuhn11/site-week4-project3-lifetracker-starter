"use strict"


const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")



class Nutrition {

    static _createItem(item) {
        return {
          id: item.id,
          name: item.name,
          category: item.category,
          calories: item.calories,
          imageUrl: item.imageUrl,
          userId: item.userId,
          createdAt: item.createdAt,
        }
      }


      static async addItem(creds) {
        //console.log(creds)
        const { name, category, calories, imageUrl, userId} = creds
        const requiredCreds = ["name", "category", "calories","imageUrl", "userId"]
        try {
          validateFields({ required: requiredCreds, obj: creds, location: "item registration" })
        } catch (err) {
          throw err
        }
    
        const result = await db.query(
          `INSERT INTO nutrition (
              name,
              category,
              calories,
              image_url,
              user_id                            
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING 
                      name,            
                      category, 
                      calories,
                      user_id AS "userId"             
                      `,
          [name, category, calories, imageUrl, userId]
        )
    
        const item = result.rows[0]
    
    
        return item
      }

      static async getAllItems(id) {
        //console.log(id)

        const result = await db.query( `SELECT
          name,
          category,
          calories,
          image_url AS "imageUrl"
        FROM
          nutrition
        WHERE user_id=$1
      `, [id]
      );
          
        console.log(result.rows)

        const items = result.rows.map((item) => this._createItem(item));
        //console.log(items)
    
        return items;
      }


      
}

module.exports = Nutrition