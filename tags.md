---
layout: default
categories: [hide]
---
<ul>
	{% for page in site.pages %}
		{% for tag in page.tags %}
			<li><a class="tag-{{ tag }}" style="display:none" href=".{{ page.url }}">{{ page.title }}</a></li>
		{% endfor %}
	{% endfor %} <!-- page -->
</ul>


<script type="text/javascript">
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    window.onload = function() {
        var tag = getParameterByName('tag');
		console.log(tag)
		var shows = document.getElementsByClassName("tag-"+tag)
		console.log(shows)
		shows.forEach(function(item)
		{item.style.display = 'block';}
		)

    };
</script>
