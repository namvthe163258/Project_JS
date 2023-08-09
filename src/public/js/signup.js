function Validator(options) {

    var selectorRules = {};

    function getParent(element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

        var rules = selectorRules[rule.selector];
        for(var i =0; i < rules.length; i++){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }



    var formElement = document.querySelector(options.form) /// get(#form-1)
    if (formElement) {

        // Lặp qua mỗi rules và xử lý blur,input,...
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

             options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid =  validate(inputElement, rule);

                if(!isValid){
                    isFormValid = false;

                }
             });
             if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        values[input.name] = input.value;
                        return values;
                    },{});
                    options.onSubmit(formValues);
                }
             }

        }

        options.rules.forEach(function (rule) {

            //Lưu lại các rules cho mỗi input

            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector('.form-message');
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            }
        })
    }
}

Validator.isRequired = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || "Vui lòng nhập trường này!"
        }
    }
}



Validator.isEmail = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "Vui lòng nhập email ở trường này!"
        }
    }
}

Validator.ischeckPass = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Mật khẩu phải lớn hơn ${min} kí tự!`
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return{
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || "Giá trị nhập vào không trùng khớp!"
        }
    }
}