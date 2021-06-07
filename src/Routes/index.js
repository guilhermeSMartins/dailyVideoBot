const cron = require('node-cron')

const CreateBot = require("../Utils/Bot")

const Monday = require('../Modules/Monday')
const Wednesday = require('../Modules/Wednesday')
const Friday = require('../Modules/Friday')
const Saturday = require('../Modules/Saturday')


bot = new CreateBot().bot

bot.start(ctx => {
    ctx.reply(`Hello ${ctx.from.first_name}, welcome to the MondaySailersBot.`)
    ctx.reply('This bot will send specific videos every day during the week')

    //Monday
    cron.schedule('0 9 * * 1', () => {
        const monday = new Monday()
        ctx.replyWithVideo(monday.getMedia())
    })

    //Wednesday
    cron.schedule('0 9 * * 3', () => {
        const wednesday = new Wednesday()
    
        const itsVideo = wednesday.getMedia().search('.mp4')
    
        if(itsVideo != -1) {
            ctx.replyWithVideo(wednesday.getMedia())
            return;
        }
    
        ctx.replyWithPhoto(wednesday.getMedia())    
    })
    //Friday
    cron.schedule('0 18 * * 5', () => {
        const friday = new Friday()

        ctx.replyWithVideo(friday.getMedia())    
    })

    //Saturday
    cron.schedule('0 19 * * 6', () => {
        const saturday = new Saturday()

        ctx.replyWithPhoto(saturday.getMedia())    
    })
})

bot.command(['Monday', 'monday'], ctx => {
    const monday = new Monday()
    ctx.replyWithVideo(monday.getMedia())
})

bot.command(['Wednesday', 'wednesday'], ctx => {
    const wednesday = new Wednesday()
    
    const itsVideo = wednesday.getMedia().search('.mp4')

    if(itsVideo != -1) {
        ctx.replyWithVideo(wednesday.getMedia())
        return;
    }

    ctx.replyWithPhoto(wednesday.getMedia())
})

bot.command(['Friday', 'friday'], ctx => {
    const friday = new Friday()

    ctx.replyWithVideo(friday.getMedia())
})

bot.command(['Saturday', 'saturday'], ctx => {
    const saturday = new Saturday()

    ctx.replyWithPhoto(saturday.getMedia())
})

bot.launch()