const { Client, CommandInteraction } = require("discord.js");
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/976711189700694096/dNHFq9K5osWRrGfjODSTfd9PpSFWPC_M9Lww4r4ct_jULfr4e7C8UQ7Y3-Bx6hJehm7c")
const discord = require('discord.js')
const colors = require('../../colors.json')
const bemojis = require('../../emojis.json')
module.exports = {
    name: "serverinfo",
    description: "Shows information on the current server",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const serverinfo_embed = new discord.MessageEmbed()
                .setTitle(`${interaction.guild.name} Information`)
                .addField('Owner:', `${bemojis.dot} <@${interaction.guild.ownerId}>`, false)
                .addField('Role Count:', `${bemojis.dot} ${interaction.guild.roles.cache.size + ' role(s)' || "No Roles"}`, false)
                .addField('Boost Count:', `${bemojis.dot} ${interaction.guild.premiumSubscriptionCount + ' boost(s)' || 'No Boosts'}`, false)
                .addField('Members:', `${bemojis.dot} ${interaction.guild.memberCount} member(s)`, false)
                .addField(`Server Created At:`, `${bemojis.dot} ${interaction.guild.createdAt.toDateString()}`, false)
                .setColor(colors.black)
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL())
                .setFooter('Souls', interaction.client.user.displayAvatarURL());

            const serverinfo_button = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('serverinfo-button')
            .setLabel('Show More');

            const serverinfo_row = new discord.MessageActionRow().addComponents(serverinfo_button)

            const serverinfo_editedembed = new discord.MessageEmbed()
            .setTitle(`${interaction.guild.name} Information`)
            .addField('Owner:', `${bemojis.dot} <@${interaction.guild.ownerId}>`, false)
            .addField('Role Count:', `${bemojis.dot} ${interaction.guild.roles.cache.size + ' role(s)' || "No Roles"}`, false)
            .addField('Boost Count:', `${bemojis.dot} ${interaction.guild.premiumSubscriptionCount + ' boost(s)' || 'No Boosts'}`, false)
            .addField('Members:', `${bemojis.dot} ${interaction.guild.memberCount} member(s)`, false)
            .addField(`Server Created At:`, `${bemojis.dot} ${interaction.guild.createdAt.toDateString()}`, false)
            .addField('Emoji Count', `${bemojis.dot} ${interaction.guild.emojis.cache.size + ' emoji(s)'|| "No Emojis"}`, false)
            .addField('Afk Timeout', `${bemojis.dot} ${interaction.guild.afkTimeout/100} second(s)`, false)
            .addField('Verfication Level:', `${bemojis.dot} ${interaction.guild.verificationLevel.toLowerCase()}`, false)
            .addField('Created Timestamp:', `${bemojis.dot} ${interaction.guild.createdAt.toLocaleDateString()}`, false)
            .addField('Channels:', `${bemojis.dot} ${interaction.guild.channels.cache.size} channel(s)`, false)
            .setColor(colors.black)
            .setTimestamp()
            .setThumbnail(interaction.guild.iconURL())
            .setFooter('Souls', interaction.client.user.displayAvatarURL());

            serverinfo_button2 = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('serverinfo-button2')
            .setLabel('Show Less');

            serverinfo_button3 = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('serverinfo-button3')
            .setLabel('Show More/Less')
            .setDisabled(true);
            
            serverinfo_editedrow2 = new discord.MessageActionRow().addComponents(serverinfo_button3)
            serverinfo_editedrow = new discord.MessageActionRow().addComponents(serverinfo_button2)
            interaction.followUp({ embeds: [serverinfo_embed], components: [serverinfo_row]})

            const collector = interaction.channel.createMessageComponentCollector({
                max: 2,
                time: 60000
            });

            collector.on('collect', async i => {
                if (i.customId === 'serverinfo-button') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [serverinfo_editedembed], components: [serverinfo_editedrow]})
                }
                if (i.customId === 'serverinfo-button2') {
                    await i.deferUpdate()
                    await i.editReply({ embeds: [serverinfo_embed], components: [serverinfo_editedrow2]})
                }
            });

            collector.on('end', async i => {
                await interaction.editReply({ components: [serverinfo_editedrow2]});
            });
        } catch (error) {
            const error_embed = new discord.MessageEmbed()
            .setTitle('Error')
            .setDescription(`\`\`\`yaml\n${error}\n\`\`\``)
            .setFooter(`Server Info | Command ran by <@${interaction.user.id}> in ${interaction.guild.name}`)
            .setTimestamp();
            hook.send(error_embed)
            console.log(error)
        }
    },
};
