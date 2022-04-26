
// let cardTemplate = handlebars.compile(`<div>
//
//
// </div>`);


Handlebars.template({
      template: template
})
    `{{#each cards}}
        <div class="card">
            <div class="card-title">
            </div>
            <div class="media">
                <div class="media-content">
                    <a class="card-title-url title is-4" href="{{this.post_url}}">{{this.title}}</a>
                </div>
            </div>
            <div class="content">
                <form action="/api/comments" method="post">
                    <label>
                        <input class="comments-input" name="comment_text" placeholder="Comment">
                        <button class="submit-comment" type="submit">Send</button>
                    </label>
                </form>
                <br>
                <time class="date">{{date this.createdAt}}</time>
            </div>
        </div>
    {{/each}}`
let template = document.querySelector('.cards-container').innerHTML;
let cardTemplate = Handlebars.compile(`<div class="cards-container">
    {{#each cards}}
        <div class="card">
            <div class="card-title">
            </div>
            <div class="media">
                <div class="media-content">
                    <a class="card-title-url title is-4" href="{{this.post_url}}">{{this.title}}</a>
                </div>
            </div>
            <div class="content">
                <form action="/api/comments" method="post">
                    <label>
                        <input class="comments-input" name="comment_text" placeholder="Comment">
                        <button class="submit-comment" type="submit">Send</button>
                    </label>
                </form>
                <br>
                <time class="date">{{date this.createdAt}}</time>
            </div>
        </div>
    {{/each}}
</div>`);

class Card{
      constructor(comments, createdAt, id, post_url, title, user, vote_count) {
            this.comments = comments;
            this.createdAt = createdAt;
            this.id = id;
            this.post_url = post_url;
            this.title = title;
            this.user = user;
            this.vote_count = vote_count;
      }
}
const postCardsContainer = document.querySelector("#entry-template").innerHTML;
let t = Handlebars.compile(postCardsContainer);


// let cards = [];
//
//       req.forEach(r => {
//             let card = new Card(r.comments, r.createdAt, r.post_url, r.user.username, r.title, r.vote_count)
//             cards.push({
//                   title: r.title,
//                   post_url: r.post_url,
//                   createdAt: r.createdAt,
//             });
//             return cards;
//
//       });
//       t({
//             cards: cards
//       })
function cards(){
      // let cd = new Card(r.comments, r.created_at, r.post_url, r.title, r.user, r.vote_count);
      let date = new Date(r.created_at).toLocaleDateString();
      let cd = new Card(r.comments, date, r.post_url, r.title, r.user.username, r.vote_count);
      let cardEl = document.createElement('div');
      let cardTitle = document.createElement('div');
      let cardHref=document.createElement('a');
      let contentSection = document.createElement('div');
      let dateCreated = document.createElement('p');
      let comments = document.createElement('input');
      let sendComment = document.createElement('')
      
      contentSection.className = 'content';
      cardEl.className = 'card';
      cardTitle.className = 'card-title';
      cardHref.className = 'card-title-url'; cardHref.href = r.post_url;
      cardHref.textContent=r.title;
      dateCreated.className = "date";
      dateCreated.textContent = date;
      comments.className  = "comments-input";
      comments.placeholder="Comment";
      comments.name = "comments";
      
      cardEl.appendChild(contentSection)
      contentSection.appendChild(cardTitle);
      contentSection.appendChild(comments);
      contentSection.appendChild(dateCreated);
      cardTitle.appendChild(cardHref);
      postCardsContainer.appendChild(cardEl);
}
