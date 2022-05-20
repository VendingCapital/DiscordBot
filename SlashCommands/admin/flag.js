const { Client, CommandInteraction } = require("discord.js");
const colors = require('../../colors.json')
const discord = require('discord.js')
const mongoose = require('mongoose')
const {UserModel} = require("../../Schemas/profile.js")

module.exports = {
    name: "flag",
    description: "Flag a user (Internal Command)",
    type: 'CHAT_INPUT',
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['ADMINISTRATOR'],
    options: [
    {
        name: "user",
        description: "The User to Flag",
        required: true,
        type: 6
    },
    {
        name: "reason",
        type: 3,
        description: "The reason",
        required: false,
    }],
    run: async (client, interaction, args, options) => {
        try {
            const fuser = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason') || "No Reason Provided";

            const exists = await UserModel.exists({
                id: fuser.id
            })

            if (exists) {
                const model = await UserModel.findOne({ 
                    id: fuser.id
                })
                if(!model.flagged.flagged) {
                    model.flagged = {
                        flagged: true,
                        administrator: interaction.user.id,
                        reason: reason
                    }
                    model.save()
                    flag_emb = new discord.MessageEmbed()
                    .setTitle("User Flagged")
                    .setDescription(`\`${fuser.tag}\` was flagged for **${reason}**`)
                    .setColor(colors.default)
                    .setFooter('Vending Capital'); //why they dep it
                    interaction.followUp({ embeds: [flag_emb]});
                }
                else {
                    model.flagged = {
                        flagged: false
                    }
                    unflag_emb = new discord.MessageEmbed()
                    .setTitle("User Unflagged")
                    .setDescription(`\`${fuser.tag}\` was **unflagged**`)
                    .setColor(colors.default)
                    .setFooter('Vending Capital'); 
                    interaction.followUp({embeds: [unflag_emb]})
                }
                model.save()
            } else {
                err_emb = new discord.MessageEmbed()
                .setTitle("Error")
                .setDescription("I couldn't find that user. Please specify an real user.")
                .setColor(colors.error)
                .setFooter('Vending Capital')
                interaction.followUp({embeds: [err_emb]})
            }


        } catch (error) {
            console.log(error)
            interaction.followUp({ content: "There was an **error** while **excuting** the command. ! Rxin has been **notified**.", ephemeral: true})
        }
    },
};
