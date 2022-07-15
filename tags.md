---
layout: default
categories: [hide]
---

<div class="row demo-row">
<div class="col-xs-3">
<div><input type="text" value="" placeholder="Tag" class="form-control" id="to-search"></div>
</div>
<div class="col-xs-3">
<a href="#fakelink" class="btn btn-block btn-lg btn-danger" id="go-search">查找</a>
</div>
</div>

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
