import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  product: any = {};
  searchText: string;
  displayMessage: string;
  errorMessage: string;
  currentlySaving = false;

  searchResults = [];

  constructor(private http: HttpClient) {
  }

  saveProduct() {

    setTimeout(() => {
      this.errorMessage = null;
    }, 2000);

    if (!this.product.name || this.product.name.length === 0) {
      this.errorMessage = 'name cannot be empty';
      return;
    }
    if (!this.product.description || this.product.description.length === 0) {
      this.errorMessage = 'description cannot be empty';
      return;
    }
    if (!this.product.quantityLeft || this.product.quantityLeft === 0) {
      this.errorMessage = 'quantityLeft cannot be zero';
      return;
    }
    if (!this.product.price || this.product.price === 0) {
      this.errorMessage = 'price cannot be 0';
      return;
    }

    this.currentlySaving = true;
    this.http.post(
      'http://localhost:8080/product/save',
      this.product
    ).subscribe((response: any) => {
      this.displayMessage = `${response.name} ${response.description} successfully saved with id ${response.id}`;
      this.product = {};

      this.currentlySaving = false;
      setTimeout(() => {
        this.displayMessage = null;
      }, 1000);
    });
  }

  search() {
    if (!this.searchText || this.searchText.length === 0) {
      alert('The search text is required');
      return;
    }

    this.http.get(`http://localhost:8080/product/filter/name?name=${this.searchText}`).subscribe((resp: any) => {
      this.searchResults = resp;
    });
  }
}
