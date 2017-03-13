import authRouter from './auth';
import userRouter from './user';
import brandRouter from './brand';

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/brand', brandRouter);
};
