const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection success"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cookieParser());

app.use(express.json()); 


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running at Port " + process.env.PORT  );
});
