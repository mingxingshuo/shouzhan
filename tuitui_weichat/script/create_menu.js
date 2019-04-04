var wechat_util = require('../util/get_weichat_client.js')



async function get_tag(code){
	var client = await wechat_util.getClient(code)
	/*client.createTag("明星说测试",async function (err, data){
		console.log(err)
		console.log(data)
	})*/
	client.getTags(function(err,res){
		console.log('------------err-------------')
		console.log(err)
		console.log('------------res-------------')
		console.log(res)
	})

	/*client.membersBatchtagging(103, ['o2JXO56130aGQSfHcfIIDcOVkQNE','o2JXO55e9ojX_vax-6aHI6tQU29I	'], function (error, res) {
        console.log(res)
    })*/

    //var media_id ="KtjogwJlegSk9wzmQ9jiG7XrFjczdfiKJsVxxSko-u0";
  /* var opts ={ mpnews: { media_id: 'KtjogwJlegSk9wzmQ9jiG14bdlSC5-DLYugKXr02FiA' },
   msgtype: 'mpnews' };
   var opts = {
	   	"text":{
	      "content":"测试文本"
	   },
	    "msgtype":"text"
   }
    client.massSend(opts, 103, function (err, res) {
            console.log('------------err--------');
            console.log(err);
            console.log('------------res--------');
            console.log(res);
        })*/
}


async function get_test(code){
	var client = await wechat_util.getClient(code)
	client.getFollowers(function(err,res){
		console.log('--------code----------')
		console.log(code)
		console.log('------------err-------------')
		console.log(err)
		console.log('------------res-------------')
		console.log(res)
	})
}

async function getMaterial(code) {
	var client = await wechat_util.getClient(code)
    await client.getMaterials('news', 0, 20, async (err, result, res) => {
        console.log('-------Material--------')
        console.log(result)
    });
}

get_tag(44)
