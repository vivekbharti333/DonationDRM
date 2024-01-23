import { Component, Input } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {

  @Input() displayName: string = '';
  @Input() websiteLink: string = '';

  constructor() {
    super();
  }
}


