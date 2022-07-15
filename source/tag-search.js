function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = function() {
    var tag = getParameterByName('tag');
    $('.tag'+tag).show();
    // var shows = document.getElementsByClassName("tag-"+tag);
    // Array.from(shows).forEach(function(item){item.style.display = 'block';});
};

function goSearch(){
    var tag = $('#to-search').value();
    $('li').hide();
    $('.tag'+tag).show();
}
