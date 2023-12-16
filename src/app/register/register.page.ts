import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public showPassword: boolean = false;
  public showConfirm: boolean = false;

  //variable inputan
  public fullname: string = '';
  public username: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  public formLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async onRegister() {
    //validasi

    if (
      !this.fullname ||
      !this.username ||
      !this.password ||
      !this.confirmPassword
    ) {
      //Mendefinisikan Toast
      const toast = await this.toastController.create({
        message: 'Silahkan lengkapi inputan!',
        position: 'top',
        mode: 'ios',
        color: 'danger',
        duration: 1500,
      });

      //tampilkan Toast
      await toast.present();
      return;
    }

    //validasi password & konfirmasi password
    if (this.password !== this.confirmPassword) {
      //Mendefinisikan Toast
      const toast = await this.toastController.create({
        message: 'Konfirmasi Password tidak sama!',
        position: 'top',
        mode: 'ios',
        color: 'danger',
        duration: 1500,
      });

      //tampilkan Toast
      await toast.present();
      return;
    }

    this.formLoading = true;
    //membuat payload, data yang akan dikirim lewat API
    const payload = {
      fullname: this.fullname,
      username: this.username,
      password: this.password,
    };
    //registrasi user, kirim data ke API
    lastValueFrom(
      this.http.post<any>(
        'https://students.anasn.dev/api/auth/register',
        payload,
        {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
          }),
        }
      )
    )
      .then(async (result) => {
        //ketika request nya success
        if (result.statusCode == 200) {
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
          this.navController.navigateForward('/login');
        }
      })
      .finally(() => {
        this.formLoading = false;
      });
  }
}
