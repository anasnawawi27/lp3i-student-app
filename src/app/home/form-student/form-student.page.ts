import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.page.html',
  styleUrls: ['./form-student.page.scss'],
})
export class FormStudentPage implements OnInit {
  public majors: any = [];
  public religions: any = [
    { value: 'islam', text: 'Islam' },
    { value: 'kristen', text: 'Kristen' },
    { value: 'katolik', text: 'Katolik' },
    { value: 'hindu', text: 'Hindu' },
    { value: 'budha', text: 'Budha' },
    { value: 'konghucu', text: 'Konghucu' },
  ];

  // Variable untuk input
  public nama_lengkap: string = '';
  public nim: string = '';
  public gender: string = '';
  public tempat_lahir: string = '';
  public tanggal_lahir: Date = new Date();
  public agama: string = '';
  public alamat: string = '';
  public no_handphone: string = '';
  public email: string = '';
  public jurusan_id: number = 0;

  public formLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getDataJurusan();
  }

  getDataJurusan() {
    lastValueFrom(
      this.http.get<any>('https://students.anasn.dev/api/jurusan', {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
        params: {},
      })
    ).then((result) => {
      if (result.statusCode == 200) {
        this.majors = result.rows;
      }
    });
  }

  async onSave() {
    //validasi data yang kosong
    if (
      !this.nama_lengkap ||
      !this.nim ||
      !this.gender ||
      !this.tempat_lahir ||
      !this.tanggal_lahir ||
      !this.agama ||
      !this.alamat ||
      !this.no_handphone ||
      !this.email ||
      !this.jurusan_id
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

    //Menyimpan Data
    this.formLoading = true;
    //Payload = Data yang akan kirim ke API
    let payload = {
      nama_lengkap: this.nama_lengkap,
      nim: this.nim,
      gender: this.gender,
      tempat_lahir: this.tempat_lahir,
      tanggal_lahir: this.tanggal_lahir,
      agama: this.agama,
      alamat: this.alamat,
      no_handphone: this.no_handphone,
      email: this.email,
      jurusan_id: this.jurusan_id,
    };

    //Simpan Data ke database
    lastValueFrom(
      this.http.post<any>('https://students.anasn.dev/api/mahasiswa', payload, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
      })
    ).then(async (result) => {
      //ketika request nya success
      if (result.statusCode == 201) {
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
  }
}
