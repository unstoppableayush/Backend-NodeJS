import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client(
    { 
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
            ] });


client.on('messageCreate',message =>{
    // console.log(message.content);
    if(message.author.bot) return;
    message.reply({
        content:"Hii from Bot!"
    })
     if(message.content.startsWith('create')){
        const url = message.content.split("create")[1];
        return message.reply({
            content:"Generating Short ID for "+url,
        })
    }
})

client.on('interactionCreate',interaction =>{
    interaction.reply("Pong!");
})

client.login(SECRET_KEY);