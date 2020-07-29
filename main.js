//Made by YeahDudeThatsNarly#6969 on discord.

// Important Varibles



// Config Varibles
const token = 'NzM2Mjk0NjYwNDE4NDM3MTgw.Xxst1g.aEbZsS1jfM0sfXvkVldDvWHz-SM'; // The token that the bot uses to login to Discord
const prefix = ';'; // The prefix that bot listens to when it listens for commands
const cookie = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_6990DD5228B5E460F39E728F616B5B5634ED25A02CDC0D43DE55ADFEE1BE707BE67B927CAB3B0D5DE978116E768BD700E97B757FDA8CBC4DA059D76E6BB150B6CBA915B17703C45183E4D3CFAA1B8DE075CED5C536C35DED06B28ED359A9934AA4637F2346D55920B301D146A3E959D23D1D0F872E3DBD1D0CDFF1107D31E1154F52168ED8F1CA287E3E72E969224D653B3A1F5E2D842331094C428DE92AD3FD0A7E54FDC895EE2396040DFCD0BF96304FAC53D5F7B610EA5FDA75FFD89F8E4D5F7B4C36DDF28A58EAA118A64A827A20751332BD0BDCDE40DDDEA77352DF2E971122E558DE43DB5921C628F69BBD60AD5EFBD5343EBAC8049A24C5A1501A8CC86CBDEA0FCB1476398E95534712D113450E82992D54A4935CD85BADBA1435E666FE50D667DD115AFC12833F67CD8EFB284DF08581';
const username = 'TheUglyDeveloper'; // The username that the bot uses to login to Roblox, only used if the cookie isn't valid
const password = 'Password1987'; // The password that the bot uses to login to Roblox, only used if the cookie isn't valid
const groupid = 7121097; // The group that the bot manages. Change 1 to your group id
const maximumRank = 25; // The maximum rank that the bot can rank to. Change 1 to your maxium rank
const command = 'whitelist'; // The command that the bot listens to. This must be lowercase
const whitelistedRole = 'Whitelist Token'; // The role the can use the command
const command2 = 'blacklist';
const whitelistedRole2 = 'Admin';
const Discord = require('discord.js');
const roblox = require('noblox.js');

const client = new Discord.Client();
const embedbl = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('Please Enter The Username Argument')
.setColor(0xFF0000)

// Main code


client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Welcome To Liquid SS, ${member}, please read the rules and #how-to-buy!`);
});

roblox.getPlayerInfo(44545891).then((playerInfo) => {
    console.log("This user's status is " + playerInfo.status)
  }).catch(console.error)

async function cookieLogin() {
    try {
        await roblox.cookieLogin(cookie);
    } catch (err) {
        login();
        return console.log('There was an error while logging into the account with the cookie: ' + err + ' Attempting to login with username and password...');
    }
    return console.log('Logged in!');
}

async function login() {
    try {
        await roblox.login(username, password); // I know login sometimes throws a captcha, but that only happens when you spam it!
    } catch (err) {
        return console.log('There was an error while loggin in to the account with the username and password: ' + err);
    }
    return console.log('Logged in!');
}

function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
    return content.startsWith(prefix + command2);
}

client.on('ready', async () => {
    client.user.setActivity('poeple whitelist', { type: 'WATCHING'})
    await cookieLogin();
});

client.on('message', async message => {
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    if(isCommand(command, message)) {
        if(!message.member.roles.cache.some(role =>[whitelistedRole].includes(role.name))) {
            return message.channel.send("You don't have permission to run this command!");
        }
        let username = args[1];
        if(!username) {
         return message.channel.send(embedbl);
        }
        let id;
        try {
            id = await roblox.getIdFromUsername(username);
        } catch {
            return message.channel.send("This isn't a valid username!");
        }
        let oldRankId = await roblox.getRankInGroup(groupid, id);
        if(oldRankId == 0) {
            return message.channel.send("This user isn't in the group!");
        }
        if(oldRankId >= maximumRank) {
            return message.channel.send("I can't manage this user!");
        }
        let oldRankName = await roblox.getRankNameInGroup(groupid, id);
        try {
            await roblox.setRank(groupid, id, 2);
            message.member.roles.add('736296002570682378')
            message.member.roles.remove('736303053237387265')
          
  .then(console.log)
  .catch(console.error);
            
        } catch (err) {
            return message.channel.send("There was an error while ranking this user: " + err);
        }
        const embed = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription('Success! You Are Now Whitelisted, ' + username)
        .setColor(0x17E7F0)
        message.channel.send(embed);
    }
});
client.on('message', async message => {
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    if(isCommand(command2, message)) {
        if(!message.member.roles.cache.some(role =>[whitelistedRole2].includes(role.name))) {
            return message.channel.send("You don't have permission to run this command!");
        }
        let username = args[1];
        if(!username) {
              return message.channel.send(embedbl);
            //return message.channel.send("Please Enter A Second Argument(example: ;blacklist noobgamer123)");
        }
        let id;
        try {
            id = await roblox.getIdFromUsername(username);
        } catch {
            return message.channel.send("This isn't a valid username!");
        }
        let oldRankId = await roblox.getRankInGroup(groupid, id);
        if(oldRankId == 0) {
            return message.channel.send("This user isn't in the group!");
        }
        if(oldRankId >= maximumRank) {
            return message.channel.send("I can't manage this user!");
        }
        let oldRankName = await roblox.getRankNameInGroup(groupid, id);
        try {
            await roblox.setRank(groupid, id, 1)
          
  .then(console.log)
  .catch(console.error);
            
        } catch (err) {
            return message.channel.send("There was an error while ranking this user: " + err + "This error has been logged.");
        }
        const embed = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription('Success! You Have Blacklisted ' + username)
        .setColor(0x17E7F0)
        message.channel.send(embed);
    }
});

client.on('message', message=>{
    let args = message.content.slice(prefix.length).split(" ");

    switch(args[0]){
        case 'help':
            const embed = new Discord.MessageEmbed()
            .setTitle('All Current Commands.')
            .setDescription('`;help` \n`;whitelist` \n`;blacklist` \n`;me`')
            .setColor(0x17E7F0)
            message.channel.send(embed);
            break;
    }

    });


    client.on('message', message=>{
        let args = message.content.slice(prefix.length).split(" ");
    
        switch(args[0]){
            case 'me':
                const embed = new Discord.MessageEmbed()
                .setTitle('Your Information.')
                .setColor(0x17E7F0)
                .addField('Username',message.author.username)
                .addField('Account Creation Date',message.author.createdAt)
                message.channel.send(embed);
                break;
        }
    
        });
    
    

client.login(token);