// Stores the behaviour of the sliders present on the html page

let satisfactionslider = document.getElementById("satisfactionRange");
let dimensionSlider = document.getElementById("dimensionRange"); 

satisfactionslider.oninput = function(){ 
    document.getElementById("sliderPercentage").innerHTML = satisfactionslider.value + "%";
    reset(parseInt(dimensionSlider.value), parseInt(dimensionSlider.value), parseInt(satisfactionslider.value)/100); 
}

dimensionSlider.oninput = function(){ 

    document.getElementById("dimensionsValue").innerHTML = dimensionSlider.value + "x" + dimensionSlider.value;
    reset(parseInt(dimensionSlider.value), parseInt(dimensionSlider.value), parseInt(satisfactionslider.value)/100); 
}