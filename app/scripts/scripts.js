


$(document).ready(function() {
  //ALL CODE GOES IN HERE
  /*Remember, all of the code in our scripts.js will go within the curly braces of the above function.*/

  /*We are going to be creating a todo list. So the easiest way to store a list of things is to create an array! Listo will be our main array for storing tasks.*/
  var listo = [];

  /*Instead of storing strings we will be storing Task objects in our listo array. Because users will be making a lot of Tasks we can streamline the object creating process with a constructor*/
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  }

  /*This hides our newTaskForm until we need to create a new task*/
  $('#newTaskForm').hide();

  /*this function will allow for our tasks to be moved to the correct columns they need to be in.*/
  var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
      }
    }
    task.remove();
  };

  /*this function allows us to change the status of an item from 'new' to 'inProgress'*/
  $(document).on('click', '#item', function(e) {
      e.preventDefault();
      /*We are creating a variable so we can access the 'this' keyword to pass it to another function.*/
    var task = this;
    advanceTask(task);
    /*This changes it's ID to the string 'inProgress'.*/
    this.id = 'inProgress';
    /*The code gives us the ability to move the actual list item. We do thta by pulling all of the html around the item itself.*/
    $('#currentList').append(this.outerHTML);
  });

  /*Similar to the function above.*/
  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  /*similar to the above function. We are creating a way to delete the items on the list. We are pushing the task into the advanceTask function without a new id. if you look at the advanceTask function if it doesn't meet the if statements it is then deleted (.remove)*/
  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

  /*This is our AddTask function that will allow a user to input a task and hit save. We want to create an object and push it into our listo array.*/
  var addTask = function(task) {
    /*We need to add the code below so the code will only run if it is truthy. We do not want to save an empty string as a task.*/
    if(task) {
      /*We will call our task constructor and fill it with the new task, then we will push the new task to listo, and save it.*/
        task = new Task(task);
        listo.push(task);
        /*The below code allows the input form to clear after we hit save. and it allows us to show the new list item in our index.html*/
        $('#newItemInput').val('');
          $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + task.task + '</h3>'+
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>'
                    );

    }
    /*This code will hid the new task button and show the input form at the same time.*/
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  /*The jQuery event below calls the addTask function when we click the SaveNewItem button.*/
  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

//Opens form
  $('#add-todo').on('click', function () {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
//closes form
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

});
