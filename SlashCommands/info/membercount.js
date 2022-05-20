const { Client, CommandInteraction } = require("discord.js");
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/976711189700694096/dNHFq9K5osWRrGfjODSTfd9PpSFWPC_M9Lww4r4ct_jULfr4e7C8UQ7Y3-Bx6hJehm7c")
const discord = require('discord.js')
const colors = require(`../../colors.json`)
const bemojis = require(`../../emojis.json`)

module.exports = {
    name: "membercount",
    description: "returns the servers member count",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const membercount_nouse = new discord.MessageEmbed()
            .setDescription('You can not use this button')
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setColor(colors.error)
            .setTimestamp()
            .setFooter('Vending Capital', interaction.client.user.displayAvatarURL());
            const membercount_embed = new discord.MessageEmbed()
            .setDescription(`${bemojis.dot} There are **${interaction.guild.memberCount} total member(s)**`)
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setColor(colors.black)
            .setTimestamp()
            .setFooter('Vending Capital', interaction.client.user.displayAvatarURL());
            const membercount_button = new discord.MessageButton()
            .setCustomId('membercount-button')
            .setLabel('Show More')
            .setStyle('PRIMARY');
            const membercount_editedembed = new discord.MessageEmbed()
            .setDescription(`${bemojis.dot} There are **${interaction.guild.memberCount} total member(s)**\n${bemojis.dot} There are **${interaction.guild.members.cache.filter(member => !member.user.bot).size} total human(s)**\n${bemojis.dot} There are **${interaction.guild.members.cache.filter(member => member.user.bot).size} bot(s)**`)
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setColor(colors.black)
            .setTimestamp()
            .setFooter('Vending Capital', interaction.client.user.displayAvatarURL());

            const membercount_button2 = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('membercount-button2')
            .setLabel('Show Less');

            const membercount_button3 = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('membercount-button3')
            .setLabel('Show More/Less')
            .setDisabled(true);
            
            membercount_row = new discord.MessageActionRow().addComponents(membercount_button)
            membercount_editedrow2 = new discord.MessageActionRow().addComponents(membercount_button3)
            membercount_editedrow = new discord.MessageActionRow().addComponents(membercount_button2)
            interaction.followUp({ embeds: [membercount_embed], components: [membercount_row]})
            
            const collector = interaction.channel.createMessageComponentCollector({
                max: 2,
                time: 60000
            });

            collector.on('collect', async i => {
                if (i.customId === 'membercount-button') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [membercount_editedembed], components: [membercount_editedrow]})
                }
                if (i.customId === 'membercount-button2') {
                    await i.deferUpdate()
                    await i.editReply({ embeds: [membercount_embed], components: [membercount_editedrow2]})
                }
            });

            collector.on('end', async i => {
                await interaction.editReply({ components: [membercount_editedrow2]});
            });
        } catch (error) {
            hook.send('err')
            console.log(error)
        }
    },
};
