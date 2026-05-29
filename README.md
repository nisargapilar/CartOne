# CartOne — Shopping Cart App

A full-stack shopping cart application built with React Native (Expo) and Node.js.

---

## Tech Stack

- **Frontend:** React Native (Expo), React Navigation, Axios, AsyncStorage
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT + bcryptjs

---

## Project Structure

CartOne/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── db/
│   │   ├── middleware/
│   │   └── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── navigation/
│   │   └── screens/
│   └── App.js
└── README.md

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

## Frontend Setup

```bash
cd frontend
npm install
```

Open `src/api/client.js` and update the `BASE_URL` to your machine's local IP:

```js
const BASE_URL = 'http://YOUR_LOCAL_IP:5000';
```

Run the frontend:

```bash
npx expo start --web
```

Opens at `http://localhost:8081`

To run on mobile, install **Expo Go** on your phone and scan the QR code.

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the backend server runs on |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and receive JWT token |
| GET | /products | Get all products |
| GET | /cart | Get current user's cart |
| POST | /cart/add | Add item to cart |
| PATCH | /cart/update | Update item quantity |
| DELETE | /cart/remove/:productId | Remove item from cart |

---

## Features Built

- User registration and login with JWT authentication
- Product listing with images, stock count, and descriptions
- Add to cart with stock validation
- Cart management — update quantity, remove items, line totals
- Empty state screens for both products and cart
- Loading and error states on every API call
- Order summary screen with Place Order button
- Cart persists across sessions using MongoDB

---

## Bonus Features

- ✅ Cart persisted in MongoDB — survives page refresh
- ✅ Loading and error states on every API call
- ✅ Order summary screen with Place Order button

---

## Known Limitations

- No real payment integration (Place Order clears cart only)
- Images are loaded from Unsplash URLs — requires internet connection
- Frontend IP address needs to be updated manually when network changes

---

## What I'd Improve With More Time

- Add quantity validation on frontend to disable `+` button at stock limit
- Add search and filter functionality on the products screen
- Implement proper order history stored in the database
- Add real payment gateway integration (Razorpay or Stripe)
- Deploy backend to Railway or Render and frontend to Expo EAS
- Add unit tests for API endpoints
- Improve mobile responsiveness and add animations

---

## Author

Nisarga — Full Stack Intern Assignment