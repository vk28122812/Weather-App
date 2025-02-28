const router = require('express').Router();
const Feedback = require('../../models/Feedback');

router.post("/", async (req, res) => {
    try {
        const newFeedback = new Feedback({ name:req.body.name, message:req.body.message,email:req.body.email});
        await newFeedback.save();
        res.status(201).json({ message: 'feedback noted' });
    } catch (error) {
        console.error('Error in feedbackController:', error);
        res.status(500).json({ message: 'Internal server error',error:error });
    }
});
module.exports = router;