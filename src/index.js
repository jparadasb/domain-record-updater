import Telegraf from 'telegraf';

const { BOT_TOKEN } = process.env;
const App = new Telegraf(BOT_TOKEN);

App.command('start', ({ reply }) => reply('Welcome'));

App.startPolling();
