//import userModel from "../../models/userModel.js";
//import routeModel from "../models/routeModel.js";
import SubscribeModel from "../models/subscribedModel.js";

// Import the models
//const SubscribeModel = require('../../models/subscribedModel.js');
//const UserModel = require('../models/userModel.js');  // Assuming this exists

// Create a function to add a subscription
// const subscribeUserToRoute = async (req, res) => {
//   try {
//     const { userID, routeID } = req.body;

//     // Check if both userID and routeID are provided
//     if (!userID || !routeID) {
//       return res.status(400).json({ message: 'userID and routeID are required' });
//     }

//     // Verify if the user exists
//     const user = await userModel.findByPk(userID);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Add the new subscription
//     const newSubscription = await SubscribeModel.create({ userID, routeID });

//     // Respond with the created subscription
//     res.status(201).json(newSubscription);
//   } catch (error) {
//     console.error('Error subscribing user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const listsubs = async (req,res)=>{
  try {
      const subs = await SubscribeModel.find({});
      res.json({success:true, data: subs})
  } catch (error) {
      console.log(error)
      res.json({success:false, message:"Error"})
  }
}
// Export the controller function
export {listsubs};
