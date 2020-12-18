// var ffmpeg = require('ffmpeg');
//
// try {
//     var process = new ffmpeg('data/test.mp4');
//     process.then(function (video) {
//         // Video metadata
//         console.log(video.metadata);
//         // FFmpeg configuration
//         console.log(video.info_configuration);
//         // video.addCommand('-ss', '00:00:30')
//         // video.addCommand('-vframes', '1')
//         video.save('output/test.jpg', function (error, file) {
//             if (!error)
//                 console.log('Video file: ' + file);
//         });
//     }, function (err) {
//         console.log('Error: ' + err);
//     });
// } catch (e) {
//     console.log(e.code);
//     console.log(e.msg);
// }

var ffmpeg = require('fluent-ffmpeg');
var path = 'd:/ffmpeg/bin/';
ffmpeg.setFfmpegPath(path+'ffmpeg.exe');
ffmpeg.setFfprobePath(path+'ffprobe.exe')
// ffmpeg.setFlvtoolPath(path.'ffmpeg.exe')

// ffmpeg.getAvailableFormats(function(err, formats) {
//     console.log('Available formats:');
//     console.dir(formats);
// });
//
// ffmpeg.getAvailableCodecs(function(err, codecs) {
//     console.log('Available codecs:');
//     console.dir(codecs);
// });
//
// ffmpeg.getAvailableEncoders(function(err, encoders) {
//     console.log('Available encoders:');
//     console.dir(encoders);
// });
//
// ffmpeg.getAvailableFilters(function(err, filters) {
//     console.log("Available filters:");
//     console.dir(filters);
// });
//
//
ffmpeg('data/test.mp4')
    .screenshots({
        timestamps: [0],
        filename: 'thumbnail-at-%s-seconds.jpg',
        folder: 'output',
        // size: '320x240'
    });