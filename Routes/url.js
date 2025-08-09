const express=require('express');
const {handlegenerateshorturl,getanalytics}=require("../controller/url");
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("succesufull run");
})

router.post('/',handlegenerateshorturl);
router.get('/analytics/:shortId',getanalytics);

module.exports=router;