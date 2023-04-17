const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] });

const token = 'TOKEN_BOT';

const PUB = 'CHANNEL_ID';
const categoryID = 'CATEGORY_ID'; 

const tempChannels = new Map();
let channel_number = 0;

client.once('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);    

    const category = client.channels.cache.get(categoryID); 

    const voiceChannels = category.children.filter(channel => channel.type === 'GUILD_VOICE');
    voiceChannels.forEach(channel => { 
                                        if (channel.members.size === 0) 
                                            channel.delete(); 
                                        else
                                            tempChannels.set(channel.id, channel.id);     
                                     });    
});

function del(oldState)
{
    let id = oldState.channelId;
    const tempChannelId = tempChannels.get(id);        
    if (tempChannelId) 
    {
        const tempChannel = oldState.channel.guild.channels.cache.get(tempChannelId);
        if (tempChannel.members.size === 0) 
        {
            tempChannels.delete(id);
            tempChannel.delete();
        }
    }
}

client.on('voiceStateUpdate', async (oldState, newState) => 
{    
    const { channel } = newState;
    
    if (channel && channel.id === PUB)
    {   
        if(tempChannels.has(oldState.channelId))
            del(oldState);

        const category = client.channels.cache.get(categoryID);           

        if (category) 
        {
            const voiceChannels = category.children.filter(channel => channel.type === 'GUILD_VOICE');            
            channel_number = voiceChannels.size + 1;

            //const channel = newState.channel;
            const guild = channel.guild;

            let name = "IN GAME #" + channel_number;

            const path = "users/" + newState.member.user.id;                    
            if (fs.existsSync(path))            
                name = fs.readFileSync(path, 'utf8');
            
            await guild.channels.create(name, 
            {
                type: 'GUILD_VOICE',
                parent: category
            }).then(
                    tempChannel => 
                    {
                        tempChannels.set(tempChannel.id, tempChannel.id);                             
                        newState.setChannel(tempChannel);
                    }).catch(console.error);            
        } 
        else 
        {
            console.log('Category not found');
        }     
    }
    else
    {
        del(oldState);
    }
});

client.login(token);