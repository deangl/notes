---
title: "理解Gamma矩阵"
output: html_document
toc: false
mainfont: msyh
use_math: true
categories: [金融]
tags: [数学|math|finance|衍生品|gamma|vol]
---
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />

*无特别说明，本文用老爱求和约定*

标计：
* $r^i$：第i个资产的收益率
* $V$：估值
* $\Gamma_{ij} = \frac{\partial^2 V}{\partial r^i \partial r^j}$
* $R$：盈亏

## 单因子的情况 ##
先看简单的，单因子模型下的结果(事实上，双标的的情况总可以用单因子模型)：
* $r^i = \beta^i m + \alpha^i$ 其中 $m$ 是系统收益率，而$\alpha$是个体特别的收益率，有：
$$
\begin{eqnarray*}
2R &=& r^ir^j \Gamma_{ij} \\
&=& \beta^i \beta^j \Gamma_{ij} m^2 \tag{1}\\
&+& \alpha^i \alpha^j \Gamma_{ij} \tag{2}\\
&+& 2m\beta^i \alpha^j \Gamma_{ij} \tag{3}
\end{eqnarray*}
$$

* 先看系统性风险很小，或者双标的独立性很强的情况:
  * 有$\beta = 0$, **(1)** 为0
  * **(2)** 中，在$i=j$时，$\alpha^i\alpha^j$必不为零，对角元必有贡献，这是盈亏的主要来源：逐标的的$\Gamma_{ij}$盈亏之和。而$i\neq j$的项的贡献不那么清晰，不过可注意两点：
	1. 如果 Cross Gamma为很小，交叉项贡献为0
	2. 用“平均”的眼光来看，$\overline{\alpha^i\alpha^j} = 0$
  * 同样由于$\beta=0$, **(3)** 为0

* 如果系统性风险很大，或者双标的相关性很强的情况:
  * 令$\Gamma = \beta^i\beta^j\Gamma_{ij}$，**(1)** 变为 $\Gamma m^2$。即得到了一个以市场为标的的$\Gamma$盈亏。特别的，注意，当全部$\beta=1$时，$\Gamma$是$\Gamma_{ij}$的各元素之和
  * 而由于$\alpha$都很小，**(2)，(3)** 都可以忽略。

总结一下，有：
1. **还是需要看整个Gamma的矩阵的；** 要时刻注意想到；
2. 对于弱相关的标的，主要应关注对角元的贡献；
3. 如果强相关，其系统性return的贡献显著，可以得到一个等效的单独$\Gamma$。(当所有$\beta$ 都靠近1的时候，将各分量求和的结果是$\Gamma$的一个好估计)

## 多因子的情况 ##

* 不过是变成 $r^i = \beta^i_k m^k + \alpha^i$，有：

$$
\begin{eqnarray*}
2R &=& r^ir^j \Gamma_{ij} \\
&=& \beta^i_k m^k \beta^j_l m^l \Gamma_{ij} \tag{i}\\
&+& \alpha^i \alpha^j \Gamma_{ij} \tag{ii}\\
&+& 2m\beta^i_k m^k \alpha^j \Gamma_{ij} \tag{iii}
\end{eqnarray*}
$$

延续前面的分析，可知在系统性风险很小(这里指对各因子的$\beta$都小)的情况上，单因子的结论还成立。下面分析$\beta$为主导，$\alpha$可忽略的情况：

* 来看 **(i)** 项， 注意到，现在已经没有单独的 $m^2$了。令$\Xi_{kl} = \beta_k^i\beta_l^j\Gamma_{ij}$，式子化为$\Xi_{kl}m^k m^l$。可以再次分拆得到对各因子的$\Gamma$的盈亏。特别的，如果在选择因子的时候，已经完成了正交化，$m^k$的“平均”贡献也是0。


## 实用 ##
根据上面的逻辑，在还可以粗糙的时候，我们可以用两个指标为限额：
1. 各标的Gamma(对角元)和Gamma之和，这用于应对一般的多标的期权
2. 如果是比较有逻辑的套利策略，主要以$\sum \Gamma_{ij}$为限额，辅以看上面1.的指标，不要太大
