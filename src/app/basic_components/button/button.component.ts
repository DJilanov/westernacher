import { Component, Input } from '@angular/core';

@Component({
    selector: 'custom-button',
    styleUrls: ['./button.component.css'],
    templateUrl: './button.component.html'
})

export class ButtonComponent {
    @Input()
    buttonOptions: Object;
}
