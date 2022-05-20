const { Client, CommandInteraction } = require("discord.js");
const colors = require('../../colors.json')
const discord = require('discord.js')
const mongoose = require('mongoose')
const {UserModel} = require("../../Schemas/profile.js")


module.exports = {
    name: "profile",
    description: "Profile",
    type: 'CHAT_INPUT',
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['ADMINISTRATOR'],
    options: [
    {
        name: "user",
        description: "The user's profile to view",
        required: true,
        type: 6
    }],
    run: async (client, interaction, args, options) => {
        try {
            const puser = interaction.options.getUser('user');

            const exists = await UserModel.exists({
                id: puser.id
            })
            if(exists) {
                const model = await UserModel.findOne({ 
                    id: puser.id
                })
            
                if(mongoose.model.blacklist.blacklisted == true) {
                    blacklist_emb = new discord.MessageEmbed()
                    .setTitle('User is Blacklisted')
                    .setDescription(`\`${puser.tag}\` profile is **blacklisted** for __${blacklist.reason}__ (Blacklisted by ${blacklist.mod}).`)
                    .setColor(colors.black)
                    .setFooter('Vending Capital');
                    interaction.followUp({ embeds: [blacklist_emb], ephemeral: true});
                } else if(mongoose.model.flag.flagged == true) {
                    flag_emb = new discord.MessageEmbed()
                    .setTitle(`${puser.tag}'s Profile`)
                    .setDescription(`:warning: **__USER IS FLAGGED__ :warning:**\n\n**Flag Reason:**\n**Moderator:**\n\n**ID:** ${puser.id}\n**Registration Date:** ${puser.createdAt.toDateString()}\n**Display Name:** ${puser.username}\n**Mention:** <@${puser.id}>\n\n**__Personal Information__**\n**Email:** `)
                    .setColor(colors.success)
                    .setFooter('Vending Capital');
                    interaction.followUp({ embeds: [flag_emb], ephemeral: true});
                } else {
                    profile_emb = new discord.MessageEmbed()
                    .setTitle(`${puser.tag}'s Profile`)
                    .setDescription(`**ID:** ${puser.id}\n**Registration Date:** ${puser.createdAt.toDateString()}\n**Display Name:** ${puser.username}\n**Mention:** <@${puser.id}>\n\n**__Personal Information__**\n**Email:** `)
                    .setColor(colors.success)
                    .setFooter('Vending Capital');
                    interaction.followUp({ embeds: [profile_emb], ephemeral: true});
                }

            }
        
        } catch (error) {
            console.log(error)
            interaction.followUp({ content: "There was an **error** while **excuting** the command. ! Rxin has been **notified**.", ephemeral: true})
        }
    
    },
};
