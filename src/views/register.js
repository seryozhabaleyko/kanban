import DOMHelpers from '../js/helpers/DOMHelpers';
import icons from '../js/helpers/icons';
import firebase from '../js/firebase';
import '../scss/register.scss';

const { createElement } = DOMHelpers();

const handleSignUp = (e) => {
    e.preventDefault();

    let {
        login, email, password, passwordRepeat, submit,
    } = document.forms.register;

    login = login.value;
    email = email.value;
    password = password.value;
    passwordRepeat = passwordRepeat.value;

    if (email.length < 4) {
        alert('Please enter an address.');
        return;
    }

    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }

    if (password !== passwordRepeat) {
        alert('Please enter a password.');
        return;
    }

    submit.disabled = true;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => response.user.updateProfile({
            displayName: login,
        }))
        .catch(({ code, message }) => {
            if (code === 'auth/weak-password') {
                console.error('The password is too weak');
            } else {
                console.error(message);
            }
            submit.disabled = false;
        });
};

const form = () => {
    const $form = createElement('form', '#register');
    $form.name = 'register';
    $form.addEventListener('submit', handleSignUp, false);

    const $title = createElement('h3');
    $title.textContent = 'Регистрация';

    const $description = createElement('p');
    $description.textContent = 'Это бесплатно - и всегда так будет.';

    const $linkLoginOrRegistration = createElement('div', '.link-login-or-registration');

    const $linkLogin = createElement('a');
    $linkLogin.href = '/#login';
    $linkLogin.textContent = 'Вход';

    const $linkRegister = createElement('a', '.current');
    $linkRegister.href = '/#register';
    $linkRegister.textContent = 'Регистрация';

    $linkLoginOrRegistration.append($linkLogin, $linkRegister);

    const $loginWrapper = createElement('div');
    const $login = createElement('input', '#loginn');
    $login.type = 'text';
    $login.name = 'login';
    $login.placeholder = 'Логин';
    $loginWrapper.appendChild($login);
    $loginWrapper.insertAdjacentHTML('beforeend', icons.login);

    const $emailWrapper = createElement('div');
    const $email = createElement('input', '#email');
    $email.type = 'email';
    $email.name = 'email';
    $email.placeholder = 'Электронный адрес';
    $email.setAttribute('required', '');
    $emailWrapper.insertAdjacentHTML('beforeend', icons.email);
    $emailWrapper.appendChild($email);

    const $passwordWrapper = createElement('div');
    const $password = document.createElement('input', '#password');
    $password.type = 'password';
    $password.name = 'password';
    $password.placeholder = 'Пароль';
    $password.setAttribute('required', '');
    $passwordWrapper.insertAdjacentHTML('beforeend', icons.lock);
    $passwordWrapper.appendChild($password);

    const $passwordRepeatWrapper = createElement('div');
    const $passwordRepeat = document.createElement('input');
    $passwordRepeat.type = 'password';
    $passwordRepeat.name = 'passwordRepeat';
    $passwordRepeat.placeholder = 'Пароль еще раз';
    $passwordRepeat.setAttribute('required', '');
    $passwordRepeatWrapper.insertAdjacentHTML('beforeend', icons.lock);
    $passwordRepeatWrapper.appendChild($passwordRepeat);

    const $submit = document.createElement('input');
    $submit.type = 'submit';
    $submit.name = 'submit';
    $submit.value = 'Продолжить регистрацию';

    $form.append(
        $title,
        $description,
        $linkLoginOrRegistration,
        $loginWrapper,
        $emailWrapper,
        $passwordWrapper,
        $passwordRepeatWrapper,
        $submit,
    );

    return $form;
};

const register = (root) => {
    document.title = 'Kanban — Выполните зарегистрацию';

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = '/';
        } else {
            const $bg = createElement('div', '.register-bg');
            $bg.insertAdjacentHTML('afterbegin', icons.bgLoginAndRegister);

            const $wrapper = createElement('div', '.register-wrapper');
            $wrapper.appendChild(form());

            root.classList.add('register');
            root.append($bg, $wrapper);
        }
    });
};

export default register;