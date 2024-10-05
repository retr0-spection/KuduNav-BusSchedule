import express from "express"
import subscribeModel from "../../models/subscribedModel.js";
import scheduleModel from "../../models/scheduleModel.js";
import nodeCron from 'node-cron';
import moment from 'moment';

const notifyRouter = express.Router();
// Function to check and notify
const notifyUsersForUpcomingDepartures = async () => {
    try {
        const currentTime = new Date();
        const notificationTime = moment(currentTime).add(10, 'minutes').toDate();

        // Find schedules where departure time is 10 minutes from now
        const upcomingSchedules = await scheduleModel.find({
            "stops.departureTime": { $gte: currentTime, $lte: notificationTime }
        });

        for (const schedule of upcomingSchedules) {
            const subscribedUsers = await subscribeModel.find({ RouteID: schedule.RouteID });

            // Simulate sending notifications
            subscribedUsers.forEach(user => {
                sendNotification(user.userID, schedule.RouteID, schedule.stops);
            });
        }
    } catch (err) {
        console.error('Error fetching upcoming departures:', err);
    }
};

// Function to simulate sending notification
const sendNotification = (userID, routeID) => {
    console.log(`Notification sent to user ${userID} for route ${routeID} departing in 10 minutes.`);
    // Implement actual notification logic (e.g., Email, SMS, Push notification)
};

// 2. API Endpoint to Manually Trigger Notifications
notifyRouter.post('/notify', async (req, res) => {
    try {
        await notifyUsersForUpcomingDepartures();
        res.status(200).send('Notifications sent for upcoming departures.');
    } catch (err) {
        res.status(500).send('Error while sending notifications.');
    }
});

// 3. Schedule the Task to Run Every Minute Automatically
nodeCron.schedule('* * * * *', notifyUsersForUpcomingDepartures);

export default notifyRouter;
