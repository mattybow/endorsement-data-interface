import express from 'express';
import mongodb from '../mongoAccess';
const router = express.Router();

router.get('/data',(req,res) => {
  console.log(req.session.passport);
  if(req.session.passport){
    mongodb.twStream.find({},null,{sort:{created_time:-1}, limit: 1000},(err,data)=>{
      res.json(data);
    });
  } else {
    res.status(401)
       .json([]);
  }

});

router.post('/deleteTweet',(req,res) => {
  const {body:{id}, session:{passport}} = req;
  console.log(passport);
  if(id && passport){
    mongodb.twStream.remove({_id:id}, (err,data) => {
      if (err){
        res.status(500).json({err});
      } else {
        res.json(data);
      }
    });
  } else {
    res.status(500).send('Bad Request');
  }
});

export default router;
