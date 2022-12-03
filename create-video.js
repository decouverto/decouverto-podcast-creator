import fs from 'fs';
import path from 'path';
const inputFilesPath = './input_audio';
const inputFiles = fs.readdirSync(inputFilesPath);
const outputFilesPath = './final_video';
const excludedFiles = ['.gitkeep'];
const matching = JSON.parse(fs.readFileSync('text_matching.json', 'utf-8'));
import editly from 'editly';
import { getAudioDurationInSeconds }  from 'get-audio-duration';

inputFiles.forEach(value => {
    if (!excludedFiles.includes(value)) {
        let inputFile = path.join(inputFilesPath, value);
        let outputFile = path.join(outputFilesPath, value).replace('.mp3', '.mp4');
        fs.stat(outputFile, function (err, stats) {
            if (err) {
                getAudioDurationInSeconds(inputFile).then(async (duration) => {
                    console.log(duration);
                    await editly({
                        outPath: outputFile,
                        width: 1280,
                        clips: [
                            { layers: [{ type: 'video', path: './generiques/start.mp4' }] },
                            {   duration: duration,
                                layers: 
                                    [
                                        { type: 'image', path: './images/background_red.png', resizeMode: 'cover' },
                                        { type: 'audio', path: inputFile },
                                        { type: 'title', position: 'bottom', text: matching[value], color: '#fff' },
                                    ] 
                            },
                            { layers: [{ type: 'video', path: './generiques/end.mp4'  }] }
                        ],
                        enableFfmpegLog: false,
                        verbose: false,
                        fast: false,
                        clipsAudioVolume: 1,
                        outputVolume: 1,
                        keepSourceAudio: true
                     });
                    console.log(outputFile + ' done.');
                })
            } else {
                console.log(outputFile + ' already done.');
            }
         });
    }
})