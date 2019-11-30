import "dotenv/config";
import express from "express";
import models, { sequelize } from "./models";
import routes from "./routes";
import sum from "./sum.js";
import callMyFunction from "./callMyFunction.js";

console.log(sum(1, 2));
callMyFunction(function() {
  console.log("Hello world");
});

const app = express();

// Accessing the payload of an HTTP POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware to set a user
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch")
  };
  next();
});

// loading routes from other package
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// To force the database erasure on every sync
const eraseDatabaseOnSync = true;

// start the listener
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      messages: [
        {
          text: "Published the Road to learn React"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      messages: [
        {
          text: "Happy to release ..."
        },
        {
          text: "Published a complete ..."
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
