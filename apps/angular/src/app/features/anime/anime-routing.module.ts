import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core/guards';

import { AnimeComponent } from './anime.component';
import { TableComponent } from './table/table.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './manage/create/create.component';
import { EditComponent } from './manage/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeComponent,
    children: [
      {
        path: '',
        component: TableComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
        title: 'Anime Detail',
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: CreateComponent,
        title: 'Create Anime',
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        title: 'Edit Anime',
        canActivate: [AuthGuard],
      },
    ],
  },
];

/** Anime table view routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
