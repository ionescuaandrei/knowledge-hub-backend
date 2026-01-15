# 📚 KnowledgeHub: Full-Stack Learning Management System

**KnowledgeHub** is a MEAN stack web application designed for academic and professional knowledge sharing. It allows experts to create tutorials while providing students a centralized repository to search and learn.

* Design(https://stitch.withgoogle.com/projects/16073747385846946227)

---

## 🚀 Features

* **Secure Authentication:** User signup and signin using `bcryptjs` for one-way password hashing.
* **JWT Security:** Token-based authentication (stateless) for secure communication between Angular and Express.
* **Role-Based Access:** Standard users can browse, while "Creators" can manage tutorials.
* **CRUD Operations:** Full Create, Read, Update, and Delete capabilities for tutorials.
* **Search & Filter:** Find tutorials by title keywords using MongoDB regex queries.
* **Ownership Integrity:** Middleware logic ensures only the original author of a tutorial has permission to Edit or Delete it.

---

## 🛠️ Tech Stack

* **Frontend:** Angular (v14+)
* **Backend:** Node.js & Express.js
* **Database:** MongoDB via Mongoose ODM
* **Security:** JSON Web Tokens (JWT), Bcrypt.js

---

## 📡 API Endpoints

### 1. Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/signin` | Login & receive JWT | Public |

### 2. Tutorials
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tutorials` | Retrieve all tutorials | Public |
| `GET` | `/api/tutorials/:id` | Retrieve a single tutorial | Public |
| `POST` | `/api/tutorials` | Create a new tutorial | Private (Logged In) |
| `PUT` | `/api/tutorials/:id` | Update tutorial by ID | Private (Owner Only) |
| `DELETE` | `/api/tutorials/:id` | Delete tutorial by ID | Private (Owner Only) |
| `GET` | `/api/tutorials/user/me` | Get tutorials by current user | Private (Logged In) |

---

## 🏗️ Database Schema (Mongoose)

### User Model

```javascript
 email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  }, {
    timestamps: true 
  });
```

### Tutorial Model

```javascript
 title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    published: {
      type: Boolean,
      default: false
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    authorEmail: {
      type: String,
      default: 'unknown'
    },
    sourceLink: {
      type: String,
      trim: true
    },
    coverImage: {
      type: String, 
      default: null
    }
  }, {
    timestamps: true
  })
```

---

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/knowledgehub.git](https://github.com/yourusername/knowledgehub.git)
    cd knowledgehub
    ```

2.  **Server Setup**
    ```bash
    cd server
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `/server` directory:
    ```env
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the Server**
    ```bash
    npm run dev
    ```

---

## 🧪 Testing with Postman
1.  **Register:** Send a `POST` request to `/api/auth/signup`.
2.  **Login:** Send a `POST` request to `/api/auth/signin` to get your `accessToken`.
3.  **Authorize:** In Postman, add a Header named `x-access-token` and paste your JWT as the value to access Private routes.≈
