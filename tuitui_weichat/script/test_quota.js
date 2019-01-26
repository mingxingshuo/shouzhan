var ConfigModel = require('../model/Config');
var wechat_util = require('../util/get_weichat_client.js')

async function test(code) {
    let client = await wechat_util.getClient(code)
    let conf = await ConfigModel.findOne({code: code})
    let appid = conf.appid
    client.clearQuota(appid, function (err, data) {
        console.log(err, data, '------------------------------')
        console.log('clearQuota end')
    })
}
test(149)
