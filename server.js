const express = require('express'),
      app = express(),
      path = require("path"),
      hbs = require('express-handlebars'),
      sequelize = require('./config/connection'),
      session = require('express-session'),
      routes = require('./controllers'),
      SessionStore = require('connect-session-sequelize')(session.Store),
      dbStore = new SessionStore({db: sequelize}),
      PORT = process.env.PORT || 4001;

require('dotenv').config();
app.set('views', 'views');
app.set('view engine','hbs');
app.engine('hbs',  hbs.engine({
      extname:"hbs",
      defaultLayout: 'main',
      partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//middleware

const sessionConfig = {
      name: 'sid',
      secret: process.env.SESSION_SECRET,
      cookie:{
            maxAge: 60*60*1000*5,
            secure: process.env.NODE_ENV === 'production'
      },
      proxy: process.env.NODE_ENV === 'production',
      saveUninitialized: false,
      resave: false,
      store: dbStore
};

app.use(session(sessionConfig));app.use(routes);



sequelize.sync({force: false}).then(()=> {
      app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
      });
});


      
      

