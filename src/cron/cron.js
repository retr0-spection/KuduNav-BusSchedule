import cron from 'node-cron';
import { notifyUsersForUpcomingDepartures } from '../routes/notifyRoute.js';

// cron.schedule('*/5 * * * *',notifyUsersForUpcomingDepartures)
cron.schedule('* * * * * *',() => notifyUsersForUpcomingDepartures())
