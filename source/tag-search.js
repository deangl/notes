function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = function() {
    var tag = getParameterByName('tag');
    var shows = document.getElementsByClassName("tag-"+tag);
    Array.from(shows).forEach(function(item){item.style.display = 'block';});
};
