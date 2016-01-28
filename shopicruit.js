var maxWeight = 100000;


$.getJSON(
	'http://shopicruit.myshopify.com/products.json',
	function (data) {
		var products = data.products;
		var variants = [];
		for (var i = 0; i < products.length; i++) {
			variants = variants.concat(products[i].variants);
		}

		sortedVariants = variants.sort(
			function (a,b) {
				a.grams - b.grams;
			}
		);

		// This is a simple greedy approximation of the 0-1 knapsack problem
		// as long as the variant's weights aren't distributed weirdly,
		// this will be a pretty good approximation.
		// For the very best
		totalWeight = 0;
		var i;
		for (i = 0; i < sortedVariants.length; i++) {
			totalWeight += sortedVariants[i].grams;
			if (totalWeight > maxWeight) {
				totalWeight -= sortedVariants[i].grams;
				break;
			}
		}
		numVariantsToBuy = i;

		var totalPrice = 0;
		for (i = 0; i < numVariantsToBuy; i++) {
			totalPrice += Number(sortedVariants[i].price);
		}
		console.log('total price of variants: ' + totalPrice);
		console.log('total weight of variants: ' + totalWeight);
	});