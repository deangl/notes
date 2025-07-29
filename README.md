---
title: "笔记本设置"
output: html_document
mainfont: msyh
use_math: true
toc: true
categories: [计算机]
---
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
		  displayMath: [ ['\\(', '\\)'],['\\[', '\\]'] ], // 关键在这，解决 kramdown 把$$替换的问题
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
3. 原来对于 `latex` 不支持通过 `edit-indirect` 编辑，自己写了一个patch，如下：

``` emacs-lisp
(defun tsc-markdown-edit-indirect-region-with-mode (mode-name)
  (interactive "s")
  (let* ((mode (markdown-get-lang-mode mode-name))
         (beg (mark))
         (end (point))
	 (edit-indirect-guess-mode-function
          (lambda (_parent-buffer _beg _end)
            (funcall mode)))
	 )
    (edit-indirect-region beg end 'display)
    )
  )

(defun tsc-markdown-edit-indirect-region-with-latex ()
  (interactive (deactivate-mark))
  (tsc-markdown-edit-indirect-region-with-mode "latex")
  )

(defun tsc-markdown-edit-math (pos)
  (interactive "d")
  (if (tsc-in-math-p pos)
      (progn
	(tsc-select-math-region)
	(call-interactively 'tsc-markdown-edit-indirect-region-with-latex))
    )
  )


(defun tsc-math-type (pos)
  (interactive "d")
  (save-excursion
    (goto-char pos)
    (if (tsc-in-math-p pos)
	(progn
	  (search-backward-regexp "[^\\]\\$")
	  (let* ((b (string (char-after)))
		 )
	    (if (string= b "$")
		"display"
	      "inline")
	    )
	  )
      )
    )
  )

(defun tsc-markdown-edit-indirect-region-with-latex-inline-after (beg end)
  (if (string= (tsc-math-type end) "inline")
      (save-excursion
	(goto-char end)
	(delete-forward-char 1)
	)
      )
  )



(defun tsc-msg-math-type (pos)
  (interactive "d")
  (message "math type is %s" (tsc-math-type pos))
  )

(defun tsc-select-math-region ()
  (interactive)
  (search-backward-regexp "[^\\]\\$")
  (forward-char)(forward-char)
  (set-mark-command nil)
  (backward-char)
  (search-forward-regexp "[^\\]\\$")
  (backward-char)  
  )


(defun tsc-face-at-point (pos)
  (interactive "d")
  (let ((face (or (get-char-property pos 'read-face-name)
                  (get-char-property pos 'face))))
    face))

(defun tsc-msg-face (pos)
  (interactive "d")
  (message "face here is %s" (tsc-face-at-point pos))
  )

(defun tsc-point-has-face-p (face-name &optional pos)
  (interactive "sFace-name:")
  (let* (
	 (pos (or pos (point)))
	 (face-here (tsc-face-at-point pos))
	 )
    (if (listp face-here)
	(cl-some  (lambda(x) (string= face-name x)) face-here)
      (string= face-name face-here))
    )
  )


(defun tsc-in-math-p (&optional pos)
  (interactive)
  (let* ((pos (or pos (point)))
	 (in (or
	      (tsc-point-has-face-p "markdown-math-face" pos)
	      (and (tsc-point-has-face-p "markdown-markup-face" pos)
		   (string= "$" (string (char-after)))
		   )
	      )
	     )
	 )
    in
    )
  )

(add-hook 'edit-indirect-after-commit-functions 'tsc-markdown-edit-indirect-region-with-latex-inline-after)

(defun add-edit-indirect-latex-in-markdown (ori-func &rest args)
  (let ((pos (point)))
    (if (tsc-in-math-p pos)
	(tsc-markdown-edit-math pos)
      (apply ori-func args)
      )
    )
  )
(advice-add 'markdown-edit-code-block :around #'add-edit-indirect-latex-in-markdown)


```
4. kramdown 有一个bug，在处理行内公式下划线的时候，对于公式中的用于代表下标的下划线，可能由于优先级处理错误而识别为斜体，并过滤掉了公式的界定符。暂时发现的解决办法是在公式的下划线前加一个空格，虽然不知道为什么，但可以影响优先级。

### wikilink
不好意思，没有。还是用下面的形式。
``` text
[说明](到目标的相对链接的形式)
```


### Table of Contents
在Jekyll内有一套TOC的方法，可是要么1)不漂亮，在md文件中出现非标准的符号；要么2)麻烦，需要装一堆东西，或者甚至是本地要生成什么东西。

然而这其实是一个简单的需求，`JavaScript`来干就是了。于是，在某模板中加入一段：

``` html
{% raw %}
{% if page.toc %}
    <style>
    #toc div.h1 { margin-left: 0 }
    #toc div.h2 { margin-left: 1em }
    #toc div.h3 { margin-left: 2em }
    #toc div.h4 { margin-left: 3em }
    #toc div.h5 { margin-left: 4em }
    #toc div.h6 { margin-left: 5em }
    </style>
    
    <script>
      document.addEventListener('DOMContentLoaded', function() {
	  htmlTableOfContents();
      } );

      function htmlTableOfContents() {
	  var toc = document.getElementById("toc");
	  var ref = document.querySelector("#main_content")
	  var headings = [].slice.call(ref.querySelectorAll('h1, h2, h3, h4, h5, h6'));
	  headings.forEach(function (heading, index) {
              var ref = "toc" + index;
              if ( heading.hasAttribute( "id" ) ) 
		  ref = heading.getAttribute( "id" );
              else
		  heading.setAttribute( "id", ref );

              var link = document.createElement( "a" );
              link.setAttribute( "href", "#"+ ref );
              link.textContent = heading.textContent;

              var div = document.createElement( "div" );
              div.setAttribute( "class", heading.tagName.toLowerCase() );
              div.appendChild( link );
              toc.appendChild( div );
	  });
      }

      try {
	  module.exports = htmlTableOfContents;
      } catch (e) {
	  // module.exports is not defined
      }
    </script>
{% endif %}
{% endraw %}
```

另外，在模板中的合适的位置加一个id为toc的div就可以。当metadata中`toc:true`的时候，就会有TOC了。

### 主页
主页建立一个文档的列表，用下面的代码就好：

``` html
{% raw %}
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
	{% for page in site.pges %}
		{% unless page.categories %}
			{% if page.title %}
				<li><a href=".{{ page.url }}">{{ page.title }}</a></li>		
			{% endif %}
		{% endunless %}
	{% endfor %}
</ul>
{% endraw %}
```
另外在`_config.yml`中要建立`category-list`这个变量。
