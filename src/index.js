var authConfig = require("../settings.json");
const googleDrive = require('./Google/driveUtil').googleDrive;
var gd;
var html = require("./pages/pages");

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request).catch((err) => {
        return new Response(html.w500.replace("{ERROR-FIELD}", err.stack), { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }));
});

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
    if (gd == undefined) {
        gd = new googleDrive(authConfig);
    }

    if (request.method == 'POST') {
        return apiRequest(request);
    }

    let url = new URL(request.url);
    let path = url.pathname;
    let action = url.searchParams.get('a');

    if (path.substr(-1) == '/' || action != null) {
        return new Response(html.wisfolder, { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    } else {
        if (path.split('/').pop().toLowerCase() == ".password") {
            return new Response(html.w404, { status: 404 });
        }
        let file = await gd.file(path);
        let range = request.headers.get('Range');
        if (file && file.id) {
            return gd.down(file.id, range);
        }
        else {
            return new Response(html.w404, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
        }
    }
}


async function apiRequest(request) {
    let url = new URL(request.url);
    let path = url.pathname;

    let option = { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }

    if (path.substr(-1) == '/') {
        // check password
        let password = await gd.password(path);
        console.log("dir password", password);
        if (password != undefined && password != null && password != "") {
            try {
                var obj = await request.json();
            } catch (e) {
                var obj = {};
            }
            console.log(password, obj);
            if (password.replace("\n", "") != obj.password) {
                let html = `{"error": {"code": 401,"message": "password error."}}`;
                return new Response(html, option);
            }
        }
        let list = await gd.list(path);
        return new Response(JSON.stringify(list), option);
    } else {
        let file = await gd.file(path);
        let range = request.headers.get('Range');
        return new Response(JSON.stringify(file));
    }
}

String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};