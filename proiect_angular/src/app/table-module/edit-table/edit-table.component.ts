import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cofee } from '../helpers/models/cofee';
import { LetterValidator} from '../helpers/cofee.forms';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {
  @Input() cofee: Cofee = {
    _id: '',
    id: 0,
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
  @Input() isNew: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Cofee>();
  @Output() add = new EventEmitter<Cofee>();

  cofeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCofeeForm();
  }

  createCofeeForm(): void {
    this.cofeeForm = this.formBuilder.group({
      id: [this.cofee.id],
      _id: [this.cofee._id],
      name: [
        this.cofee.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          LetterValidator,
        ],
      ],
      description: [
        this.cofee.description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(400),
        ],
      ],
      region: [
        this.cofee.region,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          LetterValidator,
        ],
      ],
      price: [
        this.cofee.price,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10000),
        ],
      ],

      weight:[ this.cofee.weight,],
      flavor_profile: [this.cofee.flavor_profile],
      grind_option: [this.cofee.grind_option],
      roast_level: [this.cofee.roast_level],
      image_url: [this.cofee.image_url],
    });
  }

  Close(): void {
    console.log('Cancel');
    this.close.emit();
  }

  Save(): void {
    if (this.isNew) {
      console.log('Add'+this.cofeeForm.value.name);
      this.add.emit(this.cofeeForm.value);
    } else {
      console.log('Save'+this.cofeeForm.value.name);
      this.save.emit(this.cofeeForm.value);
    }
  }
}
