const form = document.querySelector('#form');
const inputs = {
    uname: document.querySelector('#uname'),
    email: document.querySelector('#email'),
    pass: document.querySelector('#pass'),
    pass2: document.querySelector('#pass2'),
};

const validations = {
    uname: (value) => ({
        isValid: value !== '',
        message: 'نام کاربری نمیتواند خالی باشد',
    }),
    email: (value) => ({
        isValid: value.includes('@') && value.includes('.') && value.length > 5,
        message: value === '' ? 'ایمیل نمیتواند خالی باشد' : 'ایمیل معتبر نیست',
    }),
    pass: (value) => ({
        isValid: value !== '',
        message: 'رمز عبور نمیتواند خالی باشد',
    }),
    pass2: (value, passValue) => ({
        isValid: value === passValue && value !== '',
        message:
            value === ''
                ? 'تایید رمز عبور الزامی است'
                : 'رمزهای عبور مطابقت ندارند',
    }),
};

const handleInput = (inputElement, isValid, message) => {
    const formControl = inputElement.parentElement;
    const small = formControl.querySelector('small');
    small.className = `small ${isValid ? 'success' : 'error'}`;
    small.innerText = isValid ? '' : message;
    return isValid;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const unameValue = inputs.uname.value.trim();
    const unameResult = validations.uname(unameValue);
    handleInput(inputs.uname, unameResult.isValid, unameResult.message);

    const emailValue = inputs.email.value.trim();
    const emailResult = validations.email(emailValue);
    handleInput(inputs.email, emailResult.isValid, emailResult.message);

    const passValue = inputs.pass.value.trim();
    const passResult = validations.pass(passValue);
    handleInput(inputs.pass, passResult.isValid, passResult.message);

    const pass2Value = inputs.pass2.value.trim();
    const pass2Result = validations.pass2(pass2Value, passValue);
    handleInput(inputs.pass2, pass2Result.isValid, pass2Result.message);
    const isFormValid =
        unameResult.isValid &&
        emailResult.isValid &&
        passResult.isValid &&
        pass2Result.isValid;

    if (isFormValid) {
        console.log('فرم با موفقیت ارسال شد:', {
            username: unameValue,
            email: emailValue,
            password: passValue,
        });
    }
});
