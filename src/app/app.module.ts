// Angular 2 Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import { BrowserModule }  from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

// Language 
import { Dictionary } from './language/dictionary.service';
import { EnglishDictionary } from './language/en.dictionary';
import { BulgarianDictionary } from './language/bg.dictionary';

// Basic Components
import { HeaderComponent } from './basic_components/header/header.component';
import { UserFormComponent } from './basic_components/user_form/user_form.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { UserListComponent } from './components/user_list/user_list.component';
import { UserModalComponent } from './components/user_modal/user_modal.component';

// Config
import { Config } from './config';

// Enums
import { StatusEnum } from './enums/status.enum';
import { ActionsEnum } from './enums/actions.enum';

// Services
import { CachingService } from './services/caching.service';
import { FetcherService } from './services/fetcher.service';
import { HeartBeatService } from './services/heart.beat.service';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';
// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'westernacher',
    storageType: 'localStorage'
};
@NgModule({
    // Modules & Libs
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        Ng2Webstorage,
        Ng2BootstrapModule,
        ReactiveFormsModule
    ],
    // Components & Views
    declarations: [ 
        // Main components
        AppComponent,
        HomeComponent,
        SearchComponent,
        UserListComponent,
        UserModalComponent,
        // Basic components
        HeaderComponent,
        UserFormComponent,
    ],
    // Bootstraping
    bootstrap: [ 
        AppComponent 
    ],
    // Services
    providers: [
        // config of the app
        Config,
        // languages
        Dictionary,
        StatusEnum,
        ActionsEnum,
        EnglishDictionary,
        BulgarianDictionary,
        // services of the app
        FetcherService,
        CachingService,
        HeartBeatService,
        EventEmiterService,
        ErrorHandlerService,
        LocalStorageService,
        {
            provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
        }
    ]
})

export class AppModule { }