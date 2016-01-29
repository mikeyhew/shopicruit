// number of variants: 43
// total price of variants: 2003.8100000000004
// ^ lol binary floating point fail
// total weight of variants: 96093 
var maxWeight = 100000;

$.getJSON(
	'http://shopicruit.myshopify.com/products.json',
	function (data) {
		var products = data.products;
		var variants = [];
		for (var i = 0; i < products.length; i++) {
			variants = variants.concat(products[i].variants);
		}

		// This greedy algorithm works in this case because every item has value 1.
		// With greedy, when items have different values, you sometimes end up in a 
		// place where you could switch out an item with low weight for an item with
		// high weight and higher value, and get a higher overall value; however, when
		// all the items have the same value, this isn't possible.

		// The following code chooses all the variants with the lowest weight.

		variants.sort(function (a,b) {
			return a.grams - b.grams;
		});

		var totalWeight = 0;
		for (var i = 0; i < variants.length; i++) {
			totalWeight += variants[i].grams;
			if (totalWeight > maxWeight) {
				totalWeight -= variants[i].grams;
				break;
			}
		}
		variants.splice(i);

		var totalPrice = 0;
		for (i = 0; i < variants.length; i++) {
			totalPrice += Number(variants[i].price);
		}
		console.log('number of variants: ' + variants.length);
		console.log('total price of variants: ' + totalPrice);
		console.log('total weight of variants: ' + totalWeight);
	});