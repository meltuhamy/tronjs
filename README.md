tronjs
======

HTML5 Tron :)

Set up
------
[Install node.js](http://nodejs.org/download/)

To test node is installed, type ```node --version```.

Now, install all package dependencies by going to the project directory and 
type ```npm install```. This will get all the dependencies we need for the
project.

To compile, type ```./compile.sh```.
 **Note**: There may be some warnings, you can ignore these for now.

To view the game, open ```public/index.html``` in the browser.


To run the server, type ```node server.js```, then navigate to ```http://0.0.0.0:9999/```.

I have uploaded a simple sockjs example. You can see it here: ```http://0.0.0.0:9999/sockjs.html```.
All it does is replies with the same content.