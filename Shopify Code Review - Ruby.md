Code review for [pastebin.com/Ua5VURkr](http://pastebin.com/Ua5VURkr)

Line 3: credentials and secret keys should not be put in source code, but rather passed as shell environment variables, or all together in a separate config file that is not checked into version control.

Lines 2 and 5-7: should replace with `attr_accessor :shop_id` on line 2, which will declare both methods `shop_id` and `shop_id=`, which will get and set the instance variable `@shop_id` for you.

Lines 9-28: 
- There is a lot of repetition over these three methods. Should pull most of this into a separate private method, that takes the part of the url after #{shop_id} as an argument and returns the parsed JSON.
- You might want to do some error handling in the forementioned private method, as these HTTP request can fail.