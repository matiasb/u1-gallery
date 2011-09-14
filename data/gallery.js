
var gallery;

function _new_image(url, f_name) {
    return $('<li>').append(
                $('<a>', {class: "thumb", href: url, title: f_name}).append(
                    $('<img>', {src: "#"})
                )
            ).append(
                $('<div>', { class: "caption"}).append(
                    $('<a>', {class: "open-image", target: "_blank",
                              href: url, text: f_name})
                )
            );
}

$(window).click(function(event){
    var t = event.target;

    // Don't intercept the click if it isn't on a link.
    if (t.nodeName != "A")
        return;

    // Only intercept links to open images
    if (!$(t).hasClass('open-image'))
        return;

    event.stopPropagation();
    event.preventDefault();
    self.port.emit("OpenImageNewTab", t.toString());
});


self.on('message', function(message) {
    var files = message;
    var thumbnails = $('#thumbnails ul');

    if (gallery){
        gallery.pause();
    }

    /* clear panel */
    $('#slideshow').empty();
    thumbnails.empty();
    for (var i = 0; i < files.length; i++){
        /* append images to gallery */
        thumbnails.append(_new_image(files[i].url, files[i].name));
    }

    if (files.length == 0){
        $('#slideshow').append($('<p>').text('No images available.'));
        $('#loading, #caption, #controls').hide();
    }else{
        $('#loading, #caption, #controls').show();
        gallery = $('#thumbnails').galleriffic({imageContainerSel: '#slideshow',
                                                controlsContainerSel: '#controls',
                                                captionContainerSel: '#caption',
                                                loadingContainerSel: '#loading',
                                                numThumbs: files.length,
                                                preloadAhead: 3,
                                                enableBottomPager: false,
                                                playLinkText: '[ Play &rsaquo; ]',
                                                pauseLinkText: '[ Pause || ]',
                                                prevLinkText: '&lsaquo; Previous',
                                                nextLinkText: 'Next &rsaquo;',
                                                nextPageLinkText: '&rsaquo;',
                                                prevPageLinkText: '&lsaquo;'});
    }
});
