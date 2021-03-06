let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
window.onload = () => {
  renderNotification();
  renderBlogs();
};

function renderNotification() {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "list-group list-unstyled");
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].user.id == lcoalUser.id) {
      for (let j = 0; j < blogs[i].likedby.length; j++) {
        let likeby = blogs[i].likedby[j].name;
        let li = document.createElement("li");
        li.setAttribute("class", "list-item");
        li.textContent = `Your post liked by @${likeby}`;
        ul.append(li);
      }
    }
  }
  notify.append(ul);
}

function like(tar) {
  event.preventDefault();
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].id == tar.id) {
      blogs[i].likes += 1;
      blogs[i].likedby.push(getlcoalUser());
      tar.id++;
      localStorage.setItem("blogs", JSON.stringify(blogs));
      blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      console.log(blogs);
      renderBlogs();
    }
  }
}

function renderBlogs() {
  let contianer = document.getElementById("home-blog-container");
  // contianer.innerHTML = "";
  for (let i = blogs.length - 1; i >= 0; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row my-2");
    row.innerHTML = createRow(blogs[i]);
    contianer.append(row);
  }
}

function createRow(blog) {
  // let userPic = blog.user.picture;
  let likedpep = blog.likedby
    .map((p, i) => {
      if (i <= 3) {
        blog.likes--;
        return p.name;
      }
    })
    .join(" ");
  let html = `
          <div class="card mx-auto" style="width: 50%;">
            <div class="card">
              <a class="nav-link" href="#"
                ><img
                  src="./images/monk-avtar.png"
                  alt="Monk Arena"
                  class="img-fluid img-responsive rounded-circle"
                  style="width: 27px; height: 27px;"
                /><span class="mx-2"></span>${blog.user.name || "Anonymus"}</a
              >
            </div>
            <img
              class="img-fluid"
              src="${blog.photo}"
              alt="Card image cap"
            />
            <div class="card-body">
              <ul class="list-group list-group-horizontal list-unstyled">
                <li class="nav-item active">
                  <a class="nav-link" href="#"
                    ><img
                      src="https://image.flaticon.com/icons/svg/2462/2462719.svg"
                    /><span class="sr-only">(current)</span></a
                  >
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#"
                    ><img
                      src="https://image.flaticon.com/icons/svg/2089/2089310.svg"
                  /></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" id="${
                    blog.id
                  }" onclick="like(this)"
                    ><img
                      src="https://image.flaticon.com/icons/svg/833/833472.svg"
                  /></a>
                </li>
              </ul>
              <p class="card-text text-muted">
                <small class="form-text text-muted"
                  >Liked by ${likedpep} & other ${blog.likes} People</small
                >

                <a href="./blog.html?${blog.id}"
                  ><span class="text-info">
                    "${blog.title}"</span
                  ></a
                >
                <a href="#">
                  <small class="form-text text-muted"
                    >View all ${blog.comments || 0} commnents</small
                  >
                </a>
                ${
                  blog.comments
                    ? renderBlogComments(blog.comments)
                    : "<p>No Comments </p>"
                }
              </p>
            </div>
          </div>`;
  return html;
}

function renderBlogComments(comments) {
  let res = "";
  for (let i = comments.length - 1; i >= 0; i--) {
    let comment = `<small class="form-text text-dark"
     >${comments[i].comment}<span class="text-info mx-1">@${comments[i].userName}</span></small
   >`;
    res += comment;
  }
  return res;
}
