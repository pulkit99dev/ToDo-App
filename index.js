const express = require('express');
const app = express();
const port = 9001;
const db = require('./config/mongoose');
const Task = require('./models/tasks');


app.use(express.static('./assets'));

// Using Express Router

app.use('/', require('./routes/index'))

//Setting Up View Engine

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());

// Creating Route for Adding Task Button

app.post('/create-task', function(req,res){
    
    Task.create({
        description: req.body.description,
        date: req.body.date,
        category: req.body.category
    }, function(err, newTask){
        if(err){console.log('error in creating a contact');
        return;}

        console.log('******', newTask);
        return res.redirect('back');
    });
});

// create route for delete tasks button

app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Task.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {    // if multiple task is to be deleted
        for (let i = 0; i < ids.length; i++) {
            Task.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});



//create route for category-wise button------ innovation for 10 marks

app.post('/retrieve-category',function(req,res){
    var retrieveCategory = req.body.retrieveCategory;
    console.log(req.body.retrieveCategory);
    Task.find({category: retrieveCategory}, function(err, tasks){
        if(err){console.log('error in fetching tasks from db');
        return;}
    return res.render('home',{
        title: "To-Do list",
        task_list : tasks
    });
});
})

// Setting up the Server & Make the work listen on port
app.listen(port, function(err){
    if(err){
        // Interpolation
        console.log(`Error in running the server on port: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});