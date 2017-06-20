var mysql = require('mysql');
//var async = require('async');

client = mysql.createConnection({
    host: '52.77.232.151',
    //host : '54.169.207.85',
    user: 'dn_read_only',
    password :'f@str3edr954',
    port : 3306,
    database:'dailyninja',
    multipleStatements:true
});

exports.client = client ;