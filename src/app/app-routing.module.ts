import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/_helpers/auth.guard';

const authModule = () => import('./auth/auth.module').then(x => x.AuthModule);
const monitoringModule = () => import('./monitoring/monitoring.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', loadChildren: monitoringModule, canActivate: [AuthGuard] },
    // { path: 'monitoring', loadChildren: monitoringModule, canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: authModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
