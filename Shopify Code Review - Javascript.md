Code Review for [pastebin.com/vgyMQfek](http://pastebin.com/vgyMQfek)

Lines 3-14: This if/elseif/else structure could be converted to a switch/case construct, but I wouldn't recommend that because they are tricky and a common source of bugs in JS. It would be a good idea to pull the logic that deals with different payment types into another function. In any event, you shouldn't be typing the string "Payment info: " more than once. Even if this code works now, it will get really complicated as new payment options are added.

Line 3: what is going on here? I don't understand why you would change the `==` to `=` here, and anyway even if it was correct it would make the code more difficult to reason about.

Line 3: Also, it depends on project or company conventions, but comments at the end of the line like should usually be moved to the line above or below, for better readability.

Line 4: p is assigning a global variable - make sure to use `var p`.
Line 11: looks like this would be a syntax error anyway, but `else if` is probably mean to be `else`.

Lines 16 and 19: it's usually better to keep html out of your javascript files, especially when you don't have coffeescript's """three quotes""" sytax, which really helps readability.

Line 20: In almost all cases, document.write is the wrong choice. If the page has already loaded, the whole page's content is erased! Better to create an Element use appendChild.

Other notes: What does the variable `p` mean? I understand that a short variable name was chosen because it is used a lot; however there should at least be a comment saying what it represents. But if my other suggestions are implemented, then this variable would probably be used a lot less, and a short name would be unnecessary.