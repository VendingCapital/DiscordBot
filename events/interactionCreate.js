const { DiscordAPIError } = require("discord.js");
const discord = require('discord.js')
const colors = require('../colors.json')
const client = require("../index");
const bemojis = require('../emojis.json')

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        const noperms_embed = new discord.MessageEmbed()
        .setDescription(`You are missing permission to use this command \n\n**Missing Permission(s)**\n${bemojis.dot} ${cmd.userPermissions}`)
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        .setColor(colors.error)
        .setTimestamp()
        .setFooter('Vending Capital', interaction.client.user.displayAvatarURL())
        if(!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.reply({ embeds: [noperms_embed], ephemeral: true })

        const nobotperms_embed = new discord.MessageEmbed()
        .setDescription(`I am missing permission to run this command \n\n**Missing Permission(s)**\n${bemojis.dot} ${cmd.botPermissions}`)
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        .setColor(colors.error)
        .setTimestamp()
        .setFooter('Vending Capital', interaction.client.user.displayAvatarURL())
        if(!interaction.guild.me.permissions.has(cmd.botPermissions || [])) return interaction.reply({embeds: [nobotperms_embed], ephemeral:true })

        await interaction.deferReply().catch(() => {});
        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

});
