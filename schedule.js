import schedule from 'node-schedule';
const date = new Date(2023, 3, 9, 17, 32, 0);

const job = schedule.scheduleJob(date, function () {
  console.log('The world is going to end today.');
});
