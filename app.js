const express = require("express");
const userController = require("./controllers/userController");
const birthdayController = require("./controllers/birthdayController");

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Mount the controllers
app.use("/user", userController);
app.use("/birthday", birthdayController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
