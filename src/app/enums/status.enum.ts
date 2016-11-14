import { Injectable } from '@angular/core';

@Injectable()
export class StatusEnum {
    public true: string = 'online';
    public false: string = 'offline';
    public test = 'test';
}