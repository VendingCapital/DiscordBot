const { Client, CommandInteraction } = require("discord.js");
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/976711189700694096/dNHFq9K5osWRrGfjODSTfd9PpSFWPC_M9Lww4r4ct_jULfr4e7C8UQ7Y3-Bx6hJehm7c")
const discord = require('discord.js')
const colors = require('../../colors.json')
const bemojis = require('../../emojis.json')
module.exports = {
    name: "userinfo",
    description: "Shows information on you or someone else",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "The user you want to find information on",
            required: false,
            type: 6,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            
            const userinfo_embed = new discord.MessageEmbed()
                .setTitle(`${interaction.user.tag} Information`)
                .addField('User ID:', `${bemojis.dot} <@${interaction.user.id}>`, false)
                .addField('Joined Server At:', `${bemojis.dot} ${interaction.user.permissions}`, false)
                .addField(`Created At:`, `${bemojis.dot} ${interaction.user.createdAt.toDateString()}`, false)
                .setImage(interaction.user.displayAvatarURL())
                .setColor(colors.black)
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL())
                .setFooter('Vending Capital', interaction.client.user.displayAvatarURL());

            const userinfo_button = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('userinfo-button')
            .setLabel('Show More');

            const userinfo_row = new discord.MessageActionRow().addComponents(userinfo_button)

            const userinfo_editedembed = new discord.MessageEmbed()
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
            .setFooter('Vending Capital', interaction.client.user.displayAvatarURL());

            userinfo_button2 = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('userinfo-button2')
            .setLabel('Show Less');

            userinfo_button3 = new discord.MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('userinfo-button3')
            .setLabel('Show More/Less')
            .setDisabled(true);
            
            userinfo_editedrow2 = new discord.MessageActionRow().addComponents(userinfo_button3)
            userinfo_editedrow = new discord.MessageActionRow().addComponents(userinfo_button2)
            interaction.followUp({ embeds: [userinfo_embed], components: [userinfo_row]})

            const collector = interaction.channel.createMessageComponentCollector({
                max: 2,
                time: 60000
            });

            collector.on('collect', async i => {
                if (i.customId === 'userinfo-button') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [userinfo_editedembed], components: [userinfo_editedrow]})
                }
                if (i.customId === 'userinfo-button2') {
                    await i.deferUpdate()
                    await i.editReply({ embeds: [userinfo_embed], components: [userinfo_editedrow2]})
                }
            });

            collector.on('end', async i => {
                await interaction.editReply({ components: [userinfo_editedrow2]});
            });
        } catch (error) {
            const error_embed = new discord.MessageEmbed()
            .setTitle('Error')
            .setDescription(`\`\`\`yaml\n${error}\n\`\`\``)
            .setFooter(`User Info | Command ran by <@${interaction.user.id}> in ${interaction.guild.name}`)
            .setTimestamp();
            hook.send(error_embed)
            console.log(error)
        }
    },
};
