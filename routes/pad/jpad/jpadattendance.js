module.exports = function(app){

  app.get('/jpadattendance/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      res.render('jpadattendance');
    }
    else{
      res.redirect('/');
    }
  });
}
