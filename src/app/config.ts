import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // language
    public static get defaultLang():string { return 'en'; }
    public static get languages():Array<string> { return ['bg', 'en']; }
    // urls
    public static get usersUrl():string { return "http://4055c814.ngrok.io/api/users"; }
    public static get changeUsersUrl():string { return "http://4055c814.ngrok.io/api/users/{{id}}"; }

    // staging
    // public static get usersUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/users"; }
    // public static get changeUsersUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/users/{{id}}"; }
}
