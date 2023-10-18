const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000; // You can choose any available port

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
