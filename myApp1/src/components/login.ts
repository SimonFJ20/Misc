import { DOM, html, setRuntime } from "../../fromworkjs/fromwork"
import { LoginPost } from "../ajax";
import { User } from "../model";


class Props {

}

const loginEvent = (username: string, password: string, label: HTMLInputElement) => {
    const user: User = {
        username: username,
        password: password
    }
    LoginPost(user, (response) => {
        if(response.error) {
            label.innerText = <string> response.errmsg;
        }else {
            const params = new URLSearchParams(window.location.search);
            params.append('username', response.username);
            params.append('token', response.token);
            params.delete('page');
            window.location.search = '?' + params;
        }
    })
}

export const Login = (props: Props) => {

    setRuntime(() => {
        const username = <HTMLInputElement>DOM.id('loginusername');
        const password = <HTMLInputElement>DOM.id('loginpassword');
        const submit = <HTMLInputElement>DOM.id('loginsubmit');
        const register = <HTMLInputElement>DOM.id('loginregister');
        const label = <HTMLInputElement>DOM.id('loginlabel');

        username.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                if(password.value !== '') {
                    loginEvent(username.value, password.value, label);
                }else {
                    password.focus();
                }
            }
        });

        password.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                if(username.value !== '') {
                    loginEvent(username.value, password.value, label);
                }else {
                    username.focus();
                }
            }
        });

        submit.addEventListener('click', () => {
            if(username.value !== '' && password.value !== '') {
                loginEvent(username.value, password.value, label);
            }else {
                label.innerText = 'Please fill all fields!';
            }
        });

    });

    return html(/*html*/`
        <div id="login">
            <form>
                <input type="text" id="loginusername" placeholder="Username"><br>
                <input type="password" id="loginpassword" placeholder="Password"><br>
                <input type="button" id="loginsubmit" value="Login"><br>
                <input type="button" id="loginregister" value="Create Account"><br>
                <span id="loginlabel"></span>
            </form>
        </div>
    `)

}


