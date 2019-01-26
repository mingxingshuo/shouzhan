var wechat_util = require('../util/get_weichat_client.js')

var menu_obj={
  	"button":[
  		{
	  		"type":"view",
	        "name":"总裁媳妇",
	        "url":"https://c66481.818tu.com/referrals/index/4186741"
  		},
  		{
	  		"type":"view",
	        "name":"贴心萌宝",
	        "url":"https://c66481.818tu.com/referrals/index/4186749"
  		},
  		{
	  		"type":"view",
	        "name":"专职高手",
	        "url":"https://c66481.818tu.com/referrals/index/4186754"
  		}
  	]
  }

/*for (var i = 156; i < 166; i++) {
	setTimeout(create_menu,(i-156)*1000,i)

}*/

//create_menu(88)

async function create_menu(code) {
	console.log(code)
	var client = await wechat_util.getClient(code)
	//console.log(client)
	client.removeMenu(function(err,res){
		if(err){
			console.log('--------removeMenu-----err-----'+code+'-------')
			console.log(err)
			console.log(res)
		}
		client.createMenu(menu_obj, function(err,res){
			if(err){
				console.log('--------createMenu-----err-----'+code+'-------')
				console.log(err)
				console.log(res)
			}
			client.getMenu(function(err,res_m){
				console.log('--------createMenu-----success-----'+code+'-------')
				console.log(err)
				console.log(JSON.stringify(res_m));
			});
		});
	});
}

async function remove_menu(code) {
	console.log(code)
	var client = await wechat_util.getClient(code)
	//console.log(client)
	client.removeMenu(function(err,res){
		console.log('--------removeMenu--------'+code+'-------')
		console.log(err)
		console.log(res)
		
	});
}



async function get_tag(code){
	var client = await wechat_util.getClient(code)
	/*client.createTag("明星说测试",async function (err, data){
		console.log(err)
		console.log(data)
	})*/
	/*client.getTags(function(err,res){
		console.log('------------err-------------')
		console.log(err)
		console.log('------------res-------------')
		console.log(res)
	})*/

	/*client.membersBatchtagging(103, ['o2JXO56130aGQSfHcfIIDcOVkQNE','o2JXO55e9ojX_vax-6aHI6tQU29I	'], function (error, res) {
        console.log(res)
    })*/

    //var media_id ="KtjogwJlegSk9wzmQ9jiG7XrFjczdfiKJsVxxSko-u0";
   var opts ={ mpnews: { media_id: 'KtjogwJlegSk9wzmQ9jiG14bdlSC5-DLYugKXr02FiA' },
   msgtype: 'mpnews' };
   /*var opts = {
	   	"text":{
	      "content":"测试文本"
	   },
	    "msgtype":"text"
   }*/
    client.massSend(opts, 103, function (err, res) {
            console.log('------------err--------');
            console.log(err);
            console.log('------------res--------');
            console.log(res);
        })
}

get_tag(178)