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

<script src="/notes/source/tag-search.js"></script>
