var express = require('express');
var mockjs = require('mockjs');
var router = express.Router();

var makeList = function(){
    var data = [];
    data.push({
        'date':'2014/03/31',
        'intro':'是时候展现真正的技术了',
        'media':'<img src="./img/q1.jpg" width="370"/>',
        'like':1,
        'comment':2
    });
    data.push({
        'date':'2014/03/30',
        'intro':'我还以为你从来都不会选我呢',
        'media':'<img src="./img/tupian3.jpg" width="370"/>',
        'like':25838,
        'comment':2
    });
     
    data.push({
        'date':'2014/02/28',
        'intro':'听候您的吩咐，主人',
        'media':'<img src="./img/q3.jpg" width="370px">',
        'like':0,
        'comment':0
    });
     
    data.push({
        'date':'2014/01/20',
        'intro':'今天是20号哟，很开心，找不到js代码',
        'media':'<img src="./img/q5.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
     
    data.push({
        'date':'2014/01/10',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
     
    data.push({
        'date':'2014/01/05',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });

    data.push({
        'date':'2013/12/31',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/q2.jpg" width="370px">',
        'like':302,
        'comment':1
    });
     
    data.push({
        'date':'2013/12/30',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
     
    data.push({
        'date':'2013/11/28',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/q4.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
     
    data.push({
        'date':'2013/10/20',
        'intro':'今天是20号哟，很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
     
    data.push({
        'date':'2013/10/10',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/q6.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
     
    data.push({
        'date':'2013/09/05',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
    data.push({
        'date':'2013/09/03',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
    data.push({
        'date':'2013/09/02',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':25838,
        'comment':1
    });
    data.push({
        'date':'2013/09/01',
        'intro':'今天很开心，找不到js代码',
        'media':'<img src="./img/tupian3.jpg" width="370px">',
        'like':14838,
        'comment':1
    });
    return data;
}


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


// get data
router.get('/get/data',function(req,res,next){
	var data=makeList();
	res.json(data)
});


module.exports = router;
