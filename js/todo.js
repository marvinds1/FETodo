//getting all the html elements
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

//form validation part/function
const formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Input field cannot be empty";
    // console.log("data not found")
  } else {
    msg.innerHTML = "";
    // console.log("data is there")
    getData();
    add.setAttribute("data-bs-toggle", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-toggle", "");
    })();
  }
};

//submit logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//getting the details from the form input and storing  it in  data
let data = [{}];

const getData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    task: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  //console.log("get", data);
  createtask();
};

//create function
const createtask = () => {
  tasks.innerHTML = "";
  data.map((ele, y) => {
    return (tasks.innerHTML += `<div id=${y}>
    <span class="fw-bolder">${ele.text}</span>
    <span class="medium">${ele.date}</span>
    <p class="fw-bold">${ele.task}</p>
    <span class="options">
    <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="ri-edit-2-fill"></i>
    <i onclick="deleteTask(this);createtask()" class="ri-delete-bin-5-fill"></i>
    </span>
</div>
    `);
  });
  resetTask();
};

//resetting the form logic

const resetTask = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  // console.log("reset", data);
  createtask();
})();

//edit function for todo
const editTask = (e) => {
  let task = e.parentElement.parentElement;
  textInput.value = task.children[0].innerHTML;
  dateInput.value = task.children[1].innerHTML;
  textarea.value = task.children[2].innerHTML;
  
  //task ,remove
  deleteTask(e);
};

//delete function for todo
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  // console.log(data);
};
