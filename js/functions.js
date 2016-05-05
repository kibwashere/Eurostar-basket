//Init prices
var priceOfProducts = {bread: 1.00, butter: 0.80, milk: 1.15};

//Refresh the basket when there is a new product
function refreshBasket(listOfProductsInTheBasket){
	var items = "";
	var total = 0;

	//Iterate over each products in the basket
	//A list of every items is created and the total is updated 
	for (var product in listOfProductsInTheBasket) {
		items += '<li>' + listOfProductsInTheBasket[product] + ' x '+ product + ' = ' + (priceOfProducts[product]*listOfProductsInTheBasket[product]).toFixed(2) + '£</li>';
		total += priceOfProducts[product] * listOfProductsInTheBasket[product];
	}

	//Check if there is one or several offers
	var totalWithOffers = total - checkOffers(listOfProductsInTheBasket, total);

	//Update the basket
	$( "#basket div" ).empty();
	var box = 	'<ul>' +
				items +
				'</ul>' +
				'<p class="total"> Total = ' +
				total.toFixed(2) +
				'£</p>' +
				'<p class="total"> Total with offers = ' +
				totalWithOffers.toFixed(2)  +
				'£</p>';
	$( "#basket div" ).append( box );
}

//Check if some offers are available
function checkOffers(listOfProductsInTheBasket, total){
	var offer1 = 0;
	var offer2 = 0;

	//2 Butter = 1 Bread at 50% off
	if ( (listOfProductsInTheBasket["butter"] > 1) && (listOfProductsInTheBasket["bread"]) ){
		if (listOfProductsInTheBasket["bread"]*2 < listOfProductsInTheBasket["butter"]) {
			numberOfReduceBread = listOfProductsInTheBasket["bread"];
		}
		else {
			numberOfReduceBread = Math.trunc(listOfProductsInTheBasket["butter"]/2);
		}
		offer1 = numberOfReduceBread*priceOfProducts["bread"]/2;
	}

	//3 Milk = 4th Milk for free
	if (listOfProductsInTheBasket["milk"] > 3) {
		var numberOfFreeMilk = Math.trunc(listOfProductsInTheBasket["milk"]/4);
		offer2 = numberOfFreeMilk*priceOfProducts["milk"];
	}

	var offers = offer1 + offer2;
	return offers;
}