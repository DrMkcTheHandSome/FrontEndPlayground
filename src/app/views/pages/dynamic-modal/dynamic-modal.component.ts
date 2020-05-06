import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DeviceTypeMockData, LocationMockData,IndustryMockData,ClientTypeMockData,UserTypeMockData}  from '../reclaim-unit-inquiry/mock-data';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { UnitInquiryService } from '../services/unit-inquiry-service';
import { DeviceTypeService } from '../services/device-type-service';
import { IndustryService } from '../services/industry-service';
import { LocationService } from '../services/location-service';
import { UserTypeService } from '../services/user-type-service';
import { ClientTypeService } from '../services/client-type-service';
import { ProgressService } from '../services/progress-service';
import {ErrorKeys, ErrorValidators} from '../shared/enums/errors';
import {ValidateUpperCase}  from '../shared/form-validation/form-validator';
import { Mode } from '../shared/enums/mode';

@Component({
  selector: 'kt-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent implements OnInit {
deviceTypes = Array<string>();
dynamicFormGroup: FormGroup;
industries = Array<string>();
locations = Array<string>();
clientTypes = Array<string>();
userTypes = Array<string>();
formGroupObject = {};
error: Array<any> = new Array<any>();
errorObject = {};
cloneData: any;


  constructor(public dialogRef: MatDialogRef<DynamicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private unitInquiryService: UnitInquiryService,private deviceTypeService: DeviceTypeService,
    private industryService: IndustryService, private locationService:  LocationService
    , private userTypeService:  UserTypeService, private clientTypeService:  ClientTypeService, private progressService: ProgressService,
    private fb: FormBuilder)
     { }

  ngOnInit() {
    this.onInitFormGroup(this.data);
  }

  onInitFormGroup(data:any){
    if(data.mode == Mode.Update){
     this.cloneData = this.deepClone(this.data.rowData)
    }

    this.loadUnitDeploymentInquiryData(data);

    data.columnData.types.map(column => {
      this.formGroupObject[column.name] =  this.convertToNewFormControl(column);
             });

this.dynamicFormGroup = new FormGroup(this.formGroupObject);
   this.validateForm();
  }

  validateForm(){
    this.getFormValidationErrors();

    this.dynamicFormGroup.valueChanges.subscribe(selectedValue => {
       this.getFormValidationErrors();
       });
  }

  getFormValidationErrors() {
    Object.keys(this.dynamicFormGroup.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dynamicFormGroup.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            let errorKey = key;
            let errorMessage = this.fetchErrorMessage(keyError,key,controlErrors[keyError]);
            this.addErrorMessage(errorKey,errorMessage);
          });
        }
        if(controlErrors == null){
          this.removeErrorMessage(key);
        }
      });
    }


  removeErrorMessage(keyValue: string){
  this.errorObject[keyValue] = "";
}
 deepClone(src) {
  return JSON.parse(JSON.stringify(src));
}
addErrorMessage(errorKey: string, errorMessage: string){
  this.errorObject[errorKey] = errorMessage;
}
validateIfExisiting(newErrorKey: any, errorList: any, keys: any){
  let isExist = false;
  errorList.forEach(errors => {
    let listOfKeys = Object.keys(errors)
    listOfKeys.forEach(key => {
      if(key == newErrorKey)
          isExist = true;
    })
  })
  return isExist;
}
validateTheErrorLength(){
  if(this.error.length > 0)
     return true
  else
    return false
}
convertToNewFormControl(column: any){
  let formValue: any;

  if(this.data.mode == Mode.Update){
    formValue = this.data.rowData[column.name]
  }
  if(this.data.mode == Mode.Create){
    formValue = this.retriveCreateFormDefaultValues(column.type)
  }

  let newFormControl = new FormControl(formValue, { validators: this.retrieveArrayOfValidators(column.validator)});
  return newFormControl;
}

retriveCreateFormDefaultValues(columnType:string){
  switch(columnType) { 
  case "number": {
    return 0;
  }
  case "toggle": {
    return true;
  }
    default:{
      return ""; 
    }
  }
}
 retrieveArrayOfValidators(validators: Array<any>) {
 let formValidations = [];
 if(validators != undefined){
  validators.map(validator => {
    let constraint =  this.retrieveValidator(validator);
    if(constraint != null){
     formValidations.push(constraint)
    }
  });
 }
 return formValidations;
}

 retrieveValidator(validator: any)
 {
  if (validator==ErrorValidators.ValidatorRequired){
    return Validators.required;
    }
   if (validator.startsWith(ErrorValidators.ValidatorMaxLength))
    {
    let value = this.splitValues(validator);
   return Validators.maxLength(value)
    }
    if (validator.startsWith(ErrorValidators.ValidatorMinLength))
    {
    let value= this.splitValues(validator);
   return Validators.minLength(value)
    } 
   
     if (validator.startsWith(ErrorValidators.ValidatorMininumNumber))
    {
    let value =this.splitValues(validator);
   return Validators.min(value)
    } 
    if (validator==ErrorValidators.ValidateUpperCase)
    {
      return ValidateUpperCase
    } 
  
 }

 splitValues(validator: any){
   return +(validator.split('(')[1].split(')')[0])
 }
 
  submitForm() {
    let formGroupValues = {};
    if(this.data.mode == Mode.Update){
      formGroupValues = {"previousValues": this.cloneData, "newValues": this.dynamicFormGroup.value}
    }
    if(this.data.mode == Mode.Create){
      formGroupValues = this.dynamicFormGroup.value;
    }
    this.dialogRef.close(formGroupValues);
    }

  onNoClick(): void {  
    this.dialogRef.close(this.data);
    }
    
    loadUnitDeploymentInquiryData(UnitInquiryData: any){
      if(UnitInquiryData.columnData.tableName == "UnitDeploymentInquiry"){
        this.loadBuildUpData();
        UnitInquiryData.columnData.types.map(type => {
           if(UnitInquiryData.mode == Mode.Update){
            type.currentdata = this.fetchCurrentData(type.type,UnitInquiryData.rowData[type.name]);
           }
              type.array = this.fetchArrayData(type.name);
           });
         }
      }

    fetchErrorMessage(key: string, name: string, errorValue: any){
      switch(key) { 
        case ErrorKeys.Required: { 
          return `${name} is required`;
        } 
        case ErrorKeys.MaxLength: { 
          return `maximum length of ${name} is ${errorValue.requiredLength}`;
        } 
        case ErrorKeys.MinLength: { 
          return `minimum length of ${name} is ${errorValue.requiredLength}`;
        } 
        case ErrorKeys.MinimumNumber: { 
          return `minimum  ${name} is ${errorValue.min}`;
        } 
        case ErrorKeys.Uppercase: { 
          return `${name} must be upper case`;
        } 
        default: { 
          return  ""; 
        } 
      }
    }

  
    fetchCurrentData(type: string, value: string){
      switch(type) { 
        case "select": { 
          return value;
        } 
        default: { 
          return  ""; 
        } 
      }
    }
    fetchArrayData(columnName: string){
      switch(columnName) { 
        case "devicetype": { 
          return this.deviceTypes;
        } 
        case "location": { 
          return this.locations;
        } 
        case "industry": { 
          return this.industries;
       } 
       case "clienttype": { 
        return this.clientTypes;
       } 
        case "usertype": { 
        return this.userTypes;
        } 
        default: { 
          return  new Array<string>(); 
        } 
     } 
    }
    loadBuildUpData(){
      this.deviceTypeService.fetchDeviceTypeMockData().subscribe(deviceTypeMockData => {
        this.fetchDeviceTypeData(deviceTypeMockData);  
      },
      err =>
       {
        this.progressService.unblockUi();
      });
      this.locationService.fetchLocationMockData().subscribe(locationMockData => {
        this.fetchLocationData(locationMockData);
       },
      err =>
       {
        this.progressService.unblockUi();
      });
      this.industryService.fetchIndustryMockData().subscribe(industryMockData => {
        this.fetchIndustryData(industryMockData);
      },
      err =>
       {
        this.progressService.unblockUi();
      });
      this.clientTypeService.fetchClientTypeMockData().subscribe(clientTypeMockData => {
        this.fetchClientTypeData(clientTypeMockData);
      },
      err =>
       {
        this.progressService.unblockUi();
      });
      this.userTypeService.fetchUserTypeMockData().subscribe(userTypeMockData => {
        this.fetchUserTypeData(userTypeMockData);
      },
      err =>
       {
        this.progressService.unblockUi();
      });
    }
    fetchDeviceTypeData(deviceTypeMockData: any){
        deviceTypeMockData.data.map(deviceType => {
          if(deviceType.isactive){
            this.deviceTypes.push(deviceType.name);
          }
        });
    } 
    fetchLocationData(locationMockData: any){
      locationMockData.data.map(location => {
        if(location.isactive){
          this.locations.push(location.name);
        }
      });
    }
    fetchIndustryData(industryMockData: any){
      industryMockData.data.map(industry => {
        if(industry.isactive){
          this.industries.push(industry.name);
        }
      });
    }  
    fetchClientTypeData(clientTypeMockData: any){
      clientTypeMockData.data.map(clienttype => {
        if(clienttype.isactive){
          this.clientTypes.push(clienttype.name);
        }
      });
    }  
    fetchUserTypeData(userTypeMockData: any){
      userTypeMockData.data.map(usertype => {
        if(usertype.isactive){
          this.userTypes.push(usertype.name);
        }
      });
    }  
}
