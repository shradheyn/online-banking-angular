import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-newaccount',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './newaccount.component.html',
  styleUrl: './newaccount.component.css'
})
export class NewaccountComponent implements OnInit{
  accountForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      // Personal Details
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      aadhar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      dob: ['', Validators.required],

      // Residential Address
      residentialAddress: this.fb.group({
        line1: ['', Validators.required],
        line2: [''],
        landmark: [''],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
      }),

      // Checkbox to copy address
      sameAsResidential: [false],

      // Permanent Address
      permanentAddress: this.fb.group({
        line1: ['', Validators.required],
        line2: [''],
        landmark: [''],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
      }),

      // Occupation Details
      occupationType: ['', Validators.required],
      sourceOfIncome: ['', Validators.required],
      grossIncome: ['', Validators.required],

      // Banking Options
      debitCard: [false],
      netBanking: [false],
      agree: [false, Validators.requiredTrue]
    });

    // Sync permanent address with residential when checkbox checked
    this.accountForm.get('sameAsResidential')?.valueChanges.subscribe((checked) => {
      const residential = this.accountForm.get('residentialAddress')?.value;
      const permanentGroup = this.accountForm.get('permanentAddress') as FormGroup;

      if (checked) {
        permanentGroup.patchValue(residential);
        permanentGroup.disable();  // prevent editing when same as residential
      } else {
        permanentGroup.enable();
      }
    });
  }

  // Getters for form controls
  get f() {
    return this.accountForm.controls;
  }

  get residentialControls() {
    return (this.accountForm.get('residentialAddress') as FormGroup).controls;
  }

  get permanentControls() {
    return (this.accountForm.get('permanentAddress') as FormGroup).controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.accountForm.invalid) {
      return;
    }

    console.log('Form Data:', this.accountForm.value);
    this.successMessage = '✅ Account Registered Successfully';

    // Optional: navigate after success (uncomment if needed)
    // this.router.navigate(['/dashboard']);

    // Reset form after 3 seconds
    setTimeout(() => {
      this.accountForm.reset();
      this.submitted = false;
      this.successMessage = '';
    }, 3000);
  }

}
