import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.page.html',
  styleUrls: ['./detail-student.page.scss'],
})
export class DetailStudentPage implements OnInit {
  public id: number;
  public data: any;
  public loading: boolean = true;

  constructor(
    private navController: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getDetailStudent();
  }

  getDetailStudent() {
    lastValueFrom(
      this.http.get<any>(
        'https://students.anasn.dev/api/mahasiswa/' + this.id,
        {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
          }),
          params: {},
        }
      )
    ).then((result) => {
      if (result.statusCode == 200) {
        this.data = result.data;
        this.loading = false;
      }
    });
  }

  async onDelete(id: number) {
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
              this.http.delete<any>(
                'https://students.anasn.dev/api/mahasiswa/' + id,
                {
                  headers: new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                  }),
                  params: {},
                }
              )
            ).then(async (result) => {
              if (result.statusCode == 200) {
                loading.dismiss();
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

                //setelah berhasil simpan, kita kembali ke home
                this.navController.navigateBack('/home');
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
