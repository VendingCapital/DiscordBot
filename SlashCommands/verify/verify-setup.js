const { Client, CommandInteraction } = require("discord.js");
const colors = require('../../colors.json')
const discord = require('discord.js')

module.exports = {
    name: "verify-setup",
    description: "Setup the Verfication System",
    type: 'CHAT_INPUT',
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['ADMINISTRATOR'],
    options: [
    {
        name: "channel",
        description: "Channel to send the message in.",
        required: true,
        type: 7
    },
    {
        name: "role",
        type: 8,
        description: "The role to give on successful verfications.",
        required: true,
    },
    {
        name: "logs-channel",
        type: 7,
        description: "Logging for verfications.",
        required: true,
    }],
    run: async (client, interaction, args, options) => {
        try {
            const vchannel = interaction.options.getChannel('channel');
            const vrole = interaction.options.getRole('role');
            const logs = interaction.options.getChannel('logs-channel')

            const vembed = new discord.MessageEmbed()
            .setTitle('Rules & Terms of Service')
            .setDescription('By verifiying into the server, you agree to the following rules and terms.\n\nblah blah blah\n yada yada\nyada yada')
            .setColor(colors.error);

            const accept = new discord.MessageButton()
            .setCustomId('accept')
            .setLabel('Accept')
            .setStyle('SUCCESS');

            options_row = new discord.MessageActionRow().addComponents(accept)
            vchannel.send({ embeds: [vembed], components: [options_row]});

            client.on("interactionCreate", async interaction => {
                if(interaction.isButton()) {
                    if(interaction.customId === "accept") {
                        await interaction.deferUpdate()
                        const log_embed = new discord.MessageEmbed()
                        .setTitle('Successful Verfication')
                        .setDescription(`**User:** ${interaction.user.tag} (${interaction.user.id})\n\n__User Info:__\n**Creation Date:** ${interaction.user.createdAt}\n**Join Date:** ${interaction.member.joinedAt}\n\nBy verifing this user __accepted__ the Terms of Service & the Server rules.`)
                        .setColor(colors.success)
                        .setTimestamp()
                        .setImage(interaction.user.displayAvatarURL());
                        logs.send({ embeds: [log_embed]});
                        interaction.member.roles.add(vrole)
                        interaction.followUp({ content: "You were **verified** successfully.", ephemeral: true})
                    }
                }
            });
            interaction.followUp({ content: "System is **Successfully** setup!"})
        } catch (error) {
            console.log(error)
            interaction.followUp({ content: "There was an **error** while **excuting** the command. ! Rxin has been **notified**.", ephemeral: true})
        }
    },
};
