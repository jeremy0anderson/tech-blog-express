const router = require('express').Router();
const {Vote, User, Comment, Post} = require('../../models');

router.get('/', (req, res)=>{
    Vote.findAll({
        include: User, Post
    }).then((voteData)=>{
        if (!voteData){
            res.status(404).json({message: "Currently no votes to display"});
        } else {
            res.status(200).json(voteData);
        }
    })
})
router.get('/:id', (req, res)=>{

})

router.post('/', (req, res)=>{

})

router.get('', (req, res)=>{

})

module.exports = router;