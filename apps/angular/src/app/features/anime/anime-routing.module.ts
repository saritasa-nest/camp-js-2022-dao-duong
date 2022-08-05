import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core/guards/auth.guard';

import { AnimeComponent } from './anime.component';

const routes: Routes = [{ path: '', component: AnimeComponent, canActivate: [AuthGuard] }];

/** Anime table view routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
