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
import { ResumenInversionComponent } from '../../resumen/resumen-inversion.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'detalle-usuario',   component: DetalleUsuarioComponent },
    { path: 'usuario-inversiones',   component: UsuarioInversionesComponent },
    { path: 'usuarios',     component: UsuariosComponent },
    { path: 'pagos',     component: PagosComponent },
    { path: 'resumen-inversion',     component: ResumenInversionComponent },

    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'simulador',  component: SimuladorComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'detalle-inversion',        component: DetalleInversionComponent },

    { path: 'detalle-pago',        component: DetallePagosComponent },

];
