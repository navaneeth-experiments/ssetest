import express from 'express';
import cors from 'cors';
import compression from 'compression';
import SSE from './sse.js';
import schedule from 'node-schedule';

const sse = new SSE(['test']);
import EventEmitter from 'node:events';

const emitter = new EventEmitter();

// import { nanoid } from 'nanoid';

let carousels = [
  {
    _id: 'nW6rE63',
    items: [
      {
        img: 'l.webp',
      },
      {
        img: 'k.webp',
      },
      {
        img: 'main12.webp',
      },
      {
        img: 'carouselImage3.jpg',
      },
    ],
  },
  {
    _id: 'dvTg769',
    items: [
      {
        img: '5.png',
      },
      {
        img: '6.png',
      },
      {
        img: '8.png',
      },
      {
        img: '6.png',
      },
    ],
  },
];

// const config = [
//   {
//     type: 'carousel',
//     sType: 'main',
//     columns: 12,
//     title: 'Main',
//     _id: nanoid(7),
//   },
//   [
//     {
//       type: 'add',
//       sType: 'side',
//       columns: 3,
//       title: 'add: Beauty, Food, Toys & more',
//       _id: nanoid(7),
//     },
//     {
//       type: 'add',
//       sType: 'Beauty, Food, Toys & more',
//       columns: 3,
//       title: 'Beauty, Food, Toys & more',
//       _id: nanoid(7),
//     },
//     {
//       type: 'add',
//       sType: 'side',
//       columns: 3,
//       title: 'add: Beauty, Food, Toys & more',
//       _id: nanoid(7),
//     },
//     {
//       type: 'add',
//       sType: 'Beauty, Food, Toys & more',
//       columns: 3,
//       title: 'Beauty, Food, Toys & more',
//       _id: nanoid(7),
//     },
//   ],
//   [
//     {
//       type: 'add',
//       sType: 'side',
//       columns: 3,
//       title: 'add: Best of Electronics',
//       _id: nanoid(7),
//     },
//     {
//       type: 'carousel',
//       sType: 'Best of Electronics',
//       columns: 9,
//       title: 'Best of Electronics',
//       _id: nanoid(7),
//     },
//   ],

//   [
//     {
//       type: 'add',
//       sType: 'side',
//       columns: 6,
//       title: 'add: Sports, Healthcare & more',
//       _id: nanoid(7),
//     },
//     {
//       type: 'carousel',
//       sType: 'Sports, Healthcare & more',
//       columns: 6,
//       title: 'Sports, Healthcare & more',
//       _id: nanoid(7),
//     },
//   ],
// ];
let config = [
  {
    _id: 'nW6rdE63',
    rank: 1,
    meta: {
      type: 'carousel',
      sType: 'main',
      columns: 12,
      title: 'Main',
      sts: 1,
      _id: 'nW6rE63',
    },
  },
  // [
  //   // try to add category in ad and carousel
  //   {
  //     type: 'add',
  //     sType: 'side',
  //     columns: 3,
  //     title: 'add: Beauty, Food, Toys & more',
  //     _id: 'xs3JAB5',
  //     img: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     type: 'add',
  //     sType: 'Beauty, Food, Toys & more',
  //     columns: 3,
  //     title: 'Beauty, Food, Toys & more',
  //     _id: 'xDUR_d6',
  //     img: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     type: 'add',
  //     sType: 'side',
  //     columns: 3,
  //     title: 'add: Beauty, Food, Toys & more',
  //     _id: '2PJrbqz',
  //     img: 'https://images.pexels.com/photos/208052/pexels-photo-208052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     type: 'add',
  //     sType: 'Beauty, Food, Toys & more',
  //     columns: 3,
  //     title: 'Beauty, Food, Toys & more',
  //     _id: '3_HaseV',
  //     img: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  // ],
  // [
  //   {
  //     type: 'add',
  //     sType: 'side',
  //     columns: 3,
  //     title: 'add: Best of Electronics',
  //     _id: 'p1zOMp3',
  //     img: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     type: 'carousel',
  //     sType: 'Best of Electronics',
  //     columns: 9,
  //     title: 'Best of Electronics',
  //     _id: 'EU0U068',
  //   },
  // ],
  // [
  //   {
  //     type: 'add',
  //     sType: 'side',
  //     columns: 6,
  //     title: 'add: Sports, Healthcare & more',
  //     _id: '2bP7n44',
  //     img: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     type: 'carousel',
  //     sType: 'Sports, Healthcare & more',
  //     columns: 6,
  //     title: 'Sports, Healthcare & more',
  //     _id: 'jdFZD6L',
  //     img: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  // ],
];

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(compression());

const writeEvent = (res, sseId, data) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
  res.flush();
};

const sendEvent = (_req, res) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*',
  });

  const sseId = new Date();

  emitter.on('ad', (data) => {
    writeEvent(res, sseId, JSON.stringify(data));
  });

  writeEvent(res, sseId, JSON.stringify(config));
};

app.post('/ad', (req, res) => {
  const { ad, time } = req.body;
  if (time) {
    const { year, month, date, hours, minutes, seconds } = time;
    const shceduledTime = new Date(year, month, date, hours, minutes, seconds);

    config.unshift(ad);

    const rule = new schedule.RecurrenceRule();
    rule.year = year;
    rule.month = month;
    rule.date = date;
    rule.hour = hours;
    rule.minute = minutes;
    rule.second = seconds;
    rule.tz = 'Asia/Kolkata';
    schedule.scheduleJob(rule, function () {
      emitter.emit('ad', config);
    });

    // sse.send(config, 'added');
    // sendEvent(req, res);
    return res.json({ message: 'successfully sent the data' });
  } else {
    config.unshift(ad);
    emitter.emit('ad', config);
    return res.json({ message: 'successfully sent the data' });
  }
});

app.get('/dashboard', (req, res) => {
  if (req.headers.accept === 'text/event-stream') {
    sse.send(config, 'added');
  } else {
    res.json({ message: 'Ok' });
  }
});

app.listen(7071, () => {
  console.log(`Application started 🎉`);
});

app.get('/carousel/:id', (req, res) => {
  const { id } = req.params;
  const carousel = carousels.filter((item) => item._id == id);
  res.status(200).json(carousel);
});

app.put('/remove/:id', (req, res) => {
  const { id } = req.params;
  const configs = config.filter((item) => item._id !== id);
  config = configs;
  emitter.emit('ad', config);
  res.status(200).json({ msg: 'ad removed successfully', config });
});
app.put('/removeall', (req, res) => {
  config = [
    {
      _id: 'nW6rdE63',
      rank: 1,
      meta: {
        type: 'carousel',
        sType: 'main',
        columns: 12,
        title: 'Main',
        sts: 1,
        _id: 'nW6rE63',
      },
    },
  ];
  emitter.emit('ad', config);
  res.status(200).json({ msg: 'removed all' });
});

app.get('/add', (req, res) => {});
app.get('/stream', (req, res) => {
  sendEvent(req, res);
  // sse.init(req, res);
});
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'hello from express server' });
});
