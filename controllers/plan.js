const Week = require("../models/plan")

exports.postPlans = async (req,res) => {
    try{
      const weekDetails = req.body
      const week = new Week({
        userId: req.userData.userId,
        week_name: weekDetails.week_name,
        plans: weekDetails.plans.map(plan => ({
            plan_name: plan.plan_name,
            priority: plan.priority,
            due_date: new Date(plan.due_date),
        })),
        created_at: new Date(),
    });
        const newWeek = await week.save();
        return res.status(201).json(newWeek);
      }
     catch (err) {
      console.log(err.message);
    }  
  }

exports.getPlans = async (req, res) => {
    try {
        const weekId = req.params.week_id;
        const week = await Week.findById(weekId);
        
        if (!week) {
            return res.status(404).json({ message: 'Week not found' });
        }
        
        return res.status(200).json(week);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
};


