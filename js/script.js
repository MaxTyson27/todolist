
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplited = document.querySelector('.todo-completed');

let toDoData = [];

const getStorage = function () {
  if(JSON.parse(localStorage.getItem('arr')) === null){
    return false
  } else {
    toDoData = JSON.parse(localStorage.getItem('arr'));
    render();
  }
}


const render = function() {
  todoList.innerHTML = '';
  todoComplited.innerHTML = '';
  localStorage.clear();
  let countStorage = []
  toDoData.forEach(function(item, index) {
    const li = document.createElement('li');

    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
    '<div class="todo-buttons">' +
		'<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>' +
		'</div>'

    if(item.complited) {
      todoComplited.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function(){
      item.complited = !item.complited
      render();
    })
    li.querySelector('.todo-remove').addEventListener('click', function(){
      toDoData.splice(index,1);
      render();
    })

    countStorage.push(item);
    localStorage.setItem('arr', JSON.stringify(countStorage));
  })
  
}

todoControl.addEventListener('submit', function (e) {
  e.preventDefault();
  if(headerInput.value == ''){
    return false
  }

  const newToDo = {
    text: headerInput.value,
    complited: false,
  }

  toDoData.push(newToDo);
  headerInput.value = '';
  render();

})

getStorage();






