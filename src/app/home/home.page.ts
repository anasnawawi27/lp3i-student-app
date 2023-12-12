import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public segment: string = 'student';

  public loading: boolean = true;
  public data: Array<any> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    lastValueFrom(
      this.http.get<any>('https://students.anasn.dev/api/mahasiswa', {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
        params: {},
      })
    ).then((result) => {
      if (result.statusCode == 200) {
        this.data = result.rows;
        this.loading = false;
      }
    });
  }
}
