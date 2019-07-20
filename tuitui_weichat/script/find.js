var UserconfModel = require('../model/Userconf')
var OpenidModel = require('../model/Openid')
var wechat_util = require('../util/get_weichat_client')
var OpenidtagModel = require('../model/OpenidTag')
var SubOpenidtagModel = require('../model/SubOpenidTag')

async function a() {
    let code = process.argv.slice(2)[0]
    let client = await wechat_util.getClient(code)

    let openidtag = await OpenidtagModel.count({code:code})
    console.log(openidtag,'--------------openidtag')
    let subopenidtag = await SubOpenidtagModel.count({code:code})
    console.log(subopenidtag,'--------------subopenidtag')
    let openid = await OpenidModel.count({code:code})
    console.log(openid,'--------------openid')
    let user = await UserconfModel.count({code:code})
    console.log(user,'-----------------user')
    client.getTags(function (err, data) {
        console.log(err,data, '-----------------', code)
    })
}

a()