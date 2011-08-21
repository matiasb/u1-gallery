self.port.on('OpenImage', function(image_src) {
    console.log(image_src);
    $('#content').append('<img src="' + image_src + '"/>');
});
