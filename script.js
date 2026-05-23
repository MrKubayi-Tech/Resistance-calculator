const resistor_calc = document.getElementById("resistor_calc");
const first_value = document.getElementById("first_value");
const second_value = document.getElementById("second_value");
const third_value = document.getElementById("third_value");

let colNum = "";
let num_value = 0;
let prev_val = "";
let num = 0;
let num2 = 0;

function appendfunction(input){
    colNum = input.slice(-4);

    if(num_value !== 4){
        if(colNum === 'col1' && (num_value === 0 || num_value === 1)){
            resistor_calc.value = input.slice(0,-4);
            num_value = 1;
        }

        if(colNum === 'col2' && num_value === 1){
            resistor_calc.value = resistor_calc.value + input.slice(0,-4);
            num_value++;
        }else if(colNum === 'col2' && num_value === 2){
            resistor_calc.value = resistor_calc.value.slice(0,-1) + input.slice(0,-4);
            num_value = 2;
        }

        if(colNum === 'col3' && num_value === 2){
            num = eval(resistor_calc.value + "*(10**" + input.slice(0,-4) + ")");
            resistor_calc.value = resistor_calc.value + "x(10^" + input.slice(0,-4) + ")";
            num_value++;
        }else if(colNum === 'col3' && num_value === 3){
            var str = resistor_calc.value.slice(0,-2).replaceAll("x","*");
            str = str.replaceAll("^","**");
            num = eval(str + input.slice(0,-4) + ")");
            resistor_calc.value = resistor_calc.value.slice(0,-2) + input.slice(0,-4) + ")";
            num_value = 3;
        }

        if(colNum === 'col4' && num_value === 3){
            prev_val = input.slice(0,-4);
            num2 = num * Number(input.slice(0,-4))
            resistor_calc.value = resistor_calc.value + "(" + input.slice(0,-4) +")";
            num_value++;
        }
    }else{
        console.log(prev_val);
        prev_val = input.slice(0,-4);
        num2 = num * Number(input.slice(0,-4));
        resistor_calc.value = resistor_calc.value.slice(0,-(prev_val.length +2)) + "(" + input.slice(0,-4) + ")";
        num_value = 4;
    }
    
}

function calculate(){
    if(num_value === 4){
        console.log(num);
        if(num < 999){
            first_value.textContent = `: ${num.toFixed(2)} OHM`;
            second_value.textContent = `: ${(num + num2).toFixed(2)} OHM`;
            third_value.textContent = `: ${(num - num2).toFixed(2)} OHM`;

        }else if(num >= 1000 && num < 1000000){
            first_value.textContent = `: ${(num/1000).toFixed(2)}K OHM`;
            second_value.textContent = `: ${((num + num2)/1000).toFixed(2)}K OHM`;
            third_value.textContent = `: ${((num - num2)/1000).toFixed(2)}K OHM`;
        }else{
            first_value.textContent = `: ${(num/1000000).toFixed(2)}M OHM`;
            second_value.textContent = `: ${((num + num2)/1000000).toFixed(2)}M OHM`;
            third_value.textContent = `: ${((num - num2)/1000000).toFixed(2)}M OHM`;
        }
        

        resistor_calc.value = "";
        num_value = 0;
        num = 0;
        num2 = 0;
    }
}