# 🧠 SocialSync – A NoSQL-Powered Social Network API for developers

> Connect users, share thoughts, and react in real-time — all through the power of MongoDB and Mongoose!

![license-badge](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📚 Table of Contents  
- 📝 [Description](#-description)  
- 💾 [Installation](#-installation)  
- 🚀 [Usage](#-usage)  
- 🤝 [How to Contribute](#-how-to-contribute)  
- 🧪 [Tests](#-tests)  
- 📄 [License](#-license)  
- ✨ [Features](#-features)  
- 🙌 [Credits](#-credits)

---

## 📝 Description  

Tired of social media platforms that don’t let you own the backend?  
**SocialSync** is a backend-only social network API built with Express and MongoDB.  
Users can share their thoughts, react to others, and grow their network of friends — all without a UI! Perfect for mastering NoSQL relationships and RESTful routing. 🧠⚙️

---

## 💾 Installation  

1. Clone this repo to your local machine:  
   ```bash
   git clone https://github.com/your-username/thoughtnet-api.git
   cd thoughtnet-api
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Make sure MongoDB is running locally or update your `.env` with your Mongo URI.

---

## 🚀 Usage  

Start the server:  
```bash
npm run dev
```

Use **Insomnia** or **Postman** to interact with the API at:  
```
http://localhost:3001/api
```

Test routes like:  
- `GET /api/users`  
- `POST /api/thoughts`  
- `POST /api/users/:userId/friends/:friendId`  
- `DELETE /api/thoughts/:id`  
- `POST /api/thoughts/:thoughtId/reactions`  
- ...and more!

---

## 🤝 How to Contribute  

Pull requests are welcome!  

To contribute:  
1. Fork this repo 🔱  
2. Create a feature branch 🌱  
3. Make your changes 🛠  
4. Submit a PR 📬  

---

## 🧪 Tests  

Manual testing via Insomnia is recommended. Try:  
- 🧪 Creating a user  
- 🧪 Posting a thought  
- 🧪 Reacting to a thought  
- 🧪 Adding/removing friends  

---

## 📄 License  

This project is licensed under the MIT License 🛡  
You're free to clone, remix, and share it — just don’t be evil. 😈  

---

## ✨ Features  

- 🌐 Full CRUD routes for Users and Thoughts  
- 💬 Reactions as subdocuments inside Thoughts  
- 🔁 Friends as self-referencing User objects  
- 📈 Virtual properties like `friendCount` and `reactionCount`  
- 📅 Custom timestamp formatting via getters  

---

## 🙌 Credits  

- 🚀 Built with [Express.js](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/)  
- 🧠 Powered by NoSQL structure and relational modeling magic  
- 🧪 Tested with [Insomnia](https://insomnia.rest/)  
- 📚 Xpert Learning — for helpful coding insights along the journey
- 🤖 ChatGPT — for READme magic 