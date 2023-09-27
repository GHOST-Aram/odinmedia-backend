import { accountsRouter } from './routes/accounts.js';
import { contentRouter } from './routes/content.js';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import { postsRouter } from "./routes/posts.js";
import createHttpError from 'http-errors';
import { peopleRouter } from './routes/people.js';
import { friendsRouter } from './routes/friends.js';
import { profilesRouter } from './routes/profiles.js';

config()
app.use((req, res, next) =>{
  const user = {
    name: 'Frank Tristan',
    pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
}
  res.locals.user = user
  next()
})

app.use('/', postsRouter)
app.use('/auth', accountsRouter)
app.use('/content', contentRouter)
app.use('/people', peopleRouter)
app.use('/friends', friendsRouter)
app.use('/profiles', profilesRouter)

//Error handling
app.use(function(req, res, next) {
    next(createHttpError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');
  });

export {app};
