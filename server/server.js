const express = require('express') 
const app = express() 
const cors = require('cors')
const path = require('path')

const fs = require("fs") 
// Load data from JSON file into memory
const rawData = fs.readFileSync("server/sampledata.json")
const data = JSON.parse(rawData)
console.log(data);

app.use(cors())
app.use(express.json()) 
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.


app.get('/', (req, res) => {
  res.send('<h1>This is Home page</h1>')
})

app.get('/api/products', (req, res) => {
    const category = req.query.category;
    if(category){
       const categoryProducts = data.products.filter(product => product.category === category); 
       if(categoryProducts.length > 0) {
          res.json(categoryProducts);
        } else {
          res.json({ message: 'No products found for this category' });
        }
      } else {
        res.json(data.products)
      }
})
app.get('/api/categories', (req, res) => {
  res.json(data.categories)
})
app.get('/api/tags', (req, res) => {
  res.json(data.tags)
})
app.get('/api/cart', (req, res) => {
  res.json(data.cart)
})
app.post('/api/cart', (req, res) => {
  const body = req.body
  
  if (!data.cart || !Array.isArray(data.cart)) {
    data.cart = [];
  }
  console.log(body)
  const cartItem = {
      name: body.name,
      user_id: body.user_id, 
      price: body.price,
      quantity: body.quantity,
      id: data.cart.length,
      total: body.total,
      product_id: body.product_id
  }
  data.cart.push(cartItem) 
  res.json(cartItem)
})

app.put('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);
  const newQuantity = req.body.quantity;

  if (!data.cart || !Array.isArray(data.cart)) {
    return res.status(400).send("Cart not initialized");
  }
  const cartItem = data.cart.find(item => item.id === id);

  if (!cartItem) {
    return res.status(404).send("Item not found");
  }

  cartItem.quantity = newQuantity;

  res.json(cartItem);
});



app.get('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!data.cart || !Array.isArray(data.cart)) {
    return res.json([]);
  }
  const userItems = data.cart.filter(u => u.user_id === id)
  if (userItems) {
    res.json(userItems)
  } else {
    res.json([])
    res.status(404)
    res.send("<h1>User not found.</h1>")
  }
})


app.get('/api/products/:id', (req, res) => {
  const id = req.params.id
  const product = data.products.filter(u => u.id === id)[0]
  // return a 404 if there is no such unit
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    res.send("<h1>Product not found.</h1>")
  }
})




app.get('/api/session', (req, res) => {
  res.json(data.session)
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = data.users.filter(u => u.id === id)[0]
  // return a 404 if there is no such unit
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    res.send("<h1>User not found.</h1>")
  }
})

app.delete('/api/cart/:id', (req, res) => {
	const id = Number(req.params.id)
	result = {"status": "not found"}
	newcart = []
	data.cart.map((item) => id === item.id ? result = {"status": "success"} : newcart.push(item))
  data.cart = newcart
	res.json(result)
})

app.post('/api/orders', (req, res) => {
  const body = req.body
  console.log(body)
  const newOrder = {
      id: data.orders.length,
      user_id: body.user_id,
      order_date: new Date().toISOString().split('T')[0],
      order_status: "pending",
      order_total: body.order_total,
      order_items: body.order_items
  }
  data.orders.push(newOrder) 
  res.json(newOrder)
})

app.get('/api/orders', (req, res) => {
  const userId = req.query.user_id;
  if (userId) {
    const userOrders = data.orders.filter(order => order.user_id == userId);
    if(userOrders.length > 0) {
      res.json(userOrders);
    } else {
      res.json([]);
    }
  } else {
    res.json(data.orders)
  }
})



const PORT = process.env.PORT || 3001;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})