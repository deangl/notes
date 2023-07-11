---
title: "Lambda Calculus 和类型变换"
output: html_document
toc: false
mainfont: msyh
use_math: true
toc: false
categories: [计算机]
---
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />

## Lambda Calculus和其类型的变换

要想比较清楚的思考函数式的编程，学会Lambda Calculus的思路是比较有效的。

下面的实验中，用JavaScript。

### 标记和应用

函数式编程的一个难想的地方就是参数和结果的类型，需要一个好的标记工具。我们用 **A**，**B** 等来代表类型，而用 **(A -> B)** 来代表由 **A** 到 **B** 的函数。

在阅读的时候，**A->B->C->D**，代表先接受一个**A**类型的参数，生成一个函数，这个函数接受一个**B**类型的参数，生成一个接受**C**类型参数的函数，并生成一个**D**类型的结果。**(A->B->C->D)**的应用时，参数的排列顺序是：**(A->B->C->D)(a)(b)(c) = d**。
上面的函数，在定义时，顺序是 *$\lambda A. (\lambda B. (\lambda C.  ...D ))$*.

下面来看一些典型的函数的情况。

### Identity

``` javascript
const id = x=>x;
```

**(A->A)**，这里的**A**可以是任意类型。

### 函数的组合

``` javascript
const comp = f=>(g => (x=> f(g(x))));
```

其类型变换为 f:**(B->C)**，g: **(A->B)**，comp:**(B->C)->(A->B)->(A->C)**。这个过程读做：按顺序作用于 **(B->C)**，**(A->B)**，得到一个 **(A->C)** 的函数。一个例子如下：

``` javascript
const twice_ = f => comp(f)(f);
const plus1 = x => x+1;
console.log(twice(plus1)(0));//可以返回2
```

### 应用

``` javascript
const app = f => (x=> f(x))
```

如果f是一个 **(A->B)** 的函数，那么app为 **((A->B)->A->B)**

### 自应用

接下来开始要进入深水区了。

```javascript
const sa = f=>(x => f(f)(x));
```

如果f的类型为**A**，我们又知道f应该为一个函数，为 **(A->sth.)** 类型。这在数学上是比较奇怪的。
不过，这不影响应用。

``` javascript
const x4_ = f => x=> sa(twice_)(f)(x);//就是一个运行4次的函数
// x4_(plus1)(0) = 4
```

看看是不是真的理解了这个过程：

``` javascript
const x256_ = f=>x=>sa(x4_)(f)(x)
// x256_(plus1)(0) = 256
```

这个是把“运行4次”，这个过程重复了4次。也就是256次。

### Omega

``` javascript
const omg = f=>sa(sa)(f);
```

这个函数直接生成一个无限的循环，不过其实是无法运行的。

### Y combinator

先看代码

``` javascript
const Y = (t) => sa(f => t(sa(f)));
//或者展开为
const Y_ = (t) => (f=> t(x=>f(f)(x)))(f=> t(x=>f(f)(x)));
//又或者
const Y__ = (t) => (f=> (x=>f(f)(x)))(f=> t(x=>f(f)(x)));
//还或者
const Y___ = (t) => (f=> f(f))(f=> t(x=>f(f)(x)));
```

用$\beta$ -代换得到有**Y(t) = t(Y(t))**，通过这个方式可以实现递归。一个常见的例子如下：

``` javascript
const fac_ = f=>(x=> x>1?f(x-1)*x:1);
const fac = Y(fac_);
//或者展开为
const fac = Y(f=>(x=> x>1?f(x-1)*x:1))
```

我们从两个方向来试着完成过程的思路。

#### 从特例到全面

还是来实现`fac`。

``` javascript
const f = (n) => n>1 ? f(n-1)*n : 1;
console.log(f(5));
```

可是如果不许引用`f`呢，一个直接的思路是把`f`也包到一个参数里，试写

``` javascript
function _fac(f){
    return (n)=> n>1?f(n-1)*n:1;
}
```

这显然是不完全的，我们需要把`_fac`作用到一个函数上，才能得到一目标的`fac`。可是作用到谁上呢？而似乎我们的条件都已经用上了，并不需要再有什么新的逻辑。那就作用到自己身上呢？

``` javascript
function _fac(f){
    return (n)=> n>1?f(n-1)*n:1;
}
console.log(_fac(_fac)(5));
```

然而这个返回`NaN`。顺一下代码，发现问题是显然的，`_fac(_fac)`的结果是一个需要接受一个函数为参数的函数，那个函数才以数字为参数，我们需要`_fac(f)`的形式才能把数字传到目标位置。修改一下代码，把`f`改成`f(f)`：

``` javascript
function _fac(f){
    return (n)=> n>1?f(f)(n-1)*n:1;
}
console.log(_fac(_fac)(5));
```

这个结果就好了。可是又用到了命名函数`_fac`，还好这是不必要的，手动展开一下：

``` javascript
const fac = ((f) =>(n)=>n>1?f(f)(n-1)*n:1) //第一步
            ((g)=>(m)=>m>1?g(g)(m-1)*m:1);
```

事实上，可以发现第一步中的函数不会重复展开，它只是一个“启动器”，有用的是`f(f)`这一点，简化：

``` javascript
const fac = ((f) =>(n)=>f(f)(n)) //第一步
            ((g)=>(m)=>m>1?g(g)(m-1)*m:1);
```

进一步，把第一步的第二参数省掉：

``` javascript
const fac3 = ((f) =>f(f)) //第一步
            ((g)=>(m)=>m>1?g(g)(m-1)*m:1);
```

最后，希望得到一个`Y`，使得能写成：

``` javascript
const facY = Y((f)=>(n)=>n>1?f(n-1)*n:1)
```

的形式。可以从`fac3`中剥离：

``` javascript
const Y = t=>
          (f=>f(f))
          (g=>t(m=>g(g)(m)));
```

#### 从全面

从基础来看，我们缺了啥呢？缺的是一个“变化”的“没有预定的结束点”的循环机制。从上一章，可以看到$\Omega$是一个这样的循环机制。

``` javascript
 const omg = (f=>f(f))(g=>m=>g(g)(m));
 // = (g=>m=>g(g)(m))((g=>m=>g(g)(m)))
 // = (g=>g(g))((g=>m=>g(g)(m)))
 // ....
```

但是它是没有终结的，没法用来完成工作。需要想办法“插入”功能性代码。看上面的展开过程，在展开到最后(如果有)之前，用于“函数”位置的占位符，并不同用于“数”的位置的占位符有什么区别。所以，并不需要通过这些“函数”来完成“功能”，而可以通过插入的中间过程来完成。
细读上面，`g => ...g(g)`是必须的，需要干的是 `(g,m)=>T(gg,m)`,功能由`T`来完成。所以：

```javascript
const Y = T=>(g=>g(g))((g=>m=>T(g(g))(m)));
```
