const router = require('express').Router(); //required express router because this is the route that we are creating
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res)=>{
    Exercise.find() //mongoose command
    .then(exercises => res.json(exercises))
    .catch(err=> res.status(400).json(`Error:${err}` ));
    });

    router.route('/add').post((req,res)=>{
        const username = req.body.username;
        const description = req.body.description;
        const duration= Number(req.body.duration);
        const date=Date.parse(req.body.date);
     
        const newExercise = new Exercise({
            username,
            description,
            duration,
             date,
            });
        newExercise.save()
        .then(()=>res.json('Exercise added!'))
        .catch(err=>res.status(400).json('Error:'+err));
    });

router.route('/:id').get((req,res)=>{   //id is variable ; object id automatically created by mongodb
    Exercise.findById(req.params.id)   //gonna get the id directly from the URL
    .then(exercise=> res.json(exercise)) //if ex found, return as json else return error
    .catch(err =>res.status(400).json('Error:'+err));
});

router.route('/:id').delete((req,res)=>{ //delete req => find by id and delete
    Exercise.findByIdAndDelete(req.params.id) 
    .then(()=>res.json('Exercise deleted.'))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/update/:id').post((req,res)=>{ //update the object
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username=req.body.username;   //old will get updated to new
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date=Date.parse(req.body.date);

        exercise.save() //save with new info
        .then(()=>res.json('Exercise updated!'))
        .catch(err=>res.status(400).json('Error:' +err));


          
    })
    .catch(err=>res.status(400).json('Error:'+err));
})


    module.exports = router;

    