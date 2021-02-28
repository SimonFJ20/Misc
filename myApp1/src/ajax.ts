
/*
*       Your Your FromWorkJS App
*
*       Filename:   ajax.ts
*       Pathname:   src/ajax.ts
*       Language:   TypeScript
*       Content:    Contains general http requests
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

import { get, post } from "../fromworkjs/fromwork";
import { User, UserResponse } from "./model";



/* Your AJAX here */


export const LoginPost = (user: User, callback: (userResponse: UserResponse) => void): void => {
    post('/api/login', user, (response) => {
        callback(<UserResponse> response);
    });
}

