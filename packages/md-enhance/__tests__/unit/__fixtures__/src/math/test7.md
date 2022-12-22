# Multi-line Formula

- **newline**

  Use `\\` or `\newline` to wrap

  $$
  x = a+b+c+{} \\
  d+e+f+g
  $$

  $$
  x = a+b+c+ \newline
  d+e+f+g
  $$

  ```md
  $$
  x = a+b+c+ \\
  d+e+f+g
  $$

  $$
  x = a+b+c+ \newline
  d+e+f+g
  $$
  ```

- **Alignment**

  You can use the `aligned` environment to achieve alignment, and`&`to identify fixed anchor points

  $$
  \begin{aligned}
  x ={}& a+b+c+{} \\
  &d+e+f+g
  \end{aligned}
  $$

  $$
  \begin{alignedat}{2}
     10&x+ &3&y = 2 \\
     3&x+&13&y = 4
  \end{alignedat}
  $$

  ```md
  $$
  \begin{aligned}
  x ={}& a+b+c+{} \\
  &d+e+f+g
  \end{aligned}
  $$

  $$
  \begin{alignedat}{2}
     10&x+ &3&y = 2 \\
     3&x+&13&y = 4
  \end{alignedat}
  $$
  ```
