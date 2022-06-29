---
title: "DeangL 的笔记本"
output: html_document
mainfont: msyh
use_math: true
use_toc: true
---
<!-- {% include _toc.md %} -->

我会尝试在这写一些笔记。

## 配置
### Theme
为了不被自己的配置搞乱，还是下载一份放到项目中。

### Latex
配置都配了好久，主要是用到 kramdown 的问题，现在有解决办法清楚了：
1. 建一个文件`_includes/_mathjax_support.html`内容为

	``` html
	<script type="text/x-mathjax-config">
	  MathJax.Hub.Config({
		  TeX: {
		  equationNumbers: {
				  autoNumber: "AMS"
		  }
		  },
		  tex2jax: {
		  inlineMath: [ ['$', '$'] ],
		  displayMath: [ ['\\(', '\\)'] ], // 关键在这，解决 kramdown 把$$替换的问题
		  processEscapes: true,
		  }
	  });
	  MathJax.Hub.Register.MessageHook("Math Processing Error",function (message) {
		  alert("Math Processing Error: "+message[1]);
	  });
	  MathJax.Hub.Register.MessageHook("TeX Jax - parse error",function (message) {
		  alert("Math Processing Error: "+message[1]);
	  });
	</script>
	<script type="text/javascript" async
		src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
	</script>

	```
2. 在某一个文件，如`_layouts\default.html`或`_includes\head-custom.html`中加上

   ``` html
   {% raw %}
   {% if page.use_math %}
	   {% include _mathjax_support.html %}
   {% endif %}
   {% endraw %}
   ```

### wikilink
不好意思，没有。还是用 
``` text
[说明](到目标的相对链接的形式)
```
的形式。
