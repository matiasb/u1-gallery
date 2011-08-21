
var gallery;

function _new_image(url, f_name) {
    return '<li><a class="thumb" href="' + url + '" title="' + f_name + '"><img src="#"/></a><div class="caption"><a class="open-image" target="_blank" href="' + url + '">' + f_name + '</a></div></li>';
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
        $('#slideshow').html('<p>No images available.</p>');
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
