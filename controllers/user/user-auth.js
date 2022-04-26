const router = require('express').Router();
const {User} = require('../../models');

router.post("/:action", (req, res)=>{
      switch (req.params.action){
            case "register":
                  User.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                  }).then((userData)=>{
                        if (!userData){
                              res.status(404).json({message: "User could not be created"});
                        } else if(userData){
                              req.session.user_id = userData.id;
                              req.session.username = userData.username;
                              req.session.signedIn = true;
                        }
                  }).then(()=>{
                        if (req.session.signedIn === true){
                              res.redirect('/dashboard');
                        }
                  }).catch(err=>{
                        res.status(500).json(err);
                  });
                  break;
            case "login":
                  User.findOne({
                        where: {
                              username: req.body.username
                        }
                  }).then((userData)=>{
                        if (userData){
                              let password = userData.verifyPassword(req.body.password);
                              if (password === true){
                                    req.session.user_id = userData.id;
                                    req.session.username = userData.username;
                                    req.session.signedIn = true;
                                    res.redirect("/dashboard")
                              } else {
                                    res.json({message: "incorrect password!"})
                              }
                        } else  if (!userData){
                              res.status(404).json({
                                    message: "No user/password combination registered"
                              })
                        }
                        
                  });
                  break;
            case "logout":
                  req.session.destroy((err) =>{
                        if (err) throw err;
                        res.redirect('/');
                  });
                  break;
            default: res.json(req.session); break;
      }
});
      // User.findOne({
      //       where: {
      //             username: req.body.username
      //       }
      // }).then((userData)=>{
      //       if (userData){
      //             let password = userData.verifyPassword(req.body.password);
      //             if (password){
      //                   req.session.user_id = userData.id;
      //                   req.session.username = userData.username;
      //                   req.session.signedIn = true;
      //                   console.log(req.session);
      //                   res.redirect("/dashboard")
      //             } else {
      //                   res.json({message: "incorrect password!"})
      //             }
      //       } else {
      //             res.redirect('/authorize/login')
      //       }
      // })

// router.post('/register', (req, res)=>{
//       User.create({
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//       }).then((userData)=>{
//             if (!userData){
//                   res.status(404).json({message: "User could not be created"});
//             } else if(userData){
//                   req.session.user_id = userData.id;
//                   req.session.username = userData.username;
//                   req.session.signedIn = true;
//                   res.redirect('/dashboard');
//             }
//       }).catch(err=>{
//             res.status(500).json(err);
//       });
// })

router.get('/:action', (req, res)=>{
      switch (req.params.action){
            case "register":
                  res.render('login-signup', {
                        RPA: "right-panel-active",
                        layout: 'main',
                        script: "authorize.js",
                        stylesheet: "authorize.css"
                  });
                  break;
            case "login":
                  res.render('login-signup', {
                        layout: 'main',
                        script: "authorize.js",
                        stylesheet: "authorize.css"
            
                  });
                  break;
            default:
                  res.render('login-signup', {
                        layout: '404'
                  });
                  break;
      }
      
});
// router.get('/signup', (req, res)=>{
//
// })

module.exports = router;