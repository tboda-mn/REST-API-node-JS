const Joi=require('joi');//returns a class
const { response } = require('express');
const express=require('express');//returns a function
const app = express();//provides methods like get,post,put,delete i.e. http verbs
app.use(express.json());//to use middleware in request processing

const courses=[{id:1,name:'course1'},
                {id:2,name:'course2'},
                {id:3,name:'course3'}
];
app.get('/',(req,res) => {//first argument is url/path,2nd argument is callback fn or route handler,these are API's
    res.send('Hello Worldd');//res stands for resource

});

app.get('/api/courses',(req,res) => {//to get all the courses
    res.send(courses);
});


app.get('/api/courses/:id',(req,res)=>{//use colon in order to declare a parameter
    //res.send(req.params.id);//to get a single course
    const course = courses.find(c => c.id === parseInt(req.params.id));//For example, if you have a route as /api/:name, then the "name" property is available as req.params.name.
    if(!course){//if we dont find a coure of given id,return 404
            res.status(404).send('The course with given ID was not found')
    }
    res.send(course);
});

app.post('/api/courses',(req,res) => {//to add courses
    //const {error}=validateCourse(req.body);//to get result.error

    //otherwise validate,lyt
    //if invalid, return 404,lyt
    // if(error){
    //         res.status(400).send(error.details[0].message);
    //         return;
    // }

    if(!req.body.name || req.body.name.length<3){//this is for input validation, there should be a property called name in the body to be posted and the value should be at least 3 characters
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name//we assumed there is a property called name in body of the request, therefore we need input validations
    };
    courses.push(course);
    res.send(course);//client needs to know id of this new object
})

app.put('/api/courses/:id',(req,res) => {
    //look up the course with given id
    //if not existing,return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));//For example, if you have a route as /api/:name, then the "name" property is available as req.params.name.
    if(!course){//if we dont find a coure of given id,return 404
            res.status(404).send('The course with given ID was not found')
            console.log("Course not found");
    }

    // const {error}=validateCourse(req.body);//to get result.error

    // //otherwise validate,lyt
    // //if invalid, return 404,lyt
    // if(error){
    //         res.status(400).send(error.details[0].message);
    //         return;
    // }
    //update course and return updated course
    course.name=req.body.name;//updating name of the course
    res.send(course);

})

// function validateCourse(course){
//     const schema = {
//            name: Joi.string().min(3).required()
//     };
//     return Joi.validate(course,schema);//returns an object
// }
//PORT
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));//we have to listen on a given port









