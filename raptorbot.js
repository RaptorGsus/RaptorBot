const Discord = require('discord.js')
const client = new Discord.Client()
const resetChannel = 'XXXXXXXXXXXXXXXXXXXXXX';

client.on('ready', () => {
        console.log("Started!")
        // Set bot status
        client.user.setActivity("you slowly tilt.", { type: "WATCHING" })
        //listServers();
})

client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return;
    }

    if ((receivedMessage.content.startsWith("r"))) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    let response = null;

    switch(primaryCommand.toLowerCase()){
        case "help":
            response = getHelpText(arguments[0])
            break;
        case "ping":
            response = "Pong!"
            break;
        case "reset":
            response = reset(receivedMessage);
            break;
        default:
            response = "This ain't it chief (Command not Recognized)"
            console.log("Command not Recognized")
            break;
    }
    
    if(response){
        receivedMessage.channel.send(response);
    }


}

function getHelpText(topic){
        return "\n**Commands:**\n" + 
        "*rHelp* - Show commands\n" +
        "*rReset* - You will be reset.\n" +
        "*rPing* - Pong!";
}

function getPingText(){
    return " Pong!"
}

function reset(receivedMessage){
    
    if(!receivedMessage.member.voiceChannel){
        return "In order to be reset, you need to be in a voice channel!"
    }

    let originChannel = receivedMessage.member.voiceChannel.id;

    receivedMessage.member.setVoiceChannel(resetChannel)

    let resetPromise = new Promise(function(resolve, reject) {
  
        setTimeout(function() {
            resolve(receivedMessage.member, originChannel);
          }, 2000);
      });
    
    resetPromise.then(function(member, origin) {
        member.setVoiceChannel(originChannel)
      }, function(reason){
          console.log(reason);
      }).catch(function(error) {
        console.log("Failed!", error);
      })

    return "Resetting " + receivedMessage.author + "!"; 
}

function listServers(){
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
}

bot_secret_token = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
client.login(bot_secret_token)