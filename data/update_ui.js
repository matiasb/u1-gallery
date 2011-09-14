/* FIX? Hard-coded gallery icon URL */
var gallery_icon = 'resource://jid1-1bahfinjmd3alq-at-jetpack-u1-gallery-data/images/gallery.png';

function update_ui() {
    /* Add the 'View as gallery' option to folders */
    $('#left_controls').each(function () {
        var file_options = $(this).find('ul');
        if (file_options.find('a.slideshow').length == 0){
            file_options.append($('<li>').append(
                $('<a>', {class: "add-button slideshow",
                          text: 'View as gallery'}))
            );
            $('a.slideshow').css('background-image',
                                 'url("' + gallery_icon + '")');

            /* Bind the gallery link to our backend event
               to show the gallery panel */
            $('a.slideshow').click(function (event) {
                event.stopPropagation();
                event.preventDefault();

                /* filter for images */
                var files = $('tr.file').filter(function (index) {
                    var file_details = $(this).next('tr.file-details');
                    var mime = file_details.find("li:contains('File type')");
                    return (mime.text().indexOf('image') >= 0);
                });

                /* get image files information */
                var files_data = [];
                files.each(function(){
                    files_data.push({
                        'url': $(this).find('td.files-td-name a').attr('href'),
                        'name': $(this).find('td.files-td-name').attr('id')
                    });
                });

                self.port.emit("ShowSlideshow", files_data);
                return false;
            });
        }
    });
}

/* FIX: hack to get the gallery link in the UI after a ajax refresh;
        onhashchange not working?
*/
setInterval(update_ui, 1000);
