import { Injectable } from '@angular/core';

@Injectable()
export class ActionsEnum {
    public delete: string = 'delete';
    public create: string = 'create';
    public update: string = 'update';
    public submit: string = 'submit';
}