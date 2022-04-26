
class Card{
    constructor(title, post_url, user_id, createdAt, comments, vote_count) {
        this.title = title;
        this.post_url = post_url;
        this.user_id = user_id;
        this.createdAt = createdAt;
        this.comments = [comments];
        this.vote_count = vote_count;
        
        this.card = {
            title: this.title,
            post_url: this.post_url,
            createdAt: this.createdAt,
            comments: this.comments,
            vote_count: this.vote_count
        }
        return this.card;
    }
    generate(card){
    }
}

class Generate {
    constructor(card){
        this.card = card;
    }
    
}
let g = new Card("title","https://tital.com" , 1, '2012-19-12', [{comment_text: this.comment_text}], 3);
console.log(g);
module.exports = {Card, Generate};