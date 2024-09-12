import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Cofee } from '../helpers/models/cofee';
import { NzModalComponent } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-cofee-information',
  templateUrl: './cofee-information.component.html',
  styleUrls: ['./cofee-information.component.scss']
})

export class CofeeInformationComponent {
  @Input() cofee: Cofee = {
    _id: '',
    id: 0,
    name: '',
    description: '',
    region: '',
    price: 0,
    flavor_profile: [],
    grind_option: [],
    roast_level: 0,
    image_url: '',
    weight: 0,
  };
  @Output() close = new EventEmitter<void>();

  isVisible = true;

  constructor() {}

  handleClose(): void {
    this.isVisible = false;
    this.close.emit();
  }

}
