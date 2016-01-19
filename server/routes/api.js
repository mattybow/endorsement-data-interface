import express from 'express';
import mongodb from '../mongoAccess';
import mysqldb from '../mysqlAccess';
import MysqlTransaction from '../mysqlTransaction';
const debug = require('debug')('endorsement-data-interface:api-routes');
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

router.get('/tags',(req,res) => {
  mysqldb.query('SELECT ID AS id, TAG_NAME AS value FROM TAGS ORDER BY 2;', (err,results) => {
    res.json(results);
  });
})

router.post('/addCandidate', (req,res) => {
  if(req.session.passport){
    const {CAN_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME,PARTY,GENDER,DOB,AVATAR} = req.body;
    const argList = [CAN_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME,PARTY,GENDER,DOB,AVATAR];
    transaction.executeProcedure('ADD_CANDIDATE', argList).then(
      result => {
        const { code, ok } = result;
        res.status(code).json({ok});
      }
    );
  }
})

router.post('/addEndorsements', (req,res) => {
  if(req.session.passport){
    const { selectedTags, endorsers, selectedCandidate, source, date } = req.body;
    const txn = transaction.create();
    //if there are any new tags, insert them
    selectedTags.filter( tag => {
      const { isNew } = tag;
      return isNew;
    }).map(tag => {
        txn.insertIntoTable('TAGS',[tag.id, tag.value]);
    });

    endorsers.map(endorser => {
      const { END_ID, DESCRIPT, NAME, IS_ORG, AVATAR, WIKI_LINK } = endorser;
      //create the endorsers
      txn.insertIntoTable('ENDORSERS',[END_ID, DESCRIPT, NAME, IS_ORG, WIKI_LINK, AVATAR]);
      //tie endorsers to tags
      selectedTags.map( tag => {
        txn.insertIntoTable('ENDORSER_TAGS',[END_ID,tag.id]);
      });
      //tie endorser to candidate
      txn.insertIntoTable('ENDORSEMENTS',[selectedCandidate, END_ID, date, source, new Date(), new Date()]);
    });

    txn.execute()
       .then( result => {
         const { code, ok } = result;
         res.status(code).json({ok});
       });
    // res.json({ok:true});
    // transaction.create()
    //            .insertIntoTable('TAGS',['T12345','traditional marriage'])
    //            .insertIntoTable('TAGS',['T12346','congress'])
    //            .on('COMMIT',() => {
    //              debug('committed');
    //            })
    //            .on('ROLLBACK',() => {
    //              debug('rolled back');
    //            })
    //            .execute()
    //            .then( result => {
    //              const { code, ok } = result;
    //              res.status(code).json({ok});
    //            });
  }
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
