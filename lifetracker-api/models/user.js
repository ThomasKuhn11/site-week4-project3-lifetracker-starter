"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

const { BCRYPT_WORK_FACTOR } = require("../config")

const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      date: user.date,
    }
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) { //we authenticate from the front end
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    const user = await User.fetchUserByEmail(email)
    console.log("email fetched user", user)

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        const temp = User._createPublicUser(user)
        return User._createPublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    //console.log(creds)
    const { username, password, firstName, lastName, email} = creds
    const requiredCreds = ["username", "password", "firstName", "lastName", "email"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
    } catch (err) {
      throw err
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    const result = await db.query(
      `INSERT INTO users (
          username,
          password,
          first_name,
          last_name,
          email               
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING 
                  username,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  email             
                  `,
      [username, hashedPassword, firstName, lastName, normalizedEmail]
    )

    const user = result.rows[0]

    //  //Generate and sign JWT token 
    //  console.log(user)
    //  const token = jwt.sign({ user_id: user.id, username: user.username }, SECRET_KEY, {
    //   expiresIn: "1h"});

    //   res.status(201).json({ 

    //     message: "register successful",
    //     token: token,
    //     user: user,
    //   });


    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT
              id,
              username, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              email           
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              location,
              date              
           FROM users
           WHERE id = $1`,
      [userId]
    )

    const user = result.rows[0]

    return user
  }
}

module.exports = User
