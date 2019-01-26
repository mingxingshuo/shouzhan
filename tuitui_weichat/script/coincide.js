var UserconfModel = require('../model/Userconf1');
var CoincideModel = require('../model/Coincide');
var async = require('async');

var codes =[137,138,139,140,146,147,148,149,150,91]
var cishu =0
function compare(_id) {
	UserconfModel.fetch_nick(_id,codes,function(err,result){
		async.eachLimit(result,100,function(item,cb){
			//console.log(item)
			var id = item.country+item.province+item.city+item.sex+item.nickname;
			CoincideModel.findOneAndUpdate({id_str:id},
				{id_str:id,$inc:{ count: 1 },$addToSet:{codes:item.code}},
				{upsert:true,new :true},
				function(e,coin){
					cb(null)
				})
		},function(err){
			if(result.length==1000){
	    		compare(result[999]._id)
	    		console.log('..........第'+(++cishu)+'次...........')
	    	}else{
	    		console.log('..........end...........')
	    	}
		})
	})
}

compare(null)