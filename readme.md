# GoCDN
 Combining the power of Cloudflare Workers and Google Drive will allow you to use Google Drive into a Content Delivery Network.

``src/index.js`` is the content of the Workers script. and
``start.js`` is to start Workers inside your server

## Setup
1. Install rclone software locally
2. Follow https://rclone.org/drive/ bind a drive
3. Execute the commandrclone config file to find the file rclone.conf path
4. Open rclone.conf,find the configuration root_folder_id and refresh_token
5. Clone the repository https://github.com/PartyService/GoCDN and fill in root and refresh_token on settings.json
6. run ``npm i`` to install all dependencies
7. run ``start.js`` to run locally on your PC. If you want to publish it to Cloudflare Workers dev, you can run ``npx wrangler publish``.

## License
The GoCDN repository is licensed under the MIT License. Please see the ``LICENSE`` file for more information.

## Credits
[GoIndex](https://github.com/alx-xlx/goindex) - Alx-xlx