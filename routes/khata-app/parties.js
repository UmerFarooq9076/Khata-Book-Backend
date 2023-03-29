const express = require('express');
const routes = express.Router();
const parties = require('../../models/khata-app/all-parties');
const userAuth = require('../../middleware/user-auth');

routes.get('/',userAuth ,(req,res,next)=>{
    parties.find().then((result)=>{
        res.status(200).json({record: result});
    }).catch((err)=>{
        res.status(500).json({error: err});
    })
});

routes.get('/:id',userAuth,(req,res,next)=>{
    parties.findById(req.params.id).then((result)=>{
        res.status(200).json({record: result});
    }).catch((error)=>{
        res.status(500).json({error: error});
    });
});

routes.post('/',userAuth,(req,res,next)=>{
    const partie = new parties({
        serialNumber: req.body.serialNumber,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        detail: req.body.detail
    });

    partie.save().then((result)=>{
        res.status(200).json({message: 'partie Added Successfully.'});
    }).catch((err)=>{
        res.status(500).json({message: err});
    });
});

routes.put('/:id',userAuth,(req,res,next)=>{
    parties.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            serialNumber: req.body.serialNumber,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            detail: req.body.detail
        }
    }).then((result)=>{
        res.status(200).json({message: "Record Updated Successfully."})
    }).catch((err)=>{
        res.status(500).json({error: err});
    });
});

// delete record by id.
routes.delete('/:id',userAuth,(req,res,next)=>{
    parties.findByIdAndDelete({_id: req.params.id}).then((result)=>{
        res.status(200).json({
            message: 'Student deleted successfully.'
        }).catch((err)=>{
            res.status(500).json({
                error: err
            });
        });
    });
});


module.exports = routes;