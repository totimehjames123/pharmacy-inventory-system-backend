const User = require('../models/users');

const fetchWorkers = async (req, res) => {
    try {
        // Fetch workers from the database and sort by dateOfRegistration
        const workers = await User.find({ role: 'worker' }).sort({ dateOfRegistration: -1 });

        // Send the retrieved workers as JSON response
        res.status(200).json({ workers });
    } catch (error) {
        console.error('Error fetching workers data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = fetchWorkers;
