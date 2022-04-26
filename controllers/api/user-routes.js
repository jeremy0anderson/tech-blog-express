const {User} = require("../../models");
const router = require('express').Router();

router.get("/", (req, res)=>{
      User.findAll({
            attributes: {
                  exclude:['password']
            }
      }).then((userData)=>{
            if (!userData){
                  res.status(404).json({message: "No users found"});
            } else if(userData){
                  res.status(200).json(userData);
            }
      }).catch(err=>{
            res.status(500).json(err);
      });
});

router.get("/:id", (req, res)=>{
      User.findOne({
            attributes: {
                  exclude: ['password']
            },
            where: {
                  id: req.params.id
            }
      }).then((userData)=>{
            if (!userData){
                  res.status(404).json({message: "No user found with that ID"});
            } else if(userData){
                  res.status(200).json(userData);
            }
      }).catch(err=>{
            res.status(500).json(err);
      });
});

router.post('/', (req, res)=>{
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
                  res.status(201).json(userData);
            }
      }).catch(err=>{
            res.status(500).json(err);
      });
});

module.exports = router;
