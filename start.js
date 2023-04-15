/* 
 * 
 */
const process = require('process');
var serverPort = 8787;
console.clear()
console.log("[ROOT] Running Workers Without Cloudflare")

var spawn = require('child_process').spawn;
//kick off process of listing files
var child = spawn(`npx wrangler dev`, ['--port', serverPort, '--local'], { shell: true });
child.stdout.on('data', function (data) {
        process.stdout.write(data);
})
console.log(`[ROOT] Running On ${serverPort}`)
child.stderr.on('data', function (data) { process.stdout.write(data.toString()); });
child.on('close', function (code) {
    console.log("App Stopped With Code" + code);
});
