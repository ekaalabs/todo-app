import express from 'express';
import logger from 'morgan';
import todoRoutes from './routes/TodoRoute.js';
import userRoutes from './routes/UserRoute.js';
import profileRoutes from './routes/ProfileRoute.js';

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

app.listen(3000, () => console.log(`developing...`));
