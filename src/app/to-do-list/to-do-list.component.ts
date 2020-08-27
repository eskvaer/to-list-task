import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {Tasks} from "../to-do-list.model";
import {ToDoListService} from "../to-do-list.service";

/**
 * @title Table with selection
 */
@Component({
  selector: 'to-do-list.component',
  styleUrls: ['./to-do-list.component.css'],
  templateUrl: './to-do-list.component.html',
})
export class TableSelectionExample implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'date', 'is_done'];
  dataSource = new MatTableDataSource<Tasks>([]);
  selection = new SelectionModel<Tasks>(true, []);

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      const tasks = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Tasks;
      });
      this.dataSource = new MatTableDataSource<Tasks>(tasks);
    });
  }

  constructor(
    private router: Router,
    private taskService: ToDoListService
  ) {
  }

  create(task: Tasks) {
    this.taskService.createTask(task);
  }

  update(task: Tasks) {
    this.taskService.updateTask(task);
  }

  delete(id: string) {
    this.taskService.deleteTask(id);
  }

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
    this.router.navigateByUrl(`/edit/${id}`);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Tasks): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
