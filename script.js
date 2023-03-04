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
let arr = [];
//constructor
function Constructor(id, heading, blog) {
  this.id = id;
  this.heading = heading;
  this.blog = blog;
}

cancelPostButton.addEventListener("click", () => {
  closeModal(modal);
});

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

// function publisPost(e, id) {
//   e.preventDefault();
//   const form = document.querySelector("#form");
//   let heading = form.heading.value;
//   let blog = form.blog.value;

//   let obj = arr.find((post) => post.id === id);

//   if (obj) {
//     obj.heading = heading;
//     obj.blog = blog;
//   } else {
//     obj = new Constructor(
//       (id = arr.length+1),
//       heading,
//       blog
//     );
//     arr.push(obj);
//   }

//   display(arr);
// }

function publisPost(e, id) {
  e.preventDefault();
  const form = document.querySelector("#form");
  let heading = form.heading.value;
  let blog = form.blog.value;

  let obj = arr.find((post) => post.id === id);
  //console.log(obj);

  if (obj !== undefined) {
    //    form.heading.value = obj.heading;
    //  form.blog.value= obj.blog;

    obj.heading = form.heading.value;
    obj.blog = form.blog.value;

    arr = [...arr.slice(0, id - 1), obj, ...arr.slice(id)];
  } else {
    let obj = new Constructor(
      (id = arr.length + 1),
      heading,
      blog
    );
    arr.push(obj);
  }
  console.log(arr);
  display(arr);
  closeModal(modal);
  //closeModal(document.querySelector('.modals.active'));
}

function display(arr) {
  blogList.innerHTML = "";
  arr.forEach((obj) => {
    const h3 = document.createElement("h3");
    h3.textContent = obj.heading;
    const h3div = document.createElement("div");
    h3div.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = obj.blog;
    const pdiv = document.createElement("div");
    pdiv.appendChild(p);

    const editPostButtton =
      document.createElement("button");
    editPostButtton.textContent = "edit post";
    editPostButtton.id = obj.id;
    editPostButtton.addEventListener("click", handleEdit);

    const deletePostButton =
      document.createElement("button");
    deletePostButton.textContent = "delete post";
    deletePostButton.id = obj.id;
    deletePostButton.addEventListener(
      "click",
      handleDelete
    );

    const div = document.createElement("div");
    div.append(
      h3div,
      pdiv,
      editPostButtton,
      deletePostButton
    );
    blogList.append(div);
  });
}

function handleDelete(event) {
  const index = arr.findIndex((item) => {
    return item.id === Number(event.target.id);
  });

  arr = [...arr.slice(0, index), ...arr.slice(index + 1)];

  // update ids
  arr.forEach((post, index) => {
    post.id = index + 1;
  });
  display(arr);
}

function handleEdit(event) {
  const obj = arr[event.target.id - 1];
  const form = document.querySelector("#form");
  form.heading.value = obj.heading;
  form.blog.value = obj.blog;
  // obj.heading = form.heading.value;
  // obj.blog = form.blog.value;
  openModal(modal);
  publishPostButton.removeEventListener(
    "click",
    publisPost
  );
  publishPostButton.addEventListener("click", (e) => {
    // e.stopPropagation();
    publisPost(e, obj.id);
  });
}
form.heading.addEventListener("click", function (e) {
  e.stopPropagation();
});

form.blog.addEventListener("click", function (e) {
  e.stopPropagation();
});

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

publishPostButton.addEventListener("submit", (e) => {
  publisPost(e, null);
  // e.stopPropagation();
});
