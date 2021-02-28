
import { Component, DOM, html, setRuntime } from "../fromworkjs/fromwork";
import { Login } from "./components/login";
import { Topbar } from './components/topbar'

let autherized: boolean = false;
let username: string = '';
let token: string = '';

class Props {


}

export const Landing = (props: Props): Component => {

    const params = new URLSearchParams(window.location.search);
    if(params.has('username') && params.has('token')) {
        username = <string> params.get('username');
        token = <string> params.get('token');
        autherized = true;
    }

    setRuntime(() => {

        

    });

    return html(/*html*/`

        ${Topbar({autherized: autherized, username: username})}

        ${(() => {
            const params = new URLSearchParams(window.location.search);
            if(params.has('page')) {
                switch(params.get('page')) {
                    case 'login':
                        return html(/*html*/`
                            ${Login({})}
                        `);
                    default:
                        return html(/*html*/``);
                }
            }else {
                return html(/*html*/``);
            }
        })()}

    `)

}


