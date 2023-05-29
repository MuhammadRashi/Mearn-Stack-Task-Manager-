const express = require("express");
const app = express();
const cors=require("cors");
// import { v4 as tskId } from "uuid";
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.json());

const todoList =[{
    key:"test",
    task:"test",
    tag:false,
    complete:false
},
]


// app.get(["/api/todo","/api/todo2"],(req,res)=>{         ---  same method calling api/todo and api/todo2
app.get("/api/todo",(req,res)=>{
    // res.json("Get Method");
    // res.status(200).json("Get Method");
    // console.log(todoList,"=list");
    res.status(200).json(todoList);
});


app.post("/api/todo",(req,res)=>{
    const {todo} = req.body;  // pass item from task to backend

    console.log(todo,"task");

    if(!("todo" in req.body)){
        return res.status(400).json({
            message:`${JSON.stringify(
                req.body
            )}: This attribute is not accepted, required attributes: todo`,
        });
    }

    const newTask ={
        key:uuidv4(),
        task:todo,
        tag:false,
        complete:false

        // id:uuidv4(),
        // todo:todo,
        // isComplete:false
    };

    todoList.push(newTask);
    res.json(todoList);
});


app.put("/api/todo",(req,res)=>{
    // destructure body data
    const{id,todo,tag,isCompleted} = req.body;

    console.log(id,"===id");

    // find id exist in todoList 
    const isExist=todoList.find((data)=> data.key === id);

     console.log(req.body,"==tst");

        // update edited data
    if(isExist){
        todoList.forEach((todoItem) => {
            if (todoItem.key === id) {
               todoItem.task = todo;
               todoItem.tag = false;
               todoItem.complete = isCompleted || false;

            }
         });

         return res.json(todoList);
         
    }

    res.status(404).json({
        message: `Item with id: ${id} does not exist`,
     });
});


app.patch("/api/todo",(req,res)=>{
    // destructure body data
    const{id} = req.body;

    // console.log(id,"====id");

    const todoIndex = todoList.findIndex((item) => item.key === id);
    if(todoIndex !== -1){

        if(todoList[todoIndex].complete){
            // console.log(todoList[todoIndex].complete,"====id");
            todoList[todoIndex].complete=false
            return res.json(todoList);
        }else{
            // console.log(todoList[todoIndex].complete,"====id");
            todoList[todoIndex].complete=true

            return res.json(todoList);
        }

    }else{
        res.status(404).json({
            message: `Item with id: ${id} does not exist`,
         });

    }


    // if(todoIndex !== -1){
    //     if(todoList[todoIndex].complete){
    //         todoList[todoIndex].complete=false;
    //     }else{
    //         todoList[todoIndex].complete=tr;
    //     }
    // }
        

});


app.delete("/api/todo", (req, res) => {
    const { id } = req.body;
    
    // if data exist return index 
    const todoIndex = todoList.findIndex((item) => item.key === id);

 
        // index not exist return -1
    if (todoIndex !== -1) {
       todoList.splice(todoIndex, 1);
       return res.json(todoList);
    }
 
    res.status(404).json({ message: "Item does not exist" });
 });


 app.all("*", (req, res) => {
    res.status(404).json("This page does not exist");
 });



// in get method not exist page
// app.get("*",(req,res)=>{
//     // res.json("Get Method");
//     res.status(200).json("This page is not exist");
// });



// used for all methods like get(),POST method
// app.all("*",(req,res)=>{
//     // res.json("Get Method");
//     res.status(200).json("This page is not exist");
// });









// -------------------------------
// const todoTask=[{key:"aldj",task:"test",tag:false,complete:false}];
// const todoTask=[{
//     key: 11,
//     task: "inputValue",
//     tag: false,
//     complete:false,
// }
// ];

// app.post("/api/addtodo",(req,res)=>{
//         // res.json(todoTask);
//         console.log(req.body.task);
        
//         res.json(todoTask);

// })

// -------------------------

const PORT=3005;

app.listen(PORT, () => {
   
    console.log(`Server is running on Port: ${PORT}`);
});

