import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
// export class ItemListComponent implements OnInit {
//   items: any[] = [];
//   newItem: any = {};

//   constructor(private http: HttpClient) {}
//   public apiUrl = 'http://localhost:3000';
//   ngOnInit(): void {
//     this.getItems();
//   }

//   getItems(): void {
//     const url = this.apiUrl + '/api/items';
//     this.http.get(url).subscribe((data: any) => {
//       this.items = data;
//     });
//   }

//   addItem(): void {
//     const url = this.apiUrl + '/api/items';
//     this.http.post(url, this.newItem).subscribe(() => {
//       this.getItems();
//       this.newItem = {};
//     });
//   }

//   editItem(item: any): void {
//     // Implement edit logic here
//   }

//   deleteItem(itemId: number): void {
//     const url = this.apiUrl + `/api/items/${itemId}`;
//     this.http.delete(url).subscribe(() => {
//       this.getItems();
//     });
//   }
//   confirmDelete(itemId: number): void {
//     const confirmation = confirm('Bạn có chắc muốn xóa mục này?');
//     if (confirmation) {
//       this.deleteItem(itemId);
//     }
//   }
// }
export class ItemListComponent implements OnInit {
  items: any[] = [];
  editedItem: any = {};
  isEditing: boolean = false;
  editItemId: number | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  public apiUrl = 'http://localhost:3000';
  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    const url = this.apiUrl + '/api/items';
    this.http.get(url).subscribe((data: any) => {
      this.items = data;
    });
  }

  saveItem(): void {
    const url = this.apiUrl + '/api/items';
    if (this.isEditing) {
      this.http
        .put(`${url}/${this.editItemId}`, this.editedItem)
        .subscribe(() => {
          this.isEditing = false;
          this.editItemId = null;
          this.getItems();
          this.editedItem = {};
        });
    } else {
      this.http.post(url, this.editedItem).subscribe(() => {
        this.getItems();
        this.editedItem = {};
      });
    }
  }

  editItem(item: any): void {
    this.isEditing = true;
    this.editItemId = item.id;
    this.editedItem = { ...item };
  }

  confirmDelete(itemId: number): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.http.delete(`/api/items/${itemId}`).subscribe(() => {
        this.getItems();
      });
    }
  }
}