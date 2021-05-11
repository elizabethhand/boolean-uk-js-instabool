const imageContainerEl = document.querySelector(".image-container");


function createForm (){
    const formEl= document.createElement('form')
    formEl.classList.add("comment-form", "image-card")

    const formTitleEl= document.createElement('h2')
    formTitleEl.setAttribute("class", "title");
    formTitleEl.innerText = "New Post"

    const addTitleEl=document.createElement('input')
    addTitleEl.setAttribute("type", "text")
    addTitleEl.setAttribute("name", "title")
    addTitleEl.setAttribute("id", "image")
    addTitleEl.placeholder="Comment"

    const commentBtn=document.createElement('button')
    commentBtn.setAttribute("class", "comment-button")
    commentBtn.setAttribute("type", "submit")
    commentBtn.innerText = "Post"

    imageContainerEl.append(formEl)
    formEl.append(formTitleEl, addTitleEl, commentBtn)

    formEl.addEventListener("submit", function(comment){
        console.log(comment)
        fetch('http://localhost:3000/comments', {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       content: comment.target.title.value,
       imageId: 1
   })
})
   .then(function (resp) {
    return resp.json();
  })
  .then(function (comment) {
    var comments= document.querySelector(".comments")
    console.log(comment)
    const newComment = document.createElement("li");
    newComment.innerText = comments;
    comments.append(newComment);
  })



      });
    }


function createCards(imagesData) {
    for (const imageData of imagesData) {
        const articleEl = document.createElement("article");
  articleEl.setAttribute("class", "image-card");

  const h2El = document.createElement("h2");
  h2El.setAttribute("class", "title");
  h2El.innerText = imageData.title;

  const imageEl = document.createElement("img");
  imageEl.setAttribute("class", "image");
  imageEl.setAttribute("src", imageData.image);

const likeSectionEl= document.createElement ('div')
likeSectionEl.setAttribute("class", "likes-section")

const likesEl= document.createElement ('span')
likesEl.setAttribute("class", "likes")
likesEl.innerText= `${imageData.likes} likes `

const likesBtnEl= document.createElement ('button')
likesBtnEl.setAttribute("class", "like-button")
likesBtnEl.innerText= "♥"


  const ulEl = document.createElement("ul");
  ulEl.setAttribute("class", "comments");

  for (const comment of imageData.comments) {
    const liEl = document.createElement("li");
    liEl.innerText = comment.content;
    ulEl.append(liEl);
  }

const commentForm=document.createElement('form')
commentForm.setAttribute ("class", "comment-form")

const addComment=document.createElement ('input')
addComment.setAttribute("class", "comment-input")
addComment.setAttribute("type", "text")
addComment.setAttribute("name", "comment")
addComment.placeholder="Add a comment..."

const commentBtn=document.createElement('button')
commentBtn.setAttribute("class", "comment-button")
commentBtn.setAttribute("type", "input")
commentBtn.innerText="Post"

commentForm.addEventListener("submit", function(comment) {
    comment.preventDefault()
    console.log(comment)

    fetch('http://localhost:3000/comments', {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       content: comment.target.comment.value,
       imageId: 1
   })
})
   .then(function (resp) {
    return resp.json();
  })
  .then(function (comment) {
    var comments= document.querySelector(".comments")
    console.log(comment)
    const newComment = document.createElement("li");
    newComment.innerText = comments;
    comments.append(newComment);
  })
    
})


  likeSectionEl.append(likesEl, likesBtnEl)
  articleEl.append(h2El, imageEl,likeSectionEl, ulEl, commentForm); 
  commentForm.append(addComment, commentBtn)

  imageContainerEl.append(articleEl);

likesBtnEl.addEventListener("click", function() {
    likeCounter(imageData)
})

    }}


  function likeCounter (imageData){
    let updateLike=document.querySelector(".likes")
    //   console.log(updateLike)
    imageData.likes++


    fetch('http://localhost:3000/images/1', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: imageData.likes})
    })

    .then(function (response) { return response.json() })
    .then(function (imageData) {updateLike.innerText = `${imageData.likes} likes` })

  }

//   function addComment(event){
//       console.log("hello")
//   }

fetch("http://localhost:3000/images")
  .then(function(response) {
    return response.json()
  })
  .then(function(image) {
    createCards(image)
})

createForm()