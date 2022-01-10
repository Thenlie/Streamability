const loginFormHandler = async (evt) => {
    evt.preventDefault();
    const toggleErrMsg = (target) => {
        document.querySelector(target).classList.remove('is-hidden');
        setTimeout(() => {document.querySelector(target).classList.add('is-hidden')}, 2000);
    };
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
    if (!email || !password) {
        toggleErrMsg('#err-msg');
        return;
    }
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
    });
    if (!response.ok) {
        toggleErrMsg('#err-msg');
        return;
    }
    document.location.replace('/');
};

const gotoSignup = () => {
    document.location.replace('/signup');
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#goto-signup-btn').addEventListener('click', gotoSignup);