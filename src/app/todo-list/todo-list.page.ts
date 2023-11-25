import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  public data: any;

  public inputTitle: string = '';
  public inputDescription: string = '';

  constructor() {
    this.data = [
      { title: 'Bangun Pagi', description: 'Bangun pagi sholat subuh' },
      { title: 'Sarapan', description: 'Jam 6 sarapan sebelum berangkat' },
      { title: 'Bersih bersih', description: 'Bersihin kamar tidur jam 07:00' },
    ];
  }

  ngOnInit() {}

  onSave() {
    let newData = {
      title: this.inputTitle,
      description: this.inputDescription,
    };

    this.data.unshift(newData);
    this.inputTitle = '';
    this.inputDescription = '';
  }
}
