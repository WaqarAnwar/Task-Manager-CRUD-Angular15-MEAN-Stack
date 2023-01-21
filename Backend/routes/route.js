const express=require('express');
const router=express.Router();
const Task=require('../models/tasks');

router.get('/tasks',(req,res,next)=>{
    //getting tasks list
    Task.find(function(err,tasks){
        res.json(tasks);
    })
})

router.get('/viewtask/:id',(req,res,next)=>{
  //viewing an task

Task.findById({_id:req.params.id})
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
  });


})

router.post('/add',(req,res,next)=>{
    //adding a task
    let newTask=new Task({
      task_name:req.body.task_name,
      complete:req.body.complete

    })

    newTask.save((err,Task)=>{
        if(err){
            res.json({msg: 'failed to add task'});
        }
        else{
            res.json({msg: 'task added successfully'});
        }
    })
})

router.delete('/delete/:id',(req,res,next)=>{
    //removing a task
    Task.remove({_id:req.params.id},function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json('task removed successfully');
        }
    })
})


//updating a task
router.post('/update/:id',(req,res,next)=>{
    const updateTask = {
      task_name:req.body.task_name,
      complete:req.body.complete
    };
    Task.updateOne({_id: req.params.id}, updateTask).then(
      () => {
        res.status(201).json({
          message: 'task updated successfully'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


  
module.exports = router;