const { Client, CommandInteraction } = require("discord.js");
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/976711189700694096/dNHFq9K5osWRrGfjODSTfd9PpSFWPC_M9Lww4r4ct_jULfr4e7C8UQ7Y3-Bx6hJehm7c")
const discord = require('discord.js')
const colors = require('../../colors.json')
const bemojis = require('../../emojis.json')
module.exports = {
    name: "ping",
    description: "Returns the Bot's Ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            var seconds = interaction.client.uptime % 100 + 's'
            var minutes = Math.floor((interaction.client.uptime / 1000)) % 60 + 'm'
            var hours = Math.floor((interaction.client.uptime / (60 * 1000))) % 60 + 'h'
            var days = Math.floor(interaction.client.uptime / (60 * 1000 * 60 * 24)) +'s'
            
            const ping_embed = new discord.MessageEmbed()
                .setDescription(`${bemojis.dot} The Bot's ping is **${interaction.client.ws.ping}ms**`)
                .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
                .setColor(colors.black)
                .setTimestamp()
                .setFooter('Vending Capital', interaction.client.user.displayAvatarURL())
            await interaction.followUp({ content: `${bemojis.loading} Pinging`})
            await interaction.editReply({ content: "", embeds: [ping_embed] });
        } catch (error) {
            hook.send('err')
            console.log(error)
        }
    },
};
