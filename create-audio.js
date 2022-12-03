const fs = require('fs');
const path = require('path');
const inputFilesPath = './final_video';
const inputFiles = fs.readdirSync(inputFilesPath);
const outputFilesPath = './final_audio';
const excludedFiles = ['.gitkeep'];
const extractAudio = require('ffmpeg-extract-audio');
 

inputFiles.forEach(value => {
    if (!excludedFiles.includes(value)) {
        let inputFile = path.join(inputFilesPath, value);
        let outputFile = path.join(outputFilesPath, value).replace('.mp4', '.mp3');
        fs.stat(outputFile, async function (err, stats) {
            if (err) {
                await extractAudio({
                    input: inputFile,
                    output: outputFile
                });
                console.log(outputFile + ' done.');
            } else {
                console.log(outputFile + ' already done.');
            }
         });
    }
})