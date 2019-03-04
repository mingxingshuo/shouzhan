var ConfigModel = require('../model/Config');
var UserTagModel = require('../model/UserTag')
var wechat_util = require('../util/get_weichat_client.js')

async function a(code) {
    // await ConfigModel.update({code: code}, {status: 1})

    let client = await wechat_util.getClient(code)
    console.log(client,'-------------------client')
    client.getTags(function (err, data) {
        console.log(err,data, '-----------------', code)
    })
    // client.createTag("明星说女", async function (err, data) {
    //     console.log(data, '-----------------data')
    //     await UserTagModel.create({id: data.tag.id, name: "女", code: code})
    //     client.getTags(function (err, data1) {
    //         console.log(data1, '-----------------data1')
    //     })
    // })
}
a(29)