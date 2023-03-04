// variables
const openModalButton = document.querySelectorAll(
  "[data-modal-target]"
);
const closeModalButton = document.querySelectorAll(
  "[data-close-button]"
);
const overlay = document.querySelector(".overlay");

const publishPostButton = document.getElementById("form");
const cancelPostButton =
  document.querySelector(".cancel-post");

const blogList = document.querySelector(".blog-list");
const arr = [];
//constructor
function Constructor(id, heading, blog) {
  this.id = id;
  this.heading = heading;
  this.blog = blog;
}

// functions
function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function publisPost(e) {
  e.preventDefault();
  const form = document.querySelector("#form");
  let heading = form.heading.value;
  let blog = form.blog.value;

  let obj = new Constructor(
    (id = arr.length),
    heading,
    blog
  );
  arr.push(obj);
  // console.log(arr)
  display(obj);
}

function display(obj) {
  const h3 = document.createElement("h3");
  h3.textContent = obj.heading;
  const h3div = document.createElement("div");
  h3div.appendChild(h3);

  const p = document.createElement("p");
  p.textContent = obj.blog;
  const pdiv = document.createElement("div");
  pdiv.appendChild(p);


  const editPostButtton = document.createElement('button');
  editPostButtton.textContent = 'edit post'

  const deletePostButton = document.createElement("button");
  deletePostButton.textContent = "delete post";


  
  const div = document.createElement("div");
  div.append(
    h3div,
    pdiv,
    editPostButtton,
    deletePostButton
  );
  blogList.append(div);
}

// eventlisteners
overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(
    ".modals.active"
  );
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

openModalButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(
      button.dataset.modalTarget
    );
    openModal(modal);
  });
});

closeModalButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modals");
    closeModal(modal);
  });
});

publishPostButton.addEventListener("submit", publisPost);
