import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  date: string;
  is_done: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', date: '15:00 07 August 2020', is_done: false},
  {position: 2, name: 'Helium', date: '11:20 11 August 2020', is_done: true},
  {position: 3, name: 'Lithium', date: '21:20 23 August 2020', is_done: false},

];

/**
 * @title Table with selection
 */
@Component({
  selector: 'to-do-list.component',
  styleUrls: ['./to-do-list.component.css'],
  templateUrl: './to-do-list.component.html',
})
export class TableSelectionExample {
  displayedColumns: string[] = ['position', 'name', 'date', 'is_done'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private router: Router) {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onEdit(id) {
    console.log(id);
    this.router.navigateByUrl(`/edit/${ id }`);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
