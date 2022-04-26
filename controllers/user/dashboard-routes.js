const router = require('express').Router();
const {Post, Comment, User, Vote} = require('../../models');
const axios = require('axios');


class Card {
      constructor(id, post_url, title, created_at, vote_count, comments, user){
            this.id=id;
            this.post_url=post_url;
            this.title = title;
            this.created_at=created_at;
            this.vote_count = vote_count;
            this.comments = comments;
            this.user = user;
      }
}

let navOptions = {};
let commentsArr=[];
let cardsArr=[];
let crd;
router.get('/',async(req, res)=> {
      if (req.session.signedIn === true) {
                  let re = await axios.get(`http://localhost:4001/api/posts`);
                  let posts = await re.data;

                  posts.forEach(post => {
                        console.log(post);
                  });
            let renderOptions = {
                  helpers: {
                        date: (string) => {
                              return new Date(string).toLocaleDateString();
                        }
                  }, logout: {
                        action1: "Log Out",
                  }, layout: 'main', script: "home-dashboard.js", stylesheet: "home.css", cards: posts, signedIn:req.session.signedIn
            }
            req.session.options = renderOptions;
            req.session.save();
            res.render('home', renderOptions);
            // fetch('/api/posts', {
            //       method: "get"
            // }).then(r => {return cards = r.json()}).then(()=>{console.log(cards)});
            
            
            // Post.findAll({
            //       attributes: ['title', 'post_url', 'user_id', 'createdAt'],
            //       // include: Comment, User
            // }).then((postData)=>{
            //       if (!postData){
            //             res.status(404).json("")
            //       } else if (postData){
            //             cardsArr = [];
            //             commentsArr=[];
            //             postData.forEach((r)=>{
            //                   crd = new Card(r.title, r.post_url, r.user_id, r.createdAt, r.comments, r.vote_count);
            //                   cardsArr.push(crd);
            //                   // console.log(crd);
            //                   return cardsArr;
            //             });
            //             // cardsArr.forEach(card => {
            //             //       card.comments.forEach(comment=>{
            //             //             let cd = {
            //             //                   id: comment.id,
            //             //                   text: comment.text,
            //             //                   user_id: comment.user_id,
            //             //                   post_id: comment.post_id,
            //             //                   createdAt: comment.createdAt,
            //             //                   updatedAt: comment.updatedAt
            //             //             };
            //             //             commentsArr.push(cd);
            //             //             return card.comments = commentsArr;
            //             //       });
            //             //       return cardsArr;
            //             // })
            //             console.log(cardsArr);
            
      } else if (!req.session.signedIn || req.session.signedIn===false){
            res.redirect('/authorize/register');
      }
      
})

router.post('/', async(req, res)=>{

      //
      // console.log(newComment);
      // let url = await axios.post('http://localhost:4001/api/comments', newComment);
      // let r2 = await url.data;
      // console.log(r2);
});

module.exports = router;