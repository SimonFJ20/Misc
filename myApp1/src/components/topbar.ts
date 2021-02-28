
import { Component, DOM, html, setRuntime } from "../../fromworkjs/fromwork";


class Props {

    autherized: boolean = false;
    username: string = '';

}


export const Topbar = (props: Props): Component => {

    setRuntime(() => {

        DOM.id('topbarUser').addEventListener('click', () => {
            window.location.search = 'page=login'
        });

    });

    return html(/*html*/`

        <div id="topbar">

            <h1>Simons App</h1>

            ${(() => {
                if(props.autherized) {
                    return /*html*/`
                        <div id="topbarUser">
                            ${props.username}
                        </div>
                    `;
                }else {
                    return /*html*/`
                        <div id="topbarUser">
                            Login
                        </div>
                    `;
                }
            })()}

            <div>
                <a>Frontpage</a>
                <a>Search</a>
                <a>My Posts</a>
            </div>

        </div>

    `)

}
