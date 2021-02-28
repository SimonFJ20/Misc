
/*
*       Your FromWorkJS App
*
*       Filename:   app.ts
*       Pathname:   src/app.ts
*       Language:   TypeScript
*       Content:    Main file for app
*
*       License:    MIT (Or your License Here)
*
*       Authors:
*       Your Name Here
*           Email:      your@email.here
*           GitHub:     yourgithub
*
*       Created:    XX-XX-20XX
*       Last Edit:  XX-XX-20XX
*/

import { Component, DOM, html } from "../fromworkjs/fromwork";
import { Landing } from "./landing";



export const App = (): Component => {

    DOM.setCssImport('global.css');

    return html(/*html*/`${Landing({})}`);

    
}

