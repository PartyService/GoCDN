export class googleDrive {
  constructor(authConfig) {
    this.authConfig = authConfig;
    this.paths = [];
    this.files = [];
    this.passwords = [];
    this.paths["/"] = authConfig.root;
    if (authConfig.root_pass != "") {
      this.passwords["/"] = authConfig.root_pass;
    }
    this.accessToken();
  }

  async down(id, range = "", inline = true, cors = true) {
    let url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;
    let requestOption = await this.requestOption();
    requestOption.headers["Range"] = range;
    let res = await fetch(url, requestOption);
    const { headers } = (res = new Response(res.body, res));
    cors && headers.append("Access-Control-Allow-Origin", "*");
    inline === true && headers.set("Content-Disposition", "inline");
    return res;
  }

  async file(path) {
    if (typeof this.files[path] == 'undefined') {
      this.files[path] = await this._file(path);
    }
    return this.files[path];
  }

  async _file(path) {
    let arr = path.split('/');
    let name = arr.pop();
    name = decodeURIComponent(name).replace(/\'/g, "\\'");
    let dir = arr.join('/') + '/';
    console.log(name, dir);
    let parent = await this.findPathId(dir);
    console.log(parent);
    let url = 'https://www.googleapis.com/drive/v3/files';
    let params = { 'includeItemsFromAllDrives': true, 'supportsAllDrives': true };
    params.q = `'${parent}' in parents and name = '${name}' andtrashed = false`;
    params.fields = "files(id, name, mimeType, size ,createdTime, modifiedTime, iconLink, thumbnailLink)";
    url += '?' + this.enQuery(params);
    let requestOption = await this.requestOption();
    let response = await fetch(url, requestOption);
    let obj = await response.json();
    console.log(obj.files[0]);
    return obj.files[0];
  }

  // 通过reqeust cache 来缓存
  async list(path) {
    if (gd.cache == undefined) {
      gd.cache = {};
    }

    if (gd.cache[path]) {
      return gd.cache[path];
    }

    let id = await this.findPathId(path);
    var obj = await this._ls(id);
    if (obj.files && obj.files.length > 1000) {
      gd.cache[path] = obj;
    }

    return obj
  }

  async password(path) {
    if (this.passwords[path] !== undefined) {
      return this.passwords[path];
    }

    console.log("load", path, ".password", this.passwords[path]);

    let file = await gd.file(path + '.password');
    if (file == undefined) {
      this.passwords[path] = null;
    } else {
      let url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
      let requestOption = await this.requestOption();
      let response = await this.fetch200(url, requestOption);
      this.passwords[path] = await response.text();
    }

    return this.passwords[path];
  }

  async _ls(parent) {
    console.log("_ls", parent);

    if (parent == undefined) {
      return null;
    }
    const files = [];
    let pageToken;
    let obj;
    let params = { 'includeItemsFromAllDrives': true, 'supportsAllDrives': true };
    params.q = `'${parent}' in parents and trashed = false AND name !='.password'`;
    params.orderBy = 'folder,name,modifiedTime desc';
    params.fields = "nextPageToken, files(id, name, mimeType, size , modifiedTime)";
    params.pageSize = 1000;

    do {
      if (pageToken) {
        params.pageToken = pageToken;
      }
      let url = 'https://www.googleapis.com/drive/v3/files';
      url += '?' + this.enQuery(params);
      let requestOption = await this.requestOption();
      let response = await fetch(url, requestOption);
      obj = await response.json();
      files.push(...obj.files);
      pageToken = obj.nextPageToken;
    } while (pageToken);

    obj.files = files;
    return obj;
  }

  async findPathId(path) {
    let c_path = '/';
    let c_id = this.paths[c_path];

    let arr = path.trim('/').split('/');
    for (let name of arr) {
      c_path += name + '/';

      if (typeof this.paths[c_path] == 'undefined') {
        let id = await this._findDirId(c_id, name);
        this.paths[c_path] = id;
      }

      c_id = this.paths[c_path];
      if (c_id == undefined || c_id == null) {
        break;
      }
    }
    console.log(this.paths);
    return this.paths[path];
  }

  async _findDirId(parent, name) {
    name = decodeURIComponent(name).replace(/\'/g, "\\'");

    console.log("_findDirId", parent, name);

    if (parent == undefined) {
      return null;
    }

    let url = 'https://www.googleapis.com/drive/v3/files';
    let params = { 'includeItemsFromAllDrives': true, 'supportsAllDrives': true };
    params.q = `'${parent}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${name}'  and trashed = false`;
    params.fields = "nextPageToken, files(id, name, mimeType)";
    url += '?' + this.enQuery(params);
    let requestOption = await this.requestOption();
    let response = await fetch(url, requestOption);
    let obj = await response.json();
    if (!obj.files[0]) {
      return null;
    }
    return obj.files[0].id;
  }

  async accessToken() {
    console.log("accessToken");
    if (this.authConfig.expires == undefined || this.authConfig.expires < Date.now()) {
      const obj = await this.fetchAccessToken();
      if (obj.access_token != undefined) {
        this.authConfig.accessToken = obj.access_token;
        this.authConfig.expires = Date.now() + 3500 * 1000;
      }
    }
    return this.authConfig.accessToken;
  }

  async fetchAccessToken() {
    console.log("fetchAccessToken");
    const url = "https://www.googleapis.com/oauth2/v4/token";
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const post_data = {
      'client_id': this.authConfig.client_id,
      'client_secret': this.authConfig.client_secret,
      'refresh_token': this.authConfig.refresh_token,
      'grant_type': 'refresh_token'
    }

    let requestOption = {
      'method': 'POST',
      'headers': headers,
      'body': this.enQuery(post_data)
    };

    const response = await fetch(url, requestOption);
    return await response.json();
  }

  async fetch200(url, requestOption) {
    let response;
    for (let i = 0; i < 3; i++) {
      response = await fetch(url, requestOption);
      console.log(response.status);
      if (response.status != 403) {
        break;
      }
      await this.sleep(800 * (i + 1));
    }
    return response;
  }

  async requestOption(headers = {}, method = 'GET') {
    const accessToken = await this.accessToken();
    headers['authorization'] = 'Bearer ' + accessToken;
    return { 'method': method, 'headers': headers };
  }

  enQuery(data) {
    const ret = [];
    for (let d in data) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
  }

  sleep(ms) {
    return new Promise(function (resolve, reject) {
      let i = 0;
      setTimeout(function () {
        console.log('sleep' + ms);
        i++;
        if (i >= 2) reject(new Error('i>=2'));
        else resolve(i);
      }, ms);
    })
  }
}