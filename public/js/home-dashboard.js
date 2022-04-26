document.addEventListener('DOMContentLoaded', async() => {
  
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
      if ($navbarBurgers.length > 0) {
            
            $navbarBurgers.forEach(el => {
                  el.addEventListener('click', () => {
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);
                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                  });
            });
      }
})

document.querySelector('#new-posts').onsubmit=(e)=>{
      console.log(e);
      window.location.reload();
}
// document.querySelector('.comment-form').addEventListener('submit', async(e)=>{
//       e.preventDefault();
//       await fetch('/api/comments',{
//             method: 'post',
//             body: {
//                   comment: {
//                         comment_text: document.querySelector('.comments-input').value,
//                         post_id: document.querySelector('.comments-input-id').value
//                   }
//             }
//       })
// })

