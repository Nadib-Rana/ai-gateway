ai-gateway/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── askController.js
│   ├── models/
│   │   ├── QueryLog.js
│   │   └── User.js         # optional, for auth
│   ├── routes/
│   │   └── askRoutes.js
│   ├── utils/
│   │   └── routerEngine.js # smart routing logic
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QueryInput.jsx
│   │   │   ├── ResponseCard.jsx
│   │   │   └── FeedbackButton.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── History.jsx
│   │   │   ├── About.jsx
│   │   │   └── Admin.jsx # optional for Phase 2
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
