import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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

  public loading: boolean = true;
  public formLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

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
        this.loading = false;
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

    this.formLoading = true;
    //Payload = Data yang akan kirim ke API
    let newData = {
      title: this.inputTitle,
      description: this.inputDescription,
      is_done: false,
    };

    //Simpan Data ke database
    lastValueFrom(
      this.http.post<any>('http://127.0.0.1:8000/api/todos', newData, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
      })
    ).then(async (result) => {
      //ketika request nya success
      if (result.success == true) {
        this.inputTitle = '';
        this.inputDescription = '';
        this.formLoading = false;
        this.loading = true;
        this.getAllData();

        //Membuat Toast
        const toast = await this.toastController.create({
          message: result.message,
          duration: 1500,
          icon: 'checkmark',
          color: 'success',
          position: 'top',
        });

        // untuk menampilkan toast
        await toast.present();
      }
    });
  }

  async remove(index: number, id: number) {
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
          handler: async () => {
            //Hapus data dari database
            //membuat loading terlebih dulu
            const loading = await this.loadingController.create({
              message: 'Mohon tunggu...',
              mode: 'ios',
            });
            //tampilkan loading
            await loading.present();

            //kirim request ke server untuk menghapus data
            lastValueFrom(
              this.http.delete<any>('http://127.0.0.1:8000/api/todos/' + id, {
                headers: new HttpHeaders({
                  'Access-Control-Allow-Origin': '*',
                }),
                params: {},
              })
            ).then((result) => {
              if (result.success == true) {
                //update tampilan list untuk menghilangkan data sesuai dengan
                //index yang dikirim
                this.data.splice(index, 1);
                loading.dismiss();
              }
            });
          },
        },
      ],
    });

    // menampilkan alert
    await alert.present();
  }
}
