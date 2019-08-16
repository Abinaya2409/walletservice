#!/bin/bash
# sudo chmod 755 /var/www/server.js # optional
# this will restart app/server on instance reboot
crontab -l | { cat; echo "@reboot pm2 start /var/www/nodeservice/index.js -i 0 --name \"node-application\""; } | crontab -
sudo pm2 stop node-application
# actually start the server
sudo pm2 start /var/www/nodeservice/index.js -i 0 --name "node-application"
