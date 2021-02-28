
/*
*       Your FromWorkJS App
*
*       Filename:   models.ts
*       Pathname:   src/models.ts
*       Language:   TypeScript
*       Content:    Contains general data models for communication and http requests
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



/* Your data models here */

export interface User {
    username: string,
    password: string
}

export interface UserResponse {
    username: string,
    token: string,
    error: boolean,
    errmsg?: string
}

export const Model = 5;



