// Angular 2 Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import { BrowserModule }  from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Language 
import { Language } from './language/language.service';
import { EnglishDictionary } from './language/en.dictionary';
import { BulgarianDictionary } from './language/bg.dictionary';

// Basic Components
import { ButtonComponent } from './basic_components/button/button.component';
import { HeaderComponent } from './basic_components/header/header.component';
import { UserFormComponent } from './basic_components/user_form/user_form.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { UserListComponent } from './components/user_list/user_list.component';
import { UserModalComponent } from './components/user_modal/user_modal.component';

// Config
import { Config } from './config';

// Services
import { CachingService } from './services/caching.service';
import { FetcherService } from './services/fetcher.service';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';

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
        DetailsComponent,
        UserListComponent,
        UserModalComponent,
        // Basic components
        ButtonComponent,
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
        Language,
        EnglishDictionary,
        BulgarianDictionary,
        // services of the app
        FetcherService,
        CachingService,
        EventEmiterService,
        ErrorHandlerService
    ]
})

export class AppModule { }