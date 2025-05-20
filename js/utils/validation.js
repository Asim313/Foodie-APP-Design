import UserStore from "../stores/SiteStore";

function validateRelayTime (minimum,maximum,value) {
    if(value) {
        value = value.replace(/\D/g, '');
        if (value > maximum) {
            value = maximum;
        } else if (value < minimum) {
            value = minimum;
        }
        else if (isNaN(value)) {
            value = minimum;
        }
        return value.toString();
    }
    return value;
}

function validatePasscode (value) {
    if(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 4) {
            return value.slice(0, 4)
        }
    }
    return value;
}

function cleanNumberInput(text){
    text = text.replace(/\D/g,'');
    if(text.length>0){
        return parseInt(text);
    }else{
        return '';
    }
}

function checkWithinLimits(value,min,max){
    return parseInt(value)< min || parseInt(value)> max || value.length===0;
}

// function validateTelephoneNumber (value) {
//     if(value) {
//         value = value.replace(/\D/g, '');
//         // if (value.length > 4) {
//         //     return value.slice(0, 4)
//         // }
//     }
//     return value;
// }

function validateTelephoneNumber (value) {
    const regex = /^[+]*[-\s\./0-9]*$/g;
    const found = value.match(regex);
    if(value) {
        value = value.replace(/\D/g, '');
        // if (value.length > 4) {
        //     return value.slice(0, 4)
        // }
    }
    return value;
}

// ^[+]*[-\s\./0-9]*$

function checkNullSite(){
    // console.log(UserStore.activeSiteID)
    if(UserStore.activeSiteID<0){
        return true;
    }else{
        return false;
    }
    // return UserStore.activeSite!==null;
}

function checkPro(){
    return UserStore.currentMode==='pro';
}

function checkLite(){
    return UserStore.currentMode==='lite';
}

function checkPlus(){
    return UserStore.currentMode==='plus';
}

module.exports = { validateRelayTime, validatePasscode, validateTelephoneNumber,checkPro,checkLite, checkPlus, checkNullSite, checkWithinLimits, cleanNumberInput }
