import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  public data: any;

  public inputTitle: string = '';
  public inputDescription: string = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    // this.data = [
    //   {
    //     title: 'Bangun Pagi',
    //     description: 'Bangun pagi sholat subuh',
    //     is_done: false,
    //   },
    //   {
    //     title: 'Sarapan',
    //     description: 'Jam 6 sarapan sebelum berangkat',
    //     is_done: false,
    //   },
    //   {
    //     title: 'Bersih bersih',
    //     description: 'Bersihin kamar tidur jam 07:00',
    //     is_done: false,
    //   },
    // ];
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    lastValueFrom(
      this.http.get<any>('http://127.0.0.1:8000/api/todos', {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
        params: {},
      })
    ).then((result) => {
      if (result.success == true) {
        this.data = result.rows;
      }
    });
  }

  async onSave() {
    if (!this.inputTitle || !this.inputDescription) {
      // Tambahkan validasi
      const toast = await this.toastController.create({
        message: 'Inputan masih kosong! Silahkan lengkapi!',
        duration: 1500,
        icon: 'alert-circle',
        color: 'warning',
      });

      // untuk menampilkan toast
      await toast.present();

      return;
    }

    let newData = {
      title: this.inputTitle,
      description: this.inputDescription,
      is_done: false,
    };

    this.data.unshift(newData);
    this.inputTitle = '';
    this.inputDescription = '';
  }

  async remove(index: number) {
    // membuat alert
    const alert = await this.alertController.create({
      header: 'Yakin mau hapus?',
      subHeader: 'Data akan dihapus',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Hapus',
          role: 'confirm',
          handler: () => {
            this.data.splice(index, 1);
          },
        },
      ],
    });

    // menampilkan alert
    await alert.present();
  }
}
