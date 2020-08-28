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

const configErrMsg = `You have not configured and imported the Firebase SDK.
Make sure you go through the codelab setup instructions.`;

const bucketErrMsg = `Your Firebase Storage bucket has not been enabled. Sorry
about that. This is actually a Firebase bug that occurs rarely. Please go and
re-generate the Firebase initialization snippet (step 4 of the codelab) and make
sure the storageBucket attribute is not empty. You may also need to visit the
Storage tab and paste the name of your bucket which is displayed there.`;

if (!environment.firebase) {
  if (!environment.firebase.apiKey) {
    window.alert(configErrMsg);
  } else if (environment.firebase.storageBucket === '') {
    window.alert(bucketErrMsg);
  }
}

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
    AngularFireModule.initializeApp(environment.firebase),
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
