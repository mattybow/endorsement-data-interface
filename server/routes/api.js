import express from 'express';
import mongodb from '../mongoAccess';
import mysqldb from '../mysqlAccess';
import MysqlTransaction from '../mysqlTransaction';
const transaction = new MysqlTransaction(mysqldb);
const router = express.Router();

router.get('/tweets',(req,res) => {
  if(req.session.passport){
    mongodb.twStream.find({},null,{sort:{created_time:-1}, limit: 1000},(err,data)=>{
      res.json(data);
    });
  } else {
    res.status(401)
       .json([]);
  }

});

router.get('/candidates',(req,res) => {
  if(req.session.passport){
    mysqldb.query('SELECT * FROM CANDIDATES;', (err,results) => {
      res.json(results);
    });
  } else {
    res.status(401)
       .json([]);
  }
});

router.get('/candidate',(req,res) => {
  if(req.session.passport){
    res.json([]);
  } else {
    res.status(401)
       .json([]);
  }
});

router.post('/addCandidate', (req,res) => {
  const {CAN_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME,PARTY,GENDER,DOB,AVATAR} = req.body;
  const argList = [CAN_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME,PARTY,GENDER,DOB,AVATAR];
  transaction.executeProcedure('ADD_CANDIDATE', argList).then(
    result => {
      const { code, ok } = result;
      res.status(code).json({ok});
    }
  );
})

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
