import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Cofee } from '../helpers/models/cofee';
import { ColumnItem } from '../helpers/models/table-colums';
import { CofeeService } from '../helpers/cofee.service';
import { Route, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  cofees: Cofee[] = [];
  cofeeToEdit: any = null;

  listOfColumns: ColumnItem[] = [];
  isModalVisible = false;
  isNew: boolean = false;
  isLoading : boolean = true;
  showEdit: boolean = false;
  inputValue: string ="";
  filteredOptions: string[] = [];
  options: string[] = [];

  constructor(private cofeeService: CofeeService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(){

    this.getListOfCofees();
    this.listOfColumns = [
      {
      name: 'Picture',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      },
      {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Cofee, b: Cofee) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Description',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
      },
      {
      name: 'Region',
      sortOrder: null,
      sortFn: (a: Cofee, b: Cofee) => a.region.localeCompare(b.region),
      sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Price',
        sortOrder: null,
        sortFn: (a: Cofee, b: Cofee) => a.price - b.price,
        sortDirections: ['ascend', 'descend', null],
        },
        {
          name: '',
          sortOrder: null,
          sortFn: null,
          sortDirections: [null],
        },
    ];
    };

 getListOfCofees() {
   console.log("Get List of Cofees");
   this.cofeeService.getListOfCofees().subscribe({
     next: (res) => {
       console.log("Data received:", res);
       this.cofees = res;
       this.isLoading = false;
       this.filteredOptions = this.cofees.map(coffee => coffee.name);
       this.options = this.cofees.map(coffee => coffee.name);
     },
     error: (err) => {
       console.log("Error fetching data:", err);
       this.isLoading = false;
     }
   });
 }


  deleteCofee(id: number) {
    console.log("Delete Cofee ");

    // Call delete method with the coffee ID
    this.cofeeService.DeleteCofee(id).subscribe({
      next: () => {
        console.log("Cofee Deleted");
        // Update the list of coffees by removing the deleted coffee
        this.cofees = this.cofees.filter(coffee => coffee.id !== id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  editCofee(id: number){
    this.cofeeToEdit = this.cofees.find(coffee => coffee.id === id);
    console.log("Edit Cofee" + this.cofeeToEdit.name);
    this.showEdit = true;
  }

  cofeeInformationModal(id: number){
    this.cofeeToEdit = this.cofees.find(coffee => coffee.id === id);
    this.isModalVisible = true;
  }

  AddNewCofee(){
    console.log("Add New Cofee");
    this.cofeeToEdit = {
      _id: this.cofees.length + 1,
      id: this.cofees.length + 1,
      name: '',
      description: '',
      region: '',
      price: 0,
      flavor_profile: [],
      grind_option: [],
      roast_level: 0,
      image_url: '',
      weight: 0,
    };
    this.isNew = true;
    this.showEdit = true;
  }

  onChange(value: string): void {
    this.options = this.cofees.map(coffee => coffee.name);
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
    this.inputValue = value;
    const selectedCofee = this.cofees.find(coffee => coffee.name === value);

    if(selectedCofee)
      {
       this.cofees = this.cofees.filter(cofee => cofee.name != value);
        this.cofees.unshift(selectedCofee);
        console.log("Cofees " + this.cofees[0].name);
        this.cdr.detectChanges();
        this.inputValue = "";
      }

  }

  OnEditCofee(updatedcofee: Cofee ){
    console.log("Save " + updatedcofee.name);
    this.cofeeService.UpdateCofee(updatedcofee).subscribe({
      next: (res) => {
        console.log("Cofee Updated");
        this.cofees[this.cofees.findIndex(coffee => coffee.id === updatedcofee.id)] = updatedcofee;
        this.hideEditTable();
      },
      error: (err) => {
        console.log(err);
        this.hideEditTable();
      }
    });
  }

  OnAddCofee(newcofee: Cofee){
    console.log("Add " + newcofee.name);
    this.cofeeService.AddCofee(newcofee).subscribe({
      next: (res) => {
        console.log("Cofee Added");
        this.hideEditTable();
      },
      error: (err) => {
        console.log(err);
        this.hideEditTable();
      }
    });
  }

  hideEditTable() {
    this.showEdit = false;
    this.cofeeToEdit = null;
    this.isNew = false;
    console.log("Hide Edit Table");
  }

  hideCofeeInformationModal(){
    this.isModalVisible = false;
  }

  sort(order: any, key: string): void {
    // Implement sorting logic here based on 'order' and 'key'
    console.log(`Sorting ${key} in ${order} order`);
    if (order === 'ascend') {
      if(key === 'name')
        this.cofees.sort((a, b) => (a.name > b.name) ? 1 : -1);
      else if(key === 'price')
        this.cofees.sort((a, b) => (a.price > b.price) ? 1 : -1);
      else if(key === 'region')
        this.cofees.sort((a, b) => (a.region > b.region) ? 1 : -1);
      else if(key === 'weight')
        this.cofees.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
      else if(key === 'roast_level')
        this.cofees.sort((a, b) => (a.roast_level > b.roast_level) ? 1 : -1);
    }
    else
    {
      if(key === 'name')
        this.cofees.sort((a, b) => (a.name < b.name) ? 1 : -1);
      else if(key === 'price')
        this.cofees.sort((a, b) => (a.price < b.price) ? 1 : -1);
      else if(key === 'region')
        this.cofees.sort((a, b) => (a.region < b.region) ? 1 : -1);
      else if(key === 'weight')
        this.cofees.sort((a, b) => (a.weight < b.weight) ? 1 : -1);
      else if(key === 'roast_level')
        this.cofees.sort((a, b) => (a.roast_level < b.roast_level) ? 1 : -1);
    }
  }

}
