const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => console.log('BOT ONLINE'));
  
client.on('message', (msg) => {
    
    // !test command: test to see if bot online
    if (msg.content === '!test') {
    msg.channel.send('test');
    }
    
    // !ping command: ping pong 
    if (msg.content === '!ping') {
        msg.channel.send('pong!').then(msg.react("🏓"));
    }

    // !latency command: check user ping
    if (msg.content === '!latency') {
        msg.channel.send(`🏓 Latency is ${(Date.now() - msg.createdTimestamp)*-1}ms. API Latency: ${Math.round(client.ws.ping)}ms`);
    }

    // !aboutme command: provides user info, can tag another user to check their info
    if (msg.content.startsWith('!aboutme')) {

        const member = msg.mentions.members.first() || msg.member
        user = member.user
        const msgAuthor = msg.author

        const userinfoEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Information')
            //.setURL('https://discord.js.org/')
            .setAuthor(user.tag, user.displayAvatarURL())
            //.setDescription('Some description here')
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Joined Discord: ', value: user.createdAt},
                { name: 'User ID: ', value: user.id, inline: false },
            )
            .addField('Roles:', member.roles.cache.map(role => role.name).join(", "), true)
            //.addField('Inline field title', 'Some value here', false)
            //.setImage(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(`Requested by: ${msgAuthor.tag}`, msgAuthor.displayAvatarURL());

        msg.channel.send(userinfoEmbed);
    //}

}

});




