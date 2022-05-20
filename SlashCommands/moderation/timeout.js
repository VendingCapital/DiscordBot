const { Client, CommandInteraction } = require("discord.js");
const colors = require('../../colors.json')
const discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "timeout",
    description: "Timeout an certian user.",
    type: 'CHAT_INPUT',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    options: [
    {
        name: "user",
        description: "The user to timeout",
        required: true,
        type: "USER",

    },
    {
        name: "time",
        description: "The length of the timeout",
        required: true,
        type: "STRING"
    },
    {
        name: "reason",
        type: "STRING",
        description: "The reason for timeout",
        required: false,
    }],
    run: async (client, interaction, args, options) => {
        try {
            const tuser = interaction.options.getUser('user');
            const mtime = interaction.options.getString('time');
            const reason1 = interaction.options.getString('reason') || "No Reason Provided";
            var reason = `Moderator: ${interaction.member.tag} | ${reason1}`
            const maxtime = ms('28d')
            if(mtime) timeInMs = ms(mtime)

            if(tuser.id === interaction.member.id) {
                err1_emb = new discord.MessageEmbed()
                .setDescription('You **can\'t** mute yourself!')
                .setFooter('Vending Capital')
                .setColor(colors.error);
                interaction.followUp({ embeds: [err1_emb] });
            }
            /*else if(tuser.permissions.FLAGS.ADMINISTRATOR == true) {
                err2_emb = new discord.MessageEmbed()
                .setDescription('You **can\'t** mute someone who has __administrator__ permissions.')
                .setFooter('Vending Capital')
                .setColor(colors.error);
                interaction.followUp({ embeds: [err2_emb] });
            }*/
            else if(timeInMs>maxtime) {
                err3_emb = new discord.MessageEmbed()
                .setDescription('You **can\'t** mute someone for longer than __28 days__.')
                .setFooter('Vending Capital')
                .setColor(colors.error);
                interaction.followUp({ embeds: [err3_emb] });
            }
            /*else if(reason1.length > 450){
                err4_emb = new discord.MessageEmbed()
                .setDescription('Your reason **can\'t** be longer than __450 characters__.')
                .setFooter('Vending Capital')
                .setColor(colors.error);
                interaction.followUp({embeds: [err4_emb]})
            }*/
            else {
                tuser.timeout(timeInMs, reason);
                timeout_emb = new discord.MesssageEmbed()
                .setDescription(`Successfuly timed out \`${tuser.tag}\` for **${timeInMs}** due to __${reason}__.`)
                .setFooter(`Moderator: ${interaction.member.tag} | Vending Capital`)
                .setColor(colors.success)
                interaction.followUp({embeds: [timeout_emb]})
            }



        } catch (error) {
            console.log(error)
            interaction.followUp({ content: "There was an **error** while **excuting** the command. ! Rxin has been **notified**."})
        }
    },
};
