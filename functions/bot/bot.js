const { Telegraf } = require('telegraf')
const { newPost } = require('../components/fauna')
const startAction = require('./actions/start')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
  return startAction(ctx)
})

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }

}

bot.on('message', (ctx) => {
  try {
    console.log(ctx.message?.forward_from_chat.id)
    console.log(ctx.message?.forward_from_message_id)
    let postId = ctx.message?.forward_from_chat.id + ctx.message?.forward_from_message_id;
    let isPostUser = await newPost(id)
    if (isPostUser) {
      return ctx.reply('Added post to db!')
    }else{
      return ctx.reply('Post is already inside db!')
    }
   
    } catch (e) {
      return ctx.reply(`Error occured`)
    }
  } catch (error) {
    console.error(error)
  }
})


