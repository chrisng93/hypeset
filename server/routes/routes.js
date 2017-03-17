import authRouter from './auth';
import userRouter from './user';
import brandRouter from './brand';
import meRouter from './me';
import siteRouter from './site';
import analyticsRouter from './analytics';

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/brand', brandRouter);
  app.use('/api/me', meRouter);
  app.use('/api/site', siteRouter);
  app.use('/api/analytics', analyticsRouter);
};
