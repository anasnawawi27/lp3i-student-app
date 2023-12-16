import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type: string = 'password';
  public icon: string = 'eye-outline';

  public showPassword: boolean = false;

  // Variable untuk inputan user
  public username: string = '';
  public password: string = '';

  public formLoading: boolean = false;

  constructor(
    private toastController: ToastController,
    private http: HttpClient,
    private navController: NavController
  ) {}

  ngOnInit() {}

  async onSend() {
    //validasi inputan user tidak boleh kosong
    if (this.username == '' || this.password == '') {
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

    this.formLoading = true;
    //Membuat Payload = Data yg akan dikirim ke API
    const payload = {
      username: this.username,
      password: this.password,
    };

    //Simpan Data ke database
    lastValueFrom(
      this.http.post<any>(
        'https://students.anasn.dev/api/auth/login',
        payload,
        {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
          }),
        }
      )
    ).then(async (result) => {
      //ketika request nya success
      if (result.statusCode == 200) {
        //membuat local storage
        localStorage.setItem('sudah_login', 'TRUE');
        localStorage.setItem('akun', JSON.stringify(result.data.account));

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
        this.formLoading = false;

        //setelah berhasil login, kita masuk ke home
        this.navController.navigateForward('/home');
      }
    });
  }
}
