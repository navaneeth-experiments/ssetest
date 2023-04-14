import EventEmitter from 'node:events';

const emitter = new EventEmitter();

emitter.on('ad', (data) => {
  console.log('data', data);
});

emitter.emit('ad', { img: 'chikki' });
