import Review from "../models/Review.js";

export const addReview = async (req,res) => {
    try {
        const { name, email, rating, message, suggestion }= req.body;
        const newReview = new Review({ name, email, rating, message, suggestion });
        await newReview.save();
        res.status(201)
        .json({ success: true, message: "Thank you for your feedback!" });
    } catch (err) {
        res.status(500).json({ success: false, error:err.message });
    }
};


export const getReviews = async (req, res)=> {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reviews", error: err.message });
    }
};