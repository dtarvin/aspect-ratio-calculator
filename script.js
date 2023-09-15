$(function () {
    let imageMode = "landscape";
    console.log('The image mode is ' + imageMode);
    $("#image-mode-select").on('change', function () {
        imageMode = $('input[name="image-mode"]:checked').val();
        console.log('The image mode is ' + imageMode);    
    });
});

function calculateCurrentAspectRatio() {
    let currentWidth = $('input[id="current-width"]').val();
    console.log('The current width is ' + currentWidth);
    let currentHeight = $('input[id="current-height"]').val();
    console.log('The current height is ' + currentHeight);
    greatestDenom = findGreatestCommonDenom(currentWidth, currentHeight);
    console.log('The dividing factor is ', greatestDenom);
    let arNum1 = currentWidth / greatestDenom;
    let arNum2 = currentHeight / greatestDenom;
    $("#ar-values").remove();
    $("#current-aspect-ratio").append('<span id="ar-values">' + arNum1 + ':' + arNum2 + '</span>');
}

function findGreatestCommonDenom(width, height) {
    let x, y;
    if (height > width) {
        x = height;
        y = width;
    } else {
        x = width;
        y = height;
    }
    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }
    console.log('x = ', x);
    return x;
}

function calculateConversion() {
    let currentWidth = $('input[id="current-width"]').val();
    console.log('The current width is ' + currentWidth);
    let currentHeight = $('input[id="current-height"]').val();
    console.log('The current height is ' + currentHeight);
    let desiredArWidth = $('input[id="desired-ar-width"]').val();
    console.log('The desired AR width is ' + desiredArWidth);
    let desiredArHeight = $('input[id="desired-ar-height"]').val();
    console.log('The desired ar height is ' + desiredArHeight);
    let factor = calculateFactor(currentWidth, currentHeight, desiredArWidth, desiredArHeight);
    let newWidth = desiredArWidth * factor;
    let newHeight = desiredArHeight * factor;
    $("#new-aspect-ratio-value").remove();
    $("#new-aspect-ratio").append('<span id="new-aspect-ratio-value">' + desiredArWidth + ':' + desiredArHeight + '</span>');
    $(".new-image-values").remove();
    $("#new-image-width").append('<span class="new-image-values">' + newWidth + '</span>');
    $("#new-image-height").append('<span class="new-image-values">' + newHeight + '</span>');
}

function calculateFactor(currentWidth, currentHeight, desiredArWidth, desiredArHeight) {
    let factor1 = Math.trunc(currentWidth / desiredArWidth);
    let factor2 = Math.trunc(currentHeight / desiredArHeight);
    return factor1 > factor2 ? factor2 : factor1;
}
