import express from 'express';
import mongodb from '../mongoAccess';
const router = express.Router();


router.get('/data',(req,res) => {
  console.log(req.session);
  if(req.session.passport){
    mongodb.twStream.find({},null,{sort:{created_time:-1}, limit: 1000},(err,data)=>{
      res.json(data);
    });
  } else {
    res.json([]);
  }

});

export default router;
