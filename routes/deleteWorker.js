const User = require('../models/users');

const deleteWorker = async (req, res) => {
    try {
        // Extract the worker ID from the request body
        const { id } = req.body;

        // Check if the worker exists before trying to delete
        const worker = await User.findById(id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Delete the worker from the database
        await User.findByIdAndDelete(id);

        // Send a success response
        res.status(200).json({ message: 'Worker deleted successfully' });
    } catch (error) {
        console.error('Error deleting worker:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = deleteWorker;
