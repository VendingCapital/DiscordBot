const { Client, CommandInteraction } = require("discord.js");
const colors = require('../../colors.json')
const discord = require('discord.js')

module.exports = {
    name: "purge",
    description: "Delete a certian amount of messages from chat",
    type: 'CHAT_INPUT',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    options: [
    {
        name: "amount",
        description: "Amount of messages to purge",
        required: true,
        type: 10
    },
    {
        name: "phrase",
        type: "STRING",
        description: "A phrase to delete",
        required: false,
    }],
    run: async (client, interaction, args, options) => {
        try {
            const amountvalue = interaction.options.getNumber('amount');
            const phrasevalue = interaction.options.getString('phrase');

            if(!phrasevalue) {
                interaction.channel.bulkDelete(amountvalue, { filterOld: true }).then(async (messages) => {
                    const purged_embed = new discord.MessageEmbed()
                    .setDescription(`I successfuly deleted **${amountvalue} messages**`)
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
                    .setColor(colors.success)
                    .setTimestamp()
                    .setFooter('Vending Capital', interaction.client.user.displayAvatarURL());
                    interaction.editReply({ embeds: [purged_embed] });
                    /*setTimeout(async () => { 
                        await interaction.deleteReply();
                    }, 5000)*/
                })
            }
        } catch (error) {
            console.log(error)
            interaction.followUp({ content: "There was an **error** while **excuting** the command. ! Rxin has been **notified**."})
        }
    },
};
