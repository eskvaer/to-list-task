import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatTableModule } from "@angular/material/table";
import { TableSelectionExample } from "./to-do-list/to-do-list.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ProfileEditorComponent } from "./to-do-list-editor/to-do-list-editor.component";
import {CommonModule} from "@angular/common";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forRoot([
      {path: '', component: TableSelectionExample},
      {path: 'edit/:id', component: ProfileEditorComponent},
      {path: 'add', component: ProfileEditorComponent},
    ]),
    MatCheckboxModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    TableSelectionExample,
    ProfileEditorComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
