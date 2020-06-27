/* 
Moskotcho Password Generator 
Developed by: Walid Amriou
www.walidamriou.com
----------------------------------------------------
Moskotcho Password Generator is licensed under the :
GNU Affero General Public License v3.0
https://www.gnu.org/licenses/agpl-3.0.en.html

----------------------------------------------------
Github:
https://github.com/walidamriou/Moskotcho_Password_Generator
----------------------------------------------------
Last update: May 2020

*/

console.log("Pre-alpha version 0.1 of Moskotcho Password Generator");

// Generate a random integer n with equal chance in  min <= n < max.
function RandomVar_core(min, max) {
    let range = max - min;
    if (range <= 0) {
        throw new Exception('max must be larger than min');
    }
    let requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes) { // No randomness required
        return min;
    }
    let maxNum = Math.pow(256, requestBytes);
    let ar = new Uint8Array(requestBytes);

    while (true) {
        window.crypto.getRandomValues(ar);

        let val = 0;
        for (let i = 0; i < requestBytes; i++) {
            val = (val << 8) + ar[i];
        }

        if (val < maxNum - maxNum % range) {
            return min + (val % range);
        }
    }
}

/* password display flag*/
var password_display_flag = 0;

/*The number of passwords in the session */
var password_number_session=0;

/* values for customization the password */

iclude_lower_case = 1;
iclude_Upper_case = 1;
iclude_number = 1;
iclude_symbols = 1;

console.log("Iclude_lower_case = ",iclude_lower_case);
console.log("Iclude_Upper_case = ",iclude_Upper_case);
console.log("Iclude_number = ",iclude_number);
console.log("Iclude_symbols = ",iclude_symbols);


$(document).ready(function(){
    $('input[id="checkbox-1"]').click(function(){
        if($(this).prop("checked") == true){
            iclude_lower_case = 1;
            console.log("Checkbox is checked 1. and iclude_lower_case = ",iclude_lower_case);
        }
        else if($(this).prop("checked") == false){
            iclude_lower_case = 0;
            console.log("Checkbox is unchecked 1. and iclude_lower_case = ",iclude_lower_case);
        }
    });
    $('input[id="checkbox-2"]').click(function(){
        if($(this).prop("checked") == true){
            iclude_Upper_case = 1;
            console.log("Checkbox is checked 2. and iclude_Upper_case = ",iclude_Upper_case);
        }
        else if($(this).prop("checked") == false){
            iclude_Upper_case = 0;
            console.log("Checkbox is unchecked 2. and iclude_Upper_case = ",iclude_Upper_case);
        }
    });
    $('input[id="checkbox-3"]').click(function(){
        if($(this).prop("checked") == true){
            iclude_number = 1;
            console.log("Checkbox is checked 3. and iclude_number = ",iclude_number);
        }
        else if($(this).prop("checked") == false){
            iclude_number = 0;
            console.log("Checkbox is unchecked 3. and iclude_number = ",iclude_number);
        }
    });
    $('input[id="checkbox-4"]').click(function(){
        if($(this).prop("checked") == true){
            iclude_symbols = 1;
            console.log("Checkbox is checked 4. and iclude_symbols = ",iclude_symbols);
        }
        else if($(this).prop("checked") == false){
            iclude_symbols = 0;
            console.log("Checkbox is unchecked 4. and iclude_symbols = ",iclude_symbols);
        }
    });
});

/* copy to clipboard function */
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

/* Layer 1 */
function getRandomType() {
    let type_number = '1234';

    let type_number_choose=type_number;

    if(iclude_lower_case == 0){
        type_number_choose = type_number_choose.replace('1', ''); 
    }
    if(iclude_Upper_case == 0){
        type_number_choose = type_number_choose.replace('2', ''); 
    }
    if(iclude_number == 0){
        type_number_choose = type_number_choose.replace('3', ''); 
    }
    if(iclude_symbols == 0){
        type_number_choose = type_number_choose.replace('4', ''); 
    }

    let type_number_length = type_number_choose.length;
    console.log('Random type_number_length:',type_number_length);
    let Randomtype = type_number_choose[RandomVar_core(0, type_number_length)];
    console.log('Random type:',Randomtype);
    return Randomtype;
}

/* Layer 2*/

function getRandomVar() {
    let RandomVar;
    switch (getRandomType()) {
        //Lower
        case '1':
            RandomVar = String.fromCharCode(RandomVar_core(97, 122));
            break;
         //Upper
        case '2':
            RandomVar = String.fromCharCode(RandomVar_core(65, 90));
            break;
       //Number
        case '3':
            RandomVar = String.fromCharCode(RandomVar_core(48, 57));
            break;
        //symbols
        case '4':
            let symbols = '!@#$%^&*(){}[]=<>/,.';
            let symbols_length = symbols.length;
            RandomVar = symbols[RandomVar_core(0, symbols_length)];
            break;

    }
    return RandomVar;

}

/* Add custom symbols */
function setcustom(custom,password){
    if(custom!=''){
        console.log('set custom password with',custom,'to',password);
        for (let index = 0; index < custom.length; index++) {
            let position = RandomVar_core(0, password.length);
            password[RandomVar_core(0, password.length)]=custom[index];
        }
        //password = password.join("");
    }
    return password;
}

/* Layer 3 */
var passwordstore;

function getpassword() {

    if ((iclude_lower_case === 0) && (iclude_Upper_case === 0 ) && (iclude_number === 0 ) && (iclude_symbols === 0)) {
        console.log("You should choose at least one type of characters!");
        $("p").empty();
        $("p").text("You should choose at least one type of characters!");
    }
    else {
    password_length = document.getElementById("passl").value;

    if (password_length >= 8) {
        //Create passwordarray[password_length] with all element is =1
        let passwordarray = Array(password_length).fill(1);
        //charge the passwordarray[password_length] by RandomVar
        for (let index = 0; index < password_length; index++) {
            passwordarray[index] = getRandomVar();
        }
        //make passwordarray one element call password
        let password = passwordarray.join("");
        console.log("password before custom: ",password);

        var custom = document.getElementById("input_symbols").value;
        console.log("Symbols_input: ",custom);

        password = setcustom(custom,passwordarray);
        password = password.join("");
        console.log("password after custom: ",password);

        //print password in the console for test
        console.log("your password is: " + password);
        password_number_session+=1;
        console.log("password_number_session: ",password_number_session);
        alerticon = document.getElementById('password_number_session_badge');
        alerticon.setAttribute('data-badge', password_number_session);

        
        password_display_flag = 1;
        return password;

    } else if (password_length == "") {
        $("p").empty();
        $("p").text("You should put a length!");
    } else {
        $("p").empty();
        $("p").text("The length of the password should greater or equal 8");
        //alert("The length of a password should greater or equal 8");
        console.log("The length of a password should greater or equal 8");
    }
}

}