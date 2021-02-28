
/*
*       Your FromWorkJS App
*
*       Filename:   index.ts
*       Pathname:   src/index.ts
*       Language:   TypeScript
*       Content:    Entry point for app
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


import { App } from "./app";
import { execRuntime } from "../fromworkjs/fromwork";


// what html tag to look for
// default 'fromworkjs-app' and <fromworkjs-app></fromworkjs-app>
const htmlTagName = 'fromworkjs-app';

const htmlAppTag = document.getElementsByTagName(htmlTagName)[0];

if(htmlAppTag != null) {

    // starts app
    htmlAppTag.innerHTML = App();

    execRuntime();

} else {

    // styled log
    console.log(`%c<${htmlTagName}></${htmlTagName}>%c declaration not found!`,
    'color: white; background-color: blue; font-size: 1.2em', 'color: red; font-size: 1.2em');

    // best practise to throw error
    throw new Error(`<${htmlTagName}> NOT FOUND!`)

}




