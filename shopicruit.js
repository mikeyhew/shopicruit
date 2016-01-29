var maxWeight = 100000;
var log = console.log.bind(console);

$.getJSON(
	'http://shopicruit.myshopify.com/products.json',
	function (data) {
		var products = data.products;
		var variants = [];
		for (var i = 0; i < products.length; i++) {
			variants = variants.concat(products[i].variants);
		}


		// let's just brute force our way through this.
		// calculate weights of all subsets, and keep track
		// of the subset with the max value.
		// number of subsets: |2^[n]| = 2^n

		// since there are 110 variants, there are 2^110 different
		// subsets. To uniquely identify each subset,
		// this solution creates an array of
		// 110 integers that are either 0 or 1. If array elements
		// take up 1 word each, then 440 bytes of memory are accessed
		// on each loop iteration. This would probably fit into cache,
		// but you still have to load and store 110 words

		var n = variants.length;
		var weights = variants.map(function(variant) {
			return variant.grams
		});

		var subsetID = [];
		for (i = 0; i < n; i++) {
			subsetID[i] = 0;
		}


		function sum(arr) {
			var ret = 0;
			for (var i = 0; i < arr.length; i++) {
				ret += arr[i];
			}
			return ret;
		}
		
		function inc(subsetID) {
			var carry = 1;
			for (var i = 0; i < subsetID.length; i++) {
				carry = subsetID[i] + carry;
				subsetID[i] = carry % 2;
				carry = Math.floor(carry / 2);
			}
			return carry;
		}

		var maxValue = -Infinity;
		var overflow = 0;
		var totalWeight;
		var subsetIDofMax;
		var totalWeightOfMax;
		log('entering brute force area');
		while (!overflow) {
			
			totalWeight = 0;
			for (var i = 0; i < n; i++) {
				if (subsetID[i]) {
					totalWeight += i;
				}
			}

			if (totalWeight <= maxWeight &&
				sum(subsetID) > maxValue) {
				log('updating max');
				maxValue = sum(subsetID);
				totalWeightOfMax = totalWeight;
				// have to explicitly copy array
				subsetIDofMax = subsetID.slice();
			}

			overflow = inc(subsetID);
		}
		log('exited brute force area');

		var totalPrice = 0;
		for (i = 0; i < n; i++) {
			if (subsetIDofMax[i]) {
				totalPrice += Number(sortedVariants[i].price);
			}
		}

		
		console.log('total price of variants: ' + totalPrice);
		console.log('total weight of variants: ' + sum(subsetIDofMax));
	});