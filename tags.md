---
layout: default
categories: [hide]
---
<ul>
	{% for page in site.pages %}
		<li class="
		{% for tag in page.tags %}
			tag-{{ tag }} 
		{% endfor %}
		" style="display:none" ><a href=".{{ page.url }}">{{ page.title }}</a></li>
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
		Array.from(shows).forEach(function(item)
		{item.style.display = 'block';}
		)

    };
</script>
