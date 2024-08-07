const usersCollection = require("../models/users");

const verifyUser = async (req, res) => {
    try {
        const { id, username } = req.body;

        // Find the user by id and username
        const user = await usersCollection.findOne({ _id: id, username });

        if (user) {
            // User found, return success response
            res.status(200).json({ message: "User verified", user });
        } else {
            // User not found, return failure response
            res.status(401).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error verifying user: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = verifyUser;
