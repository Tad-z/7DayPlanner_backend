const mongoose = require('mongoose');

// Define the Plan schema
const PlanSchema = new mongoose.Schema({
    plan_name: { type: String, required: true },
    priority: { type: String, required: true },
    due_date: { type: Date, required: true },
});
  
// Define the Week schema
const WeekSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    week_name: { type: String, required: true },
    plans: { type: [PlanSchema], required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Week", WeekSchema);
