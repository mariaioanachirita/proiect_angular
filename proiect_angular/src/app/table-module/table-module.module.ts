import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableRoutingModule } from './table-routing.module';
import { EditTableComponent } from './edit-table/edit-table.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'; 
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CofeeInformationComponent } from './cofee-information/cofee-information.component';





@NgModule({
  declarations: [
    TableComponent,
    EditTableComponent,
    CofeeInformationComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzNotificationModule,
    NzSelectModule,
    NzSpinModule,
    FormsModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
    NzModalModule,
    
  ]
})
export class TableModuleModule { }
