import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FileUploadModule } from 'ng2-file-upload';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import { SimuladorComponent } from '../simulador/simulador.component';
import { NumbersOnlyDirective } from '../directive/numbers-only.directive';



@NgModule({
  declarations: [SimuladorComponent,NumbersOnlyDirective],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    CurrencyMaskModule,
    NgxSliderModule,
    FileUploadModule,
    MatDialogModule,
    MatSortModule
  ],
  exports:[SimuladorComponent,    NumbersOnlyDirective,
  ]
})
export class ShareModule { }
