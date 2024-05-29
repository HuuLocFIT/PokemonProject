import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonsListComponent } from './pages/pokemons-list/pokemons-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterModalComponent } from './components/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from './components/modals/sort-modal/sort-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    PageNotFoundComponent,
    FilterModalComponent,
    SortModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
