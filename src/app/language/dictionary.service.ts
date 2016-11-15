import { Injectable } from '@angular/core';
import { Config } from '../config';
import { EnglishDictionary } from './en.dictionary';
import { BulgarianDictionary } from './bg.dictionary';

@Injectable()
export class Dictionary {
    // the variables containing the language jsons
    // will contain the default language
    private language: string = ''; 
    /**
    * @getTexts will return the text from the current dictionary 
    * @text {string} searched text 
    */
    public getTexts(text:string) {
        return this[this.language].dictionary[text];
    };
    /**
    * @setLanguage change the language of the app
    * @language {string} new language
    */
    public setLanguage(language:string):void {
        this.language = language;
    }
    /**
    * @nextLanguage returns the next language to show the correct flag
    */
    public nextLanguage() {
        let index = Config.languages.indexOf(this.language);
        if(index == Config.languages.length - 1) {
            return Config.languages[0];
        } else {
            return Config.languages[index + 1];
        }
    }
    /**
    * @changeLanguage change the languag with the next one
    */
    public changeLanguage():void {
        this.language = this.nextLanguage();
    }

    constructor(private en: EnglishDictionary, private bg: BulgarianDictionary) {
        this.language = Config.defaultLang;
    };
}