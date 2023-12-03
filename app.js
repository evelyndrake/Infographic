const express = require('express');
const Pokedex = require('pokedex-promise-v2');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
// load app css

// Serve the React app on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/cards", async(req, res) => {
  const c = await cards();
  res.json(c);
});

const P = new Pokedex();
async function cards() {
  return await P.getPokemonsList({ limit: 100000, offset: 0 })
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

