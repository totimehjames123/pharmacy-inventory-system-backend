const bcrypt = require("bcrypt")
const usersCollection = require("../models/users")

const signupRoute = async (req, res) => {
    const {username, email, password} = req.body;

    const isUserExists = await usersCollection.findOne({email: email})

    if (!isUserExists){
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) res.send({message: "Failed to create user (password err)!"})
            else {
                const addUser = await usersCollection.insertMany(
                    {username: username, email: email, password: hashedPassword}
                )
             
                if (addUser){
                    res.send({ message: "User created successfully!", status: 200});
                }
                else{
                    res.send({ message: "Failed to create user!", status: 400});
                }
            }
        })
    }
    else{
        res.send({message: "User already exists", status: 409})
    }
}

module.exports = signupRoute