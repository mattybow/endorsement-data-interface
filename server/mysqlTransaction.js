import Promise from 'bluebird';

class MySqlTransaction {
  constructor(conn){
    this.connection = conn;
    this.queries = [];
    this.onCommit=() => {};
    this.onRollback=()=> {};
  }
  create(){
    return new MySqlTransaction(this.connection);
  }
  insertIntoTable(tableName,values){
    const query = `INSERT INTO ${tableName} VALUES(${this.connection.escape(values)});`;
    this.queries.push(query);
    return this;
  }
  addTo(procName, argList){
    const query = `CALL ${procName}(${this.connection.escape(argList)});`;
    this.queries.push(query);
    return this;
  }
  on(event, callback){
    switch(event){
      case 'COMMIT':
        this.onCommit = callback;
        break;
      case 'ROLLBACK':
        this.onRollback = callback;
    }
    return this;
  }
  execute(){
    const { connection, onCommit, onRollback, queries } = this;
    const query = queries.join('');
    return new Promise(resolve => {
      connection.beginTransaction(err => {
        if (err) { throw err; }
        connection.query(query, (err,rows)=>{
          if(err) {
            console.log(err);
            connection.rollback(onRollback);
            resolve({code:500, ok:false, err });
          } else {
            connection.commit(onCommit);
            resolve({code:201, ok:true, rows });
          }
        });
      });
    });
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
