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
  displayedColumns: string[] = ['number', 'name', 'date', 'is_done'];
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
  ) {}

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onEdit(id) {
    this.router.navigateByUrl(`/edit/${id}`);
  }
}
