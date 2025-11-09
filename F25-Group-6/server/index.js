const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//response.send(status) is now a function that takes the JSON object as the argument.

app.get("/", (req, res) => { // create a GET endpoint at `/`
  res.send("Hello World!"); // return value of the endpoint
});

app.listen(port, () => { // listen for the port specified above
  console.log(`API listening on port ${port}`); // print a success message to the terminal
});