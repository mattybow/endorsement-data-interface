import Promise from 'bluebird';

class MySqlTransaction {
  constructor(conn){
    this.connection = conn;
  }
  executeProcedure(procName, argList){
    const query = `CALL ${procName}(${this.connection.escape(argList)})`;
    return new Promise(resolve => {
      this.connection.query(query, (err,rows)=>{
        if(err) {
          console.log(err);
          resolve({code:500,ok:false,err});
        } else {
          resolve({code:201,ok:true,rows});
        }
      });
    });
  }
}

export default MySqlTransaction;
