const { Telegraf, Markup } = require('telegraf')
const { pizzas } = require('./constants')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
const basket = {
    pizza: {},
    salads: {},
    desserts: {},
    drinks: {}
}

bot.start(async (ctx) => {
    await ctx.reply(`Здравствуйте, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}! ✋`)
    await ctx.reply(`Этот бот является примером бота для Вашего бизнеса 🙂. В данном случае, бот создан для пиццерии!🍕`)
})

// mainMenu = async (ctx) => {
//     try {
//         await ctx.replyWithHTML('<b>Пример главного списка функций бота</b>', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Меню 🗂', 'menu')],
//                 [Markup.button.callback('Вопрос - ответ ❓', 'questions')],
//                 [Markup.button.callback('Рестораны 🍕', 'restaurants')],
//                 [Markup.button.callback('Корзина 🧺', 'basket')]
//             ]
//         ))
//     } catch (error) {
//         console.log(error);
//     }
// }

// bot.action('menu', async (ctx) => {
//     try {
//         await ctx.answerCbQuery()
//         await ctx.replyWithHTML('<b>Выберите подходящее вам блюдо</b>', Markup.inlineKeyboard( // кнопки
//             [
//                 [Markup.button.callback('Пицца 🍕', 'pizza'), Markup.button.callback('Салаты 🥗', 'salads')],
//                 [Markup.button.callback('Десерты 🍰', 'desserts'), Markup.button.callback('Напитки 🧃', 'drinks')],
//             ]
//         ))
//     } catch (error) {
//         console.log(error);
//     }
// })




// Открыть меню
bot.hears('Меню 🗂', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Выберите подходящее вам блюдо</b>', Markup.inlineKeyboard( // кнопки
            [
                [Markup.button.callback('Пицца 🍕', 'pizza'), Markup.button.callback('Салаты 🥗', 'salads')],
                [Markup.button.callback('Десерты 🍰', 'desserts'), Markup.button.callback('Напитки 🧃', 'drinks')],
            ]
        ))
    } catch (error) {
        console.log(error);
    }
})

//Открыть пиццы
bot.action('pizza', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        for (let pizza in pizzas) {
            await ctx.replyWithPhoto({ source: pizzas[pizza].photo })
            await ctx.replyWithHTML(`Пицца:<b> ${pizzas[pizza].name}</b>, Цена: <b>${pizzas[pizza].price} ☝️</b> `, Markup.inlineKeyboard(
                [
                    [Markup.button.callback('Добавить в корзину 🧺', pizzas[pizza].name)],

                ]))
        }
    } catch (error) {
        console.log(error);
    }
})


addInBasket = (productType, product) =>  {
    basket.productType.product = basket.productType.product + 1;
}

for (let pizza in pizzas) {
    bot.action(`${pizzas[pizza].name}`, async (ctx) => {
        await ctx.reply(`${pizzas[pizza].name}`)
    })
}


// Корзина


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))