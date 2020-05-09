import { Notifications } from 'expo';

export const scheduleMorningNotification = () => {
  const date = new Date();
  date.setHours(7);
  date.setDate(date.getDate() + 1);
  Notifications.scheduleLocalNotificationAsync(
    {
      title: 'Good morning',
      body: 'What do you want to focus on today?',
    },
    {
      repeat: 'day',
      time: date,
    }
  );
};
