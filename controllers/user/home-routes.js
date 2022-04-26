const router = require('express').Router();

const navOptions = {
      buttons: {
            action1: "Sign In",
            action2: "Sign Up"
      },
      actions: {
            href1: "/authorize/login",
            href2: "/authorize/register"
      },
      layout: 'main',
      script: "home-dashboard.js",
      stylesheet: "home.css"
}
router.get("/", (req, res)=>{
      if (!req.session.signedIn || req.session.signedIn === false){
            res.render('home', navOptions);
      } else if (req.session.signedIn === true) {
            res.redirect('/dashboard');
      }
})




module.exports = router;