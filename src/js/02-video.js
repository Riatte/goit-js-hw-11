import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';


// player.on('play', function () {
//     console.log('played the video!');
// });

player.on('timeupdate', throttle(catchTime, 1000));

function catchTime (data) {
    const time = data.seconds;
    console.log(data.seconds);
   localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, time);
};

const time = +localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);

player.setCurrentTime(time);