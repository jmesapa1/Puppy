import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DetalleUsuarioComponent } from '../../detalle-usuario/detalle-usuario.component';
import { UsuariosComponent } from '../../usuarios/usuarios.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { SimuladorComponent } from '../../simulador/simulador.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsuarioInversionesComponent } from '../../usuario-inversiones/usuario-inversiones.component';
import { DetalleInversionComponent } from '../../detalle-inversion/detalle-inversion.component';
import { DetallePagosComponent } from '../../detalle-pagos/detalle-pagos.component';
import { PagosComponent } from '../../pagos/pagos.component';
import { BuscadorClienteComponent } from '../../buscador-cliente/buscador-cliente.component';

export const ClienteLayoutRoutes: Routes = [
  
    { path: 'simulador',  component: SimuladorComponent },
    { path: 'buscador-cliente',  component: BuscadorClienteComponent },
    { path: '',  component: BuscadorClienteComponent },


];
