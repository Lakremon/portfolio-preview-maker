var page = require('webpage').create(),
    system = require('system');
address = system.args[1];
imageName = system.args[2];
resolution = system.args[3].split('x');
winth = resolution[0];
height = resolution[1];
//viewportSize being the actual size of the headless browser
page.viewportSize = {width: winth, height: height};
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = {top: 0, left: 0, width: winth, height: height};
page.open(address, function (status) {
    page.render(imageName);
    phantom.exit();
});