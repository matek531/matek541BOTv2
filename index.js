const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const {prefix, token, bot_age, words_array, bot_info} = require('./config.json');
client.once('ready', () => {
    console.log(prefix);
    console.log(token);
    console.log(bot_age);
    console.log(words_array[0]);
    console.log(words_array[1]);
    console.log(words_array[2]);
    console.log(bot_info.name);
    console.log(bot_info.version);
});

client.login(token);

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}



client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if (!args.length){
        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('ERROR')
        .setDescription('Przepraszam, ale zrobiłeś')
        .setFooter('Bot Error Log')
        .addField('Code', '000x9', true)
        .addField(
            { name: 'lisek', value: "to gej", inline: false },
            { name: 'lisek', value: "jebany jest", inline: false},
        )
        .setTimestamp()
        .setImage('<blockquote class="imgur-embed-pub" lang="en" data-id="a/M51FftW" data-context="false" ><a href="//imgur.com/a/M51FftW"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>')
        .setThumbnail('https://imgur.com/a/M51FftW')
        return message.channel.send(embed);
    }
    try{
        command.execute(message, args);
    }catch(error){
        console.error(error);
        message.reply('Jest problem z wykonaniem tej komendy!');
    }

    if(command === 'args') {
        if (!args.length) {
            return message.channel.send(`You have not input any arguments, ${message.author}!`);
        }else if(args[0] === 'kot'){
            return message.channel.send('Meow');
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }else if(command === 'ban'){
            const taggedUser = message.mentions.users.first();
            message.channel.send(`Chcesz zbanować: ${taggedUser.username}`);
            return;
    }
    if(message.content === `${prefix}name`) {
        message.channel.send(message.guild.name);
    }else if(message.content === 'siema'){
        message.channel.send('siema walisz konia?');
    }else if (message.content === `${prefix}online`) {
        message.channel.send(`Użytkownicy: ${message.guild.memberCount}`);
    }else if (message.content === `${prefix}ja`) {
        message.channel.send(`Nazwa użytkownika: ${message.author.username}`);
        message.channel.send(`ID: ${message.author.id}`);
    }
    
    
});
