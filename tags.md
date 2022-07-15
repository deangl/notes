---
layout: default
categories: [hide]
---

<input type="text" value="" placeholder="Tag" class="form-control" id="to-search">
<button type="button" id="go-search" onclick="goSearch()">查找</button>



<ul>
	{% for page in site.pages %}
		<li class="
		{% for tag in page.tags %}
			tag-{{ tag }} 
		{% endfor %}
		" style="display:none" ><a href=".{{ page.url }}">{{ page.title }}</a></li>
	{% endfor %} <!-- page -->
</ul>

<script src="/notes/source/tag-search.js"></script>
