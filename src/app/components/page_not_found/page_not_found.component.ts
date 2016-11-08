import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'page-not-found',
    styleUrls: ['./page_not_found.component.css'],
    templateUrl: './page_not_found.component.html'
})

export class PageNotFoundComponent {
    /**
     * @constructor We init the view with the router
     */
    constructor() {}
    /**
     * @ngOnInit on init
     */
    // public ngOnInit() {
    //     this.checkForSimilarRouter();
    // }
    /**
     * @checkForSimilarRouter used to find the similarest route and send you there ( we change the urls often )
     */
    // public checkForSimilarRouter() {
    //     var path = '';
    //     var navigateTo = '';
    //     var currentUrl = this.router.url.split('/')[1];
    //     // we split it into many 2 chars strings
    //     var partsOfUrl = currentUrl.match(/.{1,2}/g);
    //     var partsEquals = new Array(partsOfUrl.length);
    //     // we check for all routes we predeclare
    //     for(var routeCounter = 0; routeCounter < this.router.config.length; routeCounter++) {
    //         partsEquals.fill(undefined);
    //         path = this.router.config[routeCounter].path;
    //         // we check for each part of the url we typed is part of it
    //         for(var chunksCounter = 0; chunksCounter < partsEquals.length; chunksCounter++) {
    //             // if the part of the url is here we make it true
    //             if(path.indexOf(partsOfUrl[chunksCounter]) !== -1) {
    //                 partsEquals[chunksCounter] = true;
    //             }
    //         }
    //         // check did we find the path that we must go to
    //         partsEquals.sort();
    //         if((partsEquals.indexOf(undefined) > partsEquals.length * 1 / 2) || (partsEquals.indexOf(undefined) == -1)) {
    //             this._router.navigate(['/' + path]);
    //             break;
    //         }
    //     }
    // }
}
