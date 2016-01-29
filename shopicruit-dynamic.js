var maxWeight = 100000;


$.getJSON(
	'http://shopicruit.myshopify.com/products.json',
	function (data) {
		var products = data.products;
		var variants = [];
		for (var i = 0; i < products.length; i++) {
			variants = variants.concat(products[i].variants);
		}


		var n = variants.length;
		var weights = variants.map(function(variant) {
			return variant.grams
		});

		// m is a 2-dimensional array for dynamic programming. I'd explain it better,
		// but I always had trouble understanding DP myself. I'm just getting this algorithm
		// from Wikipedia: en.wikipedia.org/wiki/Knapsack_problem#0.2F1_knapsack_problem
		// The first dimension is the one from 0..n, and the second is from 0..maxWeight
		var m = [];
		for (var i = 0; i <= n; i++) {
			m[i] = [];
		}
		for (var w = 0; w <= maxWeight; w++) {
			m[0][w] = 0;
		}

		for (var i = 1; i <= n; i++) {
			for (var w = 0; w <= maxWeight; w++) {
				if (weights[i-1] <= w) {
					m[i][w] = Math.max(m[i-1][w], m[i-1][w-weights[i-1]] + 1);
				} else {
					m[i][w] = m[i-1][w];
				}
			}
		}

		var numVariants = m[n][maxWeight];

		console.log('maximum number of variants that are within 100kg ' + numVariants);
		// console.log('total price of variants: ' + totalPrice);
		// console.log('total weight of variants: ' + totalWeight);
	});