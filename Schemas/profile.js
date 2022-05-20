(function() {
    const {Schema, model} = require("mongoose")

    const LoginSchema = new Schema({
        time: { type: Number, required: false },
        ip: { type: String, required: false }
    })
    
    const FlaggedSchema = new Schema({
        flagged: { type: Boolean, required: true },
        administrator: { type: Number, required: false },
        reason: { type: String, required: false }
    })
    
    const BlacklistSchema = new Schema({
        blacklisted: { type: Boolean, required: true },
        administrator: { type: Number, required: false },
        reason: { type: String, required: false }
    })
    
    const UserSchema = new Schema(
        {
            id: { type: Number, required: true },
            token: { type: String, required: true },
            email: { type: String, required: true },
            name: { type: String, required: false },
            address: { type: String, required: false },
            logins: { type: [LoginSchema], required: true },
            flagged: { type: FlaggedSchema, required: true },
            blacklisted: { type: BlacklistSchema, required: true }
        },
        {
            collection: "users"
        }
    )
    
    const UserModel = model("User", UserSchema)
    console.log(UserModel)

    module.exports = {UserModel}
}())
