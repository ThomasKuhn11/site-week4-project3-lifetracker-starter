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
          imageUrl: item.calories,
          userId: item.userId,
          createdAt: item.createdAt,
        }
      }


      static async addItem(creds) {
        console.log(creds)
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
}

module.exports = Nutrition