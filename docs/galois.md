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

先列一下符号和约定
> 大写 $K$：域
> $K(\alpha)$：$K$ 加 $\alpha$ 的扩域
> $K[x]$： 系数在域$K$上的以$x$为未知数的多项式集
> $f(x)$: 以$x$为未知数的多项式

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

**引理d1** 有一个强力的解读。从一个系数域外的根通过乘以一列**一次**多项式的方式回到原系数域的多项式，只有一种方法。另外也要注意，在多项式中，起到**质数**的地位的东西是**一阶**多项式$(x-\alpha)$，其中$\alpha$是根。


#### 单代数扩域定理
$F$是一个数域，$f(x) \in F[x]$，根为$\alpha_1,\cdots,\alpha_n$。那么可以找到数$V = \sum \limits_{i=1}^n k_i \alpha_i$，其中$k_i$为整数，使得：$F(V) = F(\alpha_1,\cdots,\alpha_n)$。

先考虑一下这个命题的问题。显然，并不是所有的$F(a+b) = F(a,b)$，例如$F = \mathbb{Q}, a = \pi, b = 2-\pi$。于是知道这个结论和原方程是有关的。最直接的想法是用某种方式把$V$代入到$f$中来得到一个关系，通过这个关系说明某个根在$F(v)$中。这个比较复杂，所以可能从数学归纳法入手。
* 证明$V_1 =k_1\alpha_1+k_2\alpha_2, F(V_1) = F(\alpha_1,\alpha_2)$。
* 另外，为了可以往下串，需要得一另一个多项式$h(x) \in F(x)$，使得$V,\alpha$是$h$的根。这时，如果有$g(x) \in F(x), g(V) = 0$，那么令$h = f\cdot g$ 就可以了。

证明：
先证上面第一条。若$\alpha_1 = \alpha_2$，自然是成立的，如果$\alpha_1 \ne \alpha_2$。于是可以找到$k$，满足：
$$
\forall 1 \le i,j \le n,~ \alpha_1 \ne \alpha_2 \rightarrow \alpha_1+k\alpha_2-k\alpha_i \ne \alpha_j
$$
这个说的是，对于$\sigma: \sigma(y) = \alpha_1+k\alpha_2-ky$除了把$\alpha_2$映射到$\alpha_1$外不会把其他根映射到根。令$V = \alpha_1+k\alpha_2$, $l(x) = f(V-kx)$，$l(x)$的系数域被扩到$F(V)$。$l(x)$ 和 $f(x)$ 的公共根有且只有 $\alpha_2$，而且它们的系数都在域$F(v)$内。应用和证明 **引理d1** 一样的方式，可以得到，在$F(v)$内，$f(x),l(x)$的最大公约式只能是$(x-\alpha_2)^n$的形式，$n\alpha_2 \in F(V) \rightarrow \alpha_2 \in F(V) \rightarrow \alpha_1 \in F(V)$。所以$F(V) = F(\alpha_1,\alpha_2)$。

再来找上面需要的$g(x)$。他的一个根是$\alpha_1 + k\alpha_2$，要凑出一些其它的根来，让系数域回到$F$。考虑根和系数的关系，找到一个“最对称”的根集：$V_{ij} = \alpha_i + k \alpha_j$。$g(x) = \prod \limits_{i,j} (x-V_{ij})$的系数域会回到$F$，同时由于$V = V_{12}$，$g(V) = 0$。于是得证。

根据这个定理，我们可以得到《数学女孩5》上的两个引理：
1. 如果$f(x)\in F[x]$的根是$\alpha_1,\cdots,\alpha_n$，无重。可以找到一个$\phi(x_1,\cdots, x_n) = \sum \limits_{i=1}^n k_ix_i, k\in \mathbb{Z}$使得对于根的不同排列$\alpha_{p_i}$和$\alpha_{q_i}$，$\phi(\alpha_{p_i}) \ne \phi(\alpha_{q_i})$。
2. 任意$\alpha_i$都可以表示为$\alpha_i = \phi_i(V)$。

#### 引理共轭
对上一段两个引理的 $V$ 和 $\phi_i$，设 $f_V(x) \in F[x]$ 满足 $f_V(V) = 0$的最小多项式，其根为$V_1,\cdots,V_n$，有$\phi_i(V_k)$是$\alpha_i$的一个排列。即：
1. $\forall i$ 都有 $f(\phi_i(V_k)) = 0$。
2. $\forall i\ne j$ 都有 $\phi_i(V_k) \ne \phi_j(V_k)$。

证明：
1. 对于$V$，它是$f_V$的一个根；又$f(\phi_i(V)) = f(\alpha_i) = 0 \rightarrow V $ 是 $f\cdot \phi_i $的根。考虑到$f_V$最小，由[引理p1](#引理p1)，$f_v \vert f\cdot \phi_i$，也就是说$V_k$都是$f\cdot \phi_i$的根。故$f(\phi_i(V_k)) = 0$。
2. 若有$\phi_i(V_k) = \phi_j(V_k)$，有$f_v \vert (\phi_i - \phi_j)$，则$(\phi_i-\phi_j)(V) = 0 \rightarrow ~\phi_i(V) = \phi_j(v) \rightarrow \alpha_i = \alpha_j$，同$f$无重根矛盾。

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
