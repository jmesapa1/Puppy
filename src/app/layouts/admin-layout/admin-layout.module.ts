import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DetalleUsuarioComponent } from '../../detalle-usuario/detalle-usuario.component';
import { UsuariosComponent } from '../../usuarios/usuarios.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { SimuladorComponent } from '../../simulador/simulador.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { NumbersOnlyDirective } from './../../directive/numbers-only.directive';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { UsuarioInversionesComponent } from './../../usuario-inversiones/usuario-inversiones.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FileUploadModule } from 'ng2-file-upload';
import { DetallePagosComponent } from '../../detalle-pagos/detalle-pagos.component';
import { PagosComponent } from '../../pagos/pagos.component';
import { DetalleInversionModalComponent } from '../../components/detalle-inversion/detalle-inversion.component';
import { DetalleInversionComponent } from '../../detalle-inversion/detalle-inversion.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DetalleUsuarioModalComponent } from '../../components/detalle-usuario-modal/detalle-usuario-modal.component';
import {MatSortModule} from '@angular/material/sort';
import { CargaComprobantePagoComponent } from '../../components/carga-comprobante-pago/carga-comprobante-pago.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import { ResumenComponent } from '../../components/resumen/resumen.component';
import { ResumenInversionComponent } from '../../resumen/resumen-inversion.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
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
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    CurrencyMaskModule,
    NgxSliderModule,
    FileUploadModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatInputModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatStepperModule,
   MatTabsModule
    
  ],
  declarations: [
    DashboardComponent,
    DetalleUsuarioComponent,
    UsuariosComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    PagosComponent,
    ResumenComponent,
    UsuarioInversionesComponent,
    DetalleInversionComponent,
    DetallePagosComponent,
    ResumenInversionComponent,
    DetalleInversionModalComponent,
    DetalleUsuarioModalComponent,
    CargaComprobantePagoComponent
  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})

export class AdminLayoutModule {}
