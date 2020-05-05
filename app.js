//Loading API methods
var methods =  require('./activity/logic')


function endpoints(app)
{

//GETDATA form json file
app.get('/getall', function (req, res) {methods.Get(req,res)})
//Request Parameters
app.get('/getspecific', function (req, res) {methods.GetSpecific(req,res)})
//Post Parameters
app.post('/post', function (req, res) {methods.Post(req,res)})
//Highest Cases
app.get('/highest',function(req,res){methods.Highest(req,res)})
//Update
app.post('/update',function(req,res){methods.Update(req,res)})

}



//Export methods in the file app.js
module.exports = {endpoints}
