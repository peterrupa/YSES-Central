module.exports = function(app,pool){
  app.get('/getBatch',function(req,res){
    pool.getConnection(function(err,connection){
      var query = "SELECT batch FROM `org_batch` WHERE 1 ORDER BY id";

      connection.query(query,function(err,batch){
				//place these results in an array
				var send = [];

				for(var i = 0; i < batch.length; i++){
					send.push(batch[i]["batch"]);
				}

        res.send(send);
      });
      connection.release();
    });
  });
}
