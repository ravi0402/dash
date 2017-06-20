require('./db');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.send('hello dash!');
});
router.get('/users1', function (req, res, next) {

    client.query("SELECT COUNT(*) as ut FROM user WHERE created_at >= CURDATE()+' 00:00:00'" , function(err, results) {
        if (err)
        {
            throw err;
        }
        console.log(results);
        res.json(results);
    });
});
router.get('/users2', function (req, res, next) {

    client.query("SELECT COUNT(*) as uy FROM user WHERE created_at <= CURDATE() +'00:00:00' AND created_at >= CURDATE()-1 +'00:00:00';" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});

router.get('/usersRechargedTod', function (req, res, next) {

    client.query("SELECT COUNT(DISTINCT(user)) as a FROM billing_master WHERE is_current=0 AND payment_type !='tXtATQFJu1' AND payment_type !='GrG4RJBy3' AND created_at>=CURDATE() +' 00:00:00';" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});

router.get('/usersRechargedYest', function (req, res, next) {

    client.query("SELECT COUNT(DISTINCT(user)) as a FROM billing_master WHERE is_current=0 AND payment_type !='tXtATQFJu1' AND payment_type !='GrG4RJBy3' AND created_at <= CURDATE() +'00:00:00' AND created_at >= CURDATE()-1 +'00:00:00';" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});

router.get('/usersBilledTod', function (req, res, next) {

    client.query("SELECT COUNT(DISTINCT(user)) as billed_users, SUM(amount) as amount FROM daily_log WHERE created_at >= CURDATE() +'00:00:00';" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});

router.get('/usersBilledYest', function (req, res, next) {

    client.query("SELECT COUNT(DISTINCT(user)) as billed_users, SUM(amount) as amount FROM daily_log WHERE created_at <= CURDATE() +'00:00:00' AND created_at >= CURDATE()-1 +'00:00:00';" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});


router.get('*', function (req, res, next) {
    res.send('Error 404!!!');
});
router.post('*', function (req, res, next) {
    res.send('Error 404!!!');
});



module.exports = router ;
