import express from "express";
import serverData from "./server.json" assert { type: "json" };
import cors from "cors";
import session from "express-session";

const app = express();
const port = 8888;

const corsOptions = {
  origin: "http://localhost:5555",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type",
  credentials: true,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key", // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

app.use((req, res, next) => {
  if (!req.session.token) {
    req.session.token = "fake-token"; // Set a fake token
  }
  next();
});

Object.keys(serverData).forEach((key) => {
  app.all(`/${key}`, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5555"); // Replace with your allowed origin
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({ data: serverData[key], token: req.session.token });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
