const User = require('../models/users');

const updateWorker = async (req, res) => {
    try {
        // Extract the worker ID and updated data from the request body
        const { id, name, username, email } = req.body;

        // Validate that all required fields are provided
        if (!id || !name || !username || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the worker exists
        const worker = await User.findById(id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Check if the new username or email already exists (excluding the current worker)
        const isUsernameExists = await User.findOne({ username, _id: { $ne: id } });
        if (isUsernameExists) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const isEmailExists = await User.findOne({ email, _id: { $ne: id } });
        if (isEmailExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Update the worker details
        const updatedWorker = await User.findByIdAndUpdate(
            id,
            { name, username, email },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // Send the updated worker data
        res.status(200).json({ message: 'Worker updated successfully', worker: updatedWorker });
    } catch (error) {
        console.error('Error updating worker:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateWorker;
