var ConfigModel = require('../model/Config');
var wechat_util = require('../util/get_weichat_client.js')
var UserTagModel = require('../model/UserTag')


async function a() {
    // await ConfigModel.update({code: 11}, {status: -2})
    // let client = await wechat_util.getClient(5)
    // client.getTags(function (err, res) {
    //     console.log(res,'----------------')
    // })
    // client.createTag("明星说女", async function (err, data) {
    //     console.log(err,data,'----------------------')
    await UserTagModel.create({id: 102, name: "女", code: 5})
    // })
}
a()

