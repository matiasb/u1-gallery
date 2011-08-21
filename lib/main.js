var pageMod = require("page-mod");
var panel = require("panel");
var tabs = require("tabs");
var self = require("self");

/* Gallery panel */
var gallery = panel.Panel({
        width: 600,
        height: 500,
        contentURL: self.data.url("gallery.html"),
        contentScriptFile: [self.data.url('jquery-1.6.2.min.js'),
                            self.data.url('jquery.galleriffic.js'),
                            self.data.url('gallery.js')],
    });


/* Open image in a new tab */
gallery.port.on("OpenImageNewTab", function(image_url){
    tabs.open({
        inBackground: true,
        url: self.data.url("image.html"),
        onReady: function onReady(tab) {
            var worker = tab.attach({
                contentScriptFile: [self.data.url("jquery-1.6.2.min.js"),
                                    self.data.url("load_image.js")]
            });
            worker.port.emit('OpenImage', image_url);
        }
    });
});


/* Attach pagemod to U1 files */
pageMod.PageMod({
    include: ['https://one.ubuntu.com/files/*'],
    contentScriptWhen: 'end',
    contentScriptFile: [self.data.url("jquery-1.6.2.min.js"),
                        self.data.url("update_ui.js")],
    onAttach: function(worker) {
        worker.port.on('ShowSlideshow', function(images_data) {
            gallery.postMessage(images_data);
            if (!gallery.isShowing)
                gallery.show();
        });
    }
});
