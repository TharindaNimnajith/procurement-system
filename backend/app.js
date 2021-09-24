const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-errors');
const User = require('./routes/user.routes');
const Order = require('./routes/order.routes');
const OrderLists = require('./routes/order-lists.routes');
const Inventory = require('./routes/inventory.routes');
const Policy = require('./routes/policy.routes');
const Payment = require('./routes/payment.routes');
const Site = require('./routes/site.routes');

require('dotenv').config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(cors());

// route to users
app.use('/user', User);

// route to order
app.use('/order', Order);

// route to order lists
app.use('/orderLists', OrderLists);

// route to inventory
app.use('/inventory', Inventory);

// route to policy
app.use('/policy', Policy);

// route to payment
app.use('/payment', Payment);

// route to site
app.use('/site', Site);

app.use(() => {
  throw new HttpError('Could not find this route.', 404);
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT;
const dbName = process.env.DATABASE;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: dbName
};

if (process.env.NODE_ENV === 'test') {
  const Mockgoose = require('mockgoose').Mockgoose;
  const mockgoose = new Mockgoose(mongoose);

  mockgoose.prepareStorage()
    .then(() => {
      mongoose.connect(uri,
        {useNewUrlParser: true, useCreateIndex: true})
        .then((res, err) => {
          app.listen(5000, function () {
            console.log('Example app listening on port 8000!');
          });
          if (err) return reject(err);
          resolve();
        })
    })
} else {
  mongoose
    .connect(uri, options)
    .then(() => {
      app.listen(port);
      console.log(`Server is running on port: ${port}`);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = app
