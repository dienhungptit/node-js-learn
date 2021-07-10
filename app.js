const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")

const errorController = require("./controllers/error");
const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('60e90dd129349a0638d52c41')
      .then(user => {
        req.user = user
        next();
      })
      .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));

app.use(errorController.get404);

mongoose
    .connect(
        "mongodb+srv://root:admin123@cluster0.pqflg.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((result) => {
      User.findOne().then(user => {
        if (!user) {
          const user = new User({
            name: 'HungLPD', email: 'hunglpd@gmail.com', cart: {
              items: []
            }
          });
          user.save();
        }
      })

      app.listen(3000);
    })
  .catch((err) => {
    console.log(err);
  });
