const express = require('express');
const bodyParser = require('body-parser');
//const userRoutes = require('./routes/userRoutes');
const RegistroRoutes = require('./routes/registroRoutes');
const app = express();


require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', RegistroRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});