//import userModel from "../../models/userModel.js";
//import routeModel from "../models/routeModel.js";
import subscribeModel from "../models/subscribedModel.js";

// Import the models
//const SubscribeModel = require('../../models/subscribedModel.js');
//const UserModel = require('../models/userModel.js');  // Assuming this exists

// Create a function to add a subscription
const subscribeUserToRoute = async (req, res) => {
  const { userID, RouteID } = req.body;

    // Check if both fields are provided
    if (!userID || !RouteID) {
        return res.status(400).json({ message: 'UserID and RouteID are required' });
    }

    try {
        // Create a new subscription
        const newSubscription = new subscribeModel({
            userID,
            RouteID,
        });

        // Save the subscription to the database
        await newSubscription.save();

        // Respond with success
        res.status(201).json({ message: 'Subscription added successfully', subscription: newSubscription });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error adding subscription', error: error.message });
    }
}

const listsubs = async (req,res)=>{
  try {
      const subs = await SubscribeModel.find({}, 'RouteID userID -_id');
      res.json(subs)
  } catch (error) {
      console.log(error)
      res.json({success:false, message:"Error"})
  }
}
// Export the controller function
export {listsubs,subscribeUserToRoute};
