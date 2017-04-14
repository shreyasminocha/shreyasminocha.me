+++
tags = ["programming"]
type = "post"
date = "2017-04-12T20:31:13+05:30"
title = "Recursion: what, why and how"
description = "This post introduces recursion and attempts to give the reader an intuition of why it works. Through examples and exercises, it aims to make the reader familiar with the structure of recursive programs"

+++

This post explains recursion, an easy, but tricky to grasp programming concept in a friendly, understandable manner.

> In order to understand recursion, you must first understand recursion.

That was a joke. Here's an informal definition from Wikipedia:

> Recursion is the process a procedure goes through when one of the steps of the procedure involves invoking the procedure itself.

What does this mean? Aah, now pay attention.

Sometimes, a function can be defined by referring to the function itself. Let us look at arithmetic sequences. For those who don't know, here's an example:

> 0, 5, 10, 15, 20, 25, …

Notice that the difference between any two terms is 5. This is defined as the common denominator.

Traditionally, arithmetic sequences can be denoted in two ways, through an explicit formula and through a recursive formula. We'll leave the explicit formula out, but if you're interested, you can always look it up, or watch [this excellent explanation by Sal Khan](https://www.khanacademy.org/math/algebra/sequences/constructing-arithmetic-sequences/a/writing-explicit-formulas-for-arithmetic-sequences). Let us get straight to the recursive formula(don't worry, we won't get too deep into the math).

Now, the idea of the recursive definition is, that the `n`-th term of the series can be given as the sum of the common denominator and the term before n. What about the first term? The first term is a known constant.

Let us now, get our hands dirty with code and write a recursive function(if you aren't familiar with functions, please look them up online and get familiar with accepting parameters and returning values before continuing) to find the `n`-th term of an arithmetic sequence, given the first term and the common denominator. Here's the pseudocode:

```javascript
function arithmeticSequence(n, firstTerm, d) {
  if(n == 1) {
    return firstTerm;
  } else {
  	return arithmeticSequence(n - 1, firstTerm, d) + d;
  }
}
```

This is on similar lines to how we recursively defined an arithmetic sequence. Let us go through this snippet line-by-line.

The first line is pretty obvious. Our function takes three integer parameters, `n`(remember, we want to find the `n`-th term?), `firstTerm`, as the name suggests is the first term of the sequence and `d`, the common denominator.

Lines 2—4 compare `n` to check if it is equal to one. If yes, we return the first term and control exits the function. This should be fairly obvious as well, if our function was called, with `1` as the value for `n`, we want to return the first term. This may seem to be a fairly simple construct, however, the if statement is more important than what initially meets the eye. If it hasn't struck you yet, don't worry, we'll get to that soon.

Line number 6. It is clear that control reaches this statement only if `n` **does not** equal `1`. If `n` is not `1`, we are returning `arithmeticSequence(n - 1, firstTerm, d) + d`. Let us break this down. Let's concentrate first on the first portion, `arithmeticSequence(n - 1, firstTerm, d)`. What does this mean? Naturally, the term at position `n - 1` is the term immediately before the term at position `n`. Moreover, since we are passing on the same `firstTerm` and `d`, it is clear that we are referring to the same sequence. This is essentially the term *before* the `n`-th in the same sequence. Let us now take a look at the rest of the portion of the return statement,  `+ d`. Hence, we are effectively adding the term before `n` to the common denominator `d`.

This is in parallel to the recursive definition of the arithmetic series. We have a base case, of the first term and then, for any natural number `n`(above 1), the `n`-th term of the sequence is defined as the sum of the term before `n` and the common denominator.

Very well, you may say, but how does this actually work? Indeed, it is extremely important to build a solid intuition for why this works. Having a look at how the computer actually executes this code might be of some help.

The part of the computer that executes your code has something known as a stack. This is somewhat similar to a stack of dishes, or a stack of notebooks. In the first example, the last dish that is put on to the stack is the first one that gets cleaned. Similarly, in the second example, if you are familiar with how notebooks are corrected, the last notebook that goes into the stack of notebooks(provided you don't cheat and bury it in the bottom) is the first one that gets corrected.

![Stack of books](http://images2.fanpop.com/images/photos/2900000/Stack-of-Books-books-to-read-2998208-550-408.jpg)

Your machine maintains a stack of function calls. Let us understand this with our original example. Let us say that the `main` function of our program makes the call  `arithmeticSequence(3, 0, 5)`. As you might have figured, this translates to "find the third term of the arithmetic sequence whose first term is `0` and the common denominator is `5`". Let us visualize the stack of function calls.

![Recursion call stack visualization](/img/recursion-call-stack.png)

The first section of the image visualizes the stack before the function call to `arithmeticSequence()` was made. There is only one function on the stack, that is, `main`.

The second section shows the call we described above. The action begins here. Our function makes the comparison to one. Since this comparison fails, we move on to the second return statement. Here we have another call to the function. This is depicted by the third stage in the call stack visualization. Here again, the comparison fails and we encounter another call to the `arithmeticSequence()` function. This third call to the function is put on top of the call stack. Here, since the `n` argument is `1`, the return value is the value we passed in as `firstTerm`, or `0`.  This function call is then "popped" from the call stack, or removed from the top. Hopefully you can see now why the `if` statement was important. Had it been omitted, the stack would continually grow and your program would never stop executing. Until your machine's stack is full, that is. Ever heard the term "stack overflow"? Here's where that comes from. At this point, the call stack begins to unwind and the final answer is obtained in a way similar to how you would manually find the third term. Now that you have the first term, you add the common denominator to it. Similarly, in stage 5, the return value from stage 4, zero, is added to the common denominator. This value is then returned. This continues in stage 6. Finally, the call stack is empty, barring the `main()` function. The return value from stage 6 is returned to the print statement that called it and the final answer is printed out as output.

Sure, our recursive solution to this problem is less efficient than the implementation that uses the explicit formula, but this one is more elegant and similar to how most people would manually solve it. In general, depending on the situation, you may need to make the trade-off between elegance and efficiency.

Hopefully, that has given you some intuition of how recursion works. But wait! We have covered the "what" and the "how" cited in the title. What about "why"? Following are some practical applications of recursion:

* Recursion can be used to come up with very elegant solutions to certain problems such as the solution of Tower of Hanoi problem.


* DFS(Depth-first-search) algorithm also makes use of recursion. It's applications include finding solutions to mazes, and many others in the field of graph theory.
* Traversing over all files in a directory and it's child directories is also a problem that demands a recursive algorithm.

## Exercises for the reader

You are not required, but encouraged to try the following exercises out to further your understanding of recursion.

1. Write a recursive function to find the `n`-th term of the fibonacci sequence(the traditional example).
2. Write a recursive function accept *one integer as a parameter* and return a binary string. You might want to look up operator overloading or default parameters, depending on your programming language of choice.
3. Accept an integer `n` and print out permutations of letters from a to the `n`-th alphabet. For example, `n=3` would give the output(order doesn't matter):

```
bca cba cab acb bac abc
```

The third exercise is from [here](http://introcs.cs.princeton.edu/java/23recursion/). If you wish to do some additional reading on this topic, [this](http://introcs.cs.princeton.edu/java/23recursion/) might be a great starting point.

## Conclusion

Hopefully you have gained a good understanding of what recursion is, how it works, and are confident to write recursive solutions to common questions such as the recursive fibonacci sequence. We also looked at some practical uses of recursion. Hope you enjoyed!

![Recursion meme](http://s2.quickmeme.com/img/a7/a764b1ed93f5fae80373f990de499c79ef0e2b0b3f950cb6b42ed9294de3b947.jpg)
