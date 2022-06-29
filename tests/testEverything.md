---
title: "测试"
output: html_document
toc: ture
mainfont: msyh
use_math: true
---

[toc]

# 测试各种功能
如果可用，可为之后的笔记当例子

## latex
Inline 的$$\sum_{i}^{j} \alpha_i^j = \beta$$这个是好的。

下面的是坏的：
$$
	\alpha
$$

## 贴图
![测试贴图](./img/test1.png)

## 内链
[到test目标的链接](./testAimFile.md)

## Code

``` python
def go(a,b):
	print('{}:{}'.format(a,b))
	return a+b
```
