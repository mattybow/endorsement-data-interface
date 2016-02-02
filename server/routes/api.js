import express from 'express';
import mongodb from '../mongoAccess';
import mysqldb from '../mysqlAccess';
import MysqlTransaction from '../mysqlTransaction';
import moment from 'moment';
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
    mysqldb.query(`SELECT CAN_ID as id,
                      FIRST_NAME as firstName,
                      MIDDLE_NAME as middleName,
                      LAST_NAME as lastName,
                      PARTY as party,
                      GENDER as gender,
                      DOB as dob,
                      AVATAR as avatar,
                      ACTIVE as active
                      FROM CANDIDATES;`, (err,results) => {
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

router.get('/endorsers',(req,res) => {
  if(req.session.passport){
    mysqldb.query(`SELECT AVATAR as avatar,
                    NAME as name,
                    e.END_ID as id,
                    DESCRIPT as descript,
                    IS_ORG as isOrg,
                    WIKI_LINK as wikiLink,
                    modified,
                    group_concat(t.id) as tagIds,
                    group_concat(t.tag_name) as tags
                  FROM ENDORSERS e join ENDORSER_TAGS et on e.end_id = et.end_id
                  join TAGS t on et.tag_id = t.id
                  group by e.END_ID
                  ORDER BY e.END_ID DESC;`, (err,results) => {
      res.json(results);
    });
  } else {
    res.status(401)
       .json([]);
  }
});

router.get('/endorsements',(req,res) => {
  if(req.session.passport){
    const query = `SELECT
                        e.id,
                        ee.name endorser,
                        e.end_id,
                        ee.avatar end_avatar,
                        CONCAT(c.first_name, ' ', c.last_name) candidate,
                        c.can_id,
                        c.avatar can_avatar,
                        e.date,
                        e.source,
                        e.confirmed,
                        e.modified,
                        e.quote
                    FROM
                        endorsements e
                            JOIN
                        endorsers ee ON e.end_id = ee.end_id
                            JOIN
                        candidates c ON e.can_id = c.can_id
                    ORDER BY e.date DESC, e.modified DESC;`;
    mysqldb.query(query, (err,results) => {
      res.json(results);
    });
  } else {
    res.status(401)
       .json([]);
  }
});

router.post('/updateEndorsement',(req,res) => {
  if(req.session.passport){
    const { date, source, confirmed, id, quote } = req.body;
    const txn = transaction.create();
    txn.addTo(`UPDATE ENDORSEMENTS
                SET DATE=${mysqldb.escape(new Date(date))},
                    SOURCE=${mysqldb.escape(source)},
                    CONFIRMED=${mysqldb.escape(confirmed)},
                    QUOTE=${mysqldb.escape(quote)}
                WHERE ID=${mysqldb.escape(id)};`)
        .execute()
        .then( result => {
          const { code, ok } = result;
          res.status(code).json({ok});
        });
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
    const { newTags, endorsers, selectedCandidate, source, date } = req.body;
    const txn = transaction.create();
    //if there are any new tags, insert them
    newTags.map(tag => {
        txn.insertIntoTable('TAGS',[tag.id, tag.value]);
    });

    endorsers.map(endorser => {
      const { END_ID, DESCRIPT, NAME, IS_ORG, AVATAR, WIKI_LINK, TAGS=[], IS_NEW } = endorser;
      //create the endorsers
      if(IS_NEW){
        txn.insertIntoTable('ENDORSERS',[END_ID, DESCRIPT, NAME, IS_ORG, WIKI_LINK, AVATAR, new Date()]);
      }
      //tie endorsers to tags
      TAGS.map( tag => {
        txn.insertIntoTable('ENDORSER_TAGS',[END_ID,tag.id]);
      });
      //tie endorser to candidate
      txn.insertIntoTable('ENDORSEMENTS',
        ['CAN_ID', 'END_ID', 'DATE', 'SOURCE', 'CREATED', 'MODIFIED', 'CONFIRMED', 'QUOTE'],
        [selectedCandidate, END_ID, date, source, new Date(), new Date(), 0, null]
      );
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
