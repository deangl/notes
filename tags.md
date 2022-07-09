---
layout: default
categories: [hide]
---
<ul>
	{% for page in site.pages %}
        <li><a href=".{{ page.url }}">{{ page.title }}</a></li>
	{% endfor %} <!-- page -->
</ul>


<!-- <script type="text/javascript"> -->
<!--     function getParameterByName(name) { -->
<!--         name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); -->
<!--         var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), -->
<!--             results = regex.exec(location.search); -->
<!--         return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); -->
<!--     } -->
    
<!--     window.onload = function() { -->
<!--         var tag = getParameterByName('tag'); -->
<!--         if (tag && document.getElementById('tag-' + tag)) { -->
<!--             document.getElementById('tag-' + tag).style.display = 'block'; -->
<!--             document.getElementById('tagTitle').innerHTML = tag; -->
<!--         } else { -->
<!--             document.getElementById('tagTitle').innerHTML = 'Illegal Tag Query'; -->
<!--         } -->
<!--     }; -->
<!-- </script> -->
