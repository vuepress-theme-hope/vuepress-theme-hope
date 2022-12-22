# Matrix

`pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` and other environments can add various separators on both sides of the matrix.

$$
\begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix}
$$

```md
$$
\begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix}
$$
```

Using the `smallmatrix` environment, you can generate small matrices of inline formulas.

A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.

```md
A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.
```
