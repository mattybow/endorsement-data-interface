import express from 'express';
import mongodb from '../mongoAccess';
const router = express.Router();


router.get('/data',(req,res) => {
  mongodb.twStream.find({},null,{limit: 1000},(err,data)=>{
    res.json(data);
  });
});

export default router;
