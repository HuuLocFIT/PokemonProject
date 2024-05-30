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
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailsModalComponent } from './components/modals/details-modal/details-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerLayoutComponent } from './components/spinner-layout/spinner-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    PageNotFoundComponent,
    FilterModalComponent,
    SortModalComponent,
    DetailsModalComponent,
    SpinnerLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
