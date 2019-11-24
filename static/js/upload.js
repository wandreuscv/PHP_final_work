$(function() {

    // preventing page from redirecting
    $("html").on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("#h4-joke-text").text("Solte aqui");
    });

    $("html").on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });

    // Drag enter
    $('.upload-area').on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("#h4-joke-text").text("Solte");
    });

    // Drag over
    $('.upload-area').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("#h4-joke-text").text("Solte");
    });

    // Drop
    $('.upload-area').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        $("#h4-joke-text").text("Realizando upload");

        var file = e.originalEvent.dataTransfer.files;
        var fd = new FormData();

        fd.append('file', file[0]);

        uploadData(fd);
    });

    // Open file selector on div click
    $("#uploadfile").click(function(){
        $("#file").click();
    });

    // file selected
    $("#file").change(function(){
        var fd = new FormData();

        var files = $('#file')[0].files[0];

        fd.append('file',files);

        uploadData(fd);
    });
    });

    // Sending AJAX request and upload file
    function uploadData(formdata){

    $.ajax({
        url: 'upload.php',
        type: 'post',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response){
            addThumbnail(response);
        }
    });
    }

    // Added thumbnail
    function addThumbnail(data){
    $("#uploadfile #content-align #joke-text").remove(); 
    var len = $("#uploadfile div.thumbnail").length;

    var num = Number(len);
    num = num + 1;

    var name = nameLenght(data.name);
    var size = convertSize(data.size);
    var src = data.src;

    // Creating an thumbnail
    $("#uploadfile").append('<div id="thumbnail_'+num+'" class="thumbnail d-flex flex-column"></div>');
    $("#thumbnail_"+num).append('<img src="'+src+'" width="100%" height="78%">');
    $("#thumbnail_"+num).append('<span class="name">'+name+'<span>');
    $("#thumbnail_"+num).append('<span class="size">'+size+'<span>');

    }

    function nameLenght(name){
        var name_modified = ' ';

        if (name.length > 9){
            for (let index = 0; index < 9; index++){
                name_modified += name[index];
            }
            for (let index = 0; index < name.length; index++) {
                console.log(name[index]);
                if (name[index] == '.'){
                    for (let index_intern = index; index_intern < name.length; index_intern++) {
                        name_modified += name[index_intern];
                    }
                }
            }
            return name_modified;
        }
        else{
            return name
        }
    }

    // Bytes conversion
    function convertSize(size) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (size == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
    return Math.round(size / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }