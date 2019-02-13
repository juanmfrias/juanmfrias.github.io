var vehicleOptions = [
	{choice: 'cadenza', price: 35000}, 
	{choice: 'forte', price: 20000}, 
	{choice: 'optima', price: 29050}, 
	{choice: 'sedona', price: 38650}, 
	{choice: 'soul', price: 42200}
];

var colorOptions = [
	{choice: 'black', price: 50}, 
	{choice: 'white', price: 100}, 
	{choice: 'silver', price: 250}
	];

var packageOptions = [
	{choice: 'Rear Camera', price: 150}, 
	{choice: 'LED Positioning Light', price: 150}, 
	{choice: 'Rear Camera and LED Positioning Light', price: 200}
	];

var carSelection = {
    vehicle: 	{choice: 'Not Selected', price: 0},
    color: 		{choice: 'Not Selected', price: 0},
    package: 	{choice: 'Not Selected', price: 0}
};

$('li').on('click', function() {
    $('li').removeClass('active');
    $(this).addClass('active');
    $('#options-display').empty();
    var selectedStep = $(this).data('tab');
    displayPanel(selectedStep);
});


function displayPanel(step) {
    var source = $('#' + step + '-options-template').html();
    var template = Handlebars.compile(source);
    
    switch (step) {
    case 'vehicle':
        renderTemplate(vehicleOptions, template, step);
        break;
    case 'color':
        renderTemplate(colorOptions, template, step);
        break;
    case 'package':
        renderTemplate(packageOptions, template, step);
        break;
    case 'summary':
        renderTemplate(carSelection, template, step);
        break
    }
}

function renderTemplate(selection, template, step) {
    if (step != 'summary') {
        for (var i = 0; i < selection.length; i++) {
            var html = template(selection[i]);
            $('#options-display').append(html)
        }
    } else {
        var html = template(selection);
        $('#options-display').append(html)
    }
}

$('.options-container').on('click', 'div[class*="option"]', function() {
    var currentSelection = $(this).data('panel');
    carSelection[currentSelection]['choice'] = $(this).data('option');
    carSelection[currentSelection]['price'] = $(this).data('price');
    if (carSelection['color']['choice'] !== 'Not Selected' && carSelection['vehicle']['choice'] !== 'Not Selected') {
        $('.vehicle-display').attr('src', 'assets/' + carSelection['vehicle']['choice'] + '-' + carSelection['color']['choice'] + '.jpg')
    } else {
        if (carSelection['vehicle']['choice'] !== 'Not Selected') {
            $('.vehicle-display').attr('src', 'assets/' + carSelection['vehicle']['choice'] + '.jpg')
        }
    };
    //updateVehicleCost();
    var vehicleCost = carSelection['color']['price'] + carSelection['vehicle']['price'] + carSelection['package']['price'];
    $('.cost-display').text('$' + vehicleCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
});

displayPanel('vehicle');