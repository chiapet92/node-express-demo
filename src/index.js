import "dotenv/config";
import express from "express";
import models from "./models";
import routes from "./routes";

const app = express();

// Accessing the payload of an HTTP POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware to set a user
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
