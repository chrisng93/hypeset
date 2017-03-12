import authRouter from './auth';
import userRouter from './user';

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/api/user', userRouter);
};
