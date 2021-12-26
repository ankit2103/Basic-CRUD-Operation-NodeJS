const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose')

 //Get All User
router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        });
    }).catch(err=>{
        res.status(500).json({
            message:"Something went worng"
        })
    })
})

//Add User
router.post('/',(req,res,next)=>{
    console.log(req.body.email);
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })

    student.save()
    .then(result=>{
        console.log(result)    ;
        res.status(200).json({
            newStudent:result
        })    
    })
     .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:"something went wrong"
        })
    })
})

//Get Single User
router.get('/:id',(req,res,next)=>{
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            studentData:result
        });
    }).catch(err=>{
        res.status(500).json({
            message:"Something went worng"
        })
    })
})

//Delete User
router.delete('/:id',(req,res,next)=>{
    Student.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'delete successfully'
        });
    }).catch(err=>{
        res.status(500).json({
            message:"Something went worng"
        })
    })
})


//Put Request
router.put('/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            message:'updated successfully'
        });
    }).catch(err=>{
        res.status(500).json({
            message:"Something went worng"
        })
    })
})


module.exports = router
