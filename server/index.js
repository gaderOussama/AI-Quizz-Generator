require('dotenv').config();
const express = require('express');
const cors = require('cors');

const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Remove the extra space after '/api/quiz'
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
