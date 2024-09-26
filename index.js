const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const checkpointRouter = require('./routes/checkpointRoutes');
const raceRouter = require('./routes/raceRoutes');

app.use(express.json()); // Middleware pro parsování JSON
app.use('/api/users', userRouter);
app.use('/api/checkpoints', checkpointRouter); 
app.use('/api/races', raceRouter);

const morgan = require('morgan');
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
