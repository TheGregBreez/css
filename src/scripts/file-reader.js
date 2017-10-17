import $ from 'jquery';

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#photo').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$("#photoInput").change(function () {
    readURL(this);
});