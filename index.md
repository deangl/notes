---
title: "DeangL 的笔记本"
output: html_document
toc: false
mainfont: msyh
use_math: true
categories: [ignore]
tags: [IT,notes,jekyll]
---
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />

{% for cat in site.category-list %}
### {{ cat }}
<ul>
  {% for page in site.pages %}
      {% for pc in page.categories %}
        {% if pc == cat %}
          <li><a href=".{{ page.url }}">{{ page.title }}</a></li>
        {% endif %}   <!-- cat-match-p -->
      {% endfor %}  <!-- page-category -->
  {% endfor %}  <!-- page -->
</ul>
{% endfor %}  <!-- cat -->
### 未分类
<ul>
	{% for page in site.pages %}
		{% unless page.categories %}
			{% if page.title %}
				<li><a href=".{{ page.url }}">{{ page.title }}</a></li>		
			{% endif %}
		{% endunless %}
	{% endfor %}
</ul>

