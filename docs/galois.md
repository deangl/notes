---
title: "伽罗瓦理论"
output: html_document
toc: false
mainfont: msyh
use_math: true
categories: [hide]
tags: [math,galois,伽罗瓦,群,域,多项式,方程,逼格]
---
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />

关于五次以上的方程没有求根公式，网上看得零零散散的，还是自己再整理一下吧。主要的参考是*结城浩*的《数学女孩5》。
首先，如果是提到伽罗瓦理论就说群论的，大概率应该是没有读过这一块的。这中间“域”的部分更加复杂。



### 逻辑链


### 理论、定义和证明
#### 定义：域
集合$K$:
* 对两种二元运算 $+, \times$ 封闭
* $(K, +)$ 是交换群，称单位元为 $0$
* $(K-{0}, \times)$ 是交换群
* **分配率：** $a,b,c \in K, ~ a\times (b+c) = a\times b+ a\times c$
称$K$为域。

#### 域扩张的次数

#### 定义：可约和既约
设 $K$ 为**系数域**，$f(x)$为域$K$的$x$的多项式。若$f(x)$能用域$K$因式分解，称在$K$的范围内**可约**，否则称为 **既约**。

#### 引理d1
设$f(x), p(x)$ 为系数域 $K$ 上的多项式，若$p(x)$在$K$上既约，且$p(x),f(x)$有一个共同的根，则$p(x) \vert  f(x)$。
证明：
若 $p(x)$ 是$1$次的，则自然成立。 若$p(x)$是高于一次的，由于它是既约的，则知道它的根都不在$K$内。假设$p(x) \nmid f(x)$。
注意$f(x), p(x)$ 通过辗转相除法，可以得到他们的“最大公因式”。
* 由于有共同的根，我们知道这个公因式是至少$1$次的
* 这个公因式是$p(x)$的真因式，其系数不全在$K$内
但是，又注意辗转相除法的结果仍在原系数域内，矛盾。
故只能有$p(x) \vert f(x)$。


#### 正规子群
定义

特性

### 附：3等分角

### 附：算术基本定理
#### 引理p1
如果 $p$ 是质数，$p \vert ab$。 则有： $p \vert a \lor p \vert b$。
证明：
若$p \nmid a$， 令$a = xp + a_1$，其中$a_1$是余数$0<a_1<p$。$ ab = xpb + a_1 b$，故有 $p \vert a_1 b$。
令$p = k_1a_1 + a_2, ~a_1>a_2>0$， 有 $p \vert pb \rightarrow p \vert k_1a_1b + a_2b $。从而$ p \vert a_2 b$。
令$p = k_2a_2 + a_3, ~a_2>a_3>0$， 有 $p \vert a_3b$。
$\cdots$
必有$p|b$

容易扩展为如果 $p$ 是质数，$p \vert \prod \limits_{i=1}^n a_i$。 则有： $\exists j, p \vert a_j$。

#### 算术基本定理
任意自然数$N$，有且只有一种质因数分解。
证明：
“有”的部分是显然的，下面只证明“只有”的部分。
如果有 $N = \prod \limits_{i=1}^n p_i = \prod \limits_{j=1}^m q_j$。同除以两种分解中共同的因子，有$ \prod \limits_{i=1}^{n_0} p_{a_i} = \prod \limits_{j=1}^{m_0} q_{b_j} $，且$\forall i,j : p_{a_i} \ne q_{b_j}$。
此时，$ p_{a_1} \vert \prod \limits_{j=1}^{m_0} q_{b_j}$，按[引理p1](#引理p1)有 $\exists j , p_{a_1} \vert q_{b_j}$，矛盾。故得证。
