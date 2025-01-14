import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl } from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";

import {
  QueryBuilderClassNames,
  QueryBuilderConfig
} from "projects/ngx-angular-query-builder/src/public-api";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    standalone: false
})
export class AppComponent {
  public queryCtrl: UntypedFormControl;

  public bootstrapClassNames: QueryBuilderClassNames = {
    removeIcon: "fa fa-minus",
    addIcon: "fa fa-plus",
    arrowIcon: "fa fa-chevron-right px-2",
    button: "btn",
    buttonGroup: "btn-group",
    rightAlign: "order-12 ml-auto",
    switchRow: "d-flex px-2",
    switchGroup: "d-flex align-items-center",
    switchRadio: "custom-control-input",
    switchLabel: "custom-control-label",
    switchControl: "custom-control custom-radio custom-control-inline",
    row: "row p-2 m-1",
    rule: "border",
    ruleSet: "border",
    invalidRuleSet: "alert alert-danger",
    emptyWarning: "text-danger mx-auto",
    operatorControl: "form-control",
    operatorControlSize: "col-auto pr-0",
    fieldControl: "form-control",
    fieldControlSize: "col-auto pr-0",
    entityControl: "form-control",
    entityControlSize: "col-auto pr-0",
    inputControl: "form-control",
    inputControlSize: "col-auto"
  };

  public query = {
    condition: "and",
    rules: [
      { field: "age", operator: "<=", entity: "physical" },
      {
        field: "birthday",
        operator: "=",
        value: new Date(),
        entity: "nonphysical"
      },
      {
        condition: "or",
        rules: [
          { field: "gender", operator: "=", entity: "physical" },
          { field: "occupation", operator: "in", entity: "nonphysical" },
          { field: "school", operator: "is null", entity: "nonphysical" },
          { field: "notes", operator: "=", entity: "nonphysical" }
        ]
      }
    ]
  };

  public entityConfig: QueryBuilderConfig = {
    entities: {
      physical: { name: "Physical Attributes" },
      nonphysical: { name: "Nonphysical Attributes" }
    },
    fields: {
      age: { name: "Age", type: "number", entity: "physical" },
      gender: {
        name: "Gender",
        entity: "physical",
        type: "category",
        options: [
          { name: "Male", value: "m" },
          { name: "Female", value: "f" }
        ]
      },
      name: { name: "Name", type: "string", entity: "nonphysical" },
      notes: {
        name: "Notes",
        type: "textarea",
        operators: ["=", "!="],
        entity: "nonphysical"
      },
      educated: {
        name: "College Degree?",
        type: "boolean",
        entity: "nonphysical"
      },
      birthday: {
        name: "Birthday",
        type: "date",
        operators: ["=", "<=", ">"],
        defaultValue: () => new Date(),
        entity: "nonphysical"
      },
      school: {
        name: "School",
        type: "string",
        nullable: true,
        entity: "nonphysical"
      },
      occupation: {
        name: "Occupation",
        entity: "nonphysical",
        type: "category",
        options: [
          { name: "Student", value: "student" },
          { name: "Teacher", value: "teacher" },
          { name: "Unemployed", value: "unemployed" },
          { name: "Scientist", value: "scientist" }
        ]
      }
    }
  };

  public config: QueryBuilderConfig = {
    fields: {
      age: { name: "Age", type: "number" },
      gender: {
        name: "Gender",
        type: "category",
        options: [
          { name: "Male", value: "m" },
          { name: "Female", value: "f" }
        ]
      },
      name: { name: "Name", type: "string" },
      notes: { name: "Notes", type: "textarea", operators: ["=", "!="] },
      educated: { name: "College Degree?", type: "boolean" },
      birthday: {
        name: "Birthday",
        type: "date",
        operators: ["=", "<=", ">"],
        defaultValue: () => new Date()
      },
      school: { name: "School", type: "string", nullable: true },
      occupation: {
        name: "Occupation",
        type: "category",
        options: [
          { name: "Student", value: "student" },
          { name: "Teacher", value: "teacher" },
          { name: "Unemployed", value: "unemployed" },
          { name: "Scientist", value: "scientist" }
        ]
      }
    }
  };

  public currentConfig: QueryBuilderConfig;
  public allowRuleset: boolean = true;
  public allowCollapse!: boolean;
  public persistValueOnFieldChange: boolean = false;
  appearance: MatFormFieldAppearance = "outline";

  constructor(private formBuilder: UntypedFormBuilder) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.config;
  }

  switchModes(event: Event) {
    this.currentConfig = (<HTMLInputElement>event.target).checked ? this.entityConfig : this.config;
  }

  changeDisabled(event: Event) {
    (<HTMLInputElement>event.target).checked ? this.queryCtrl.disable() : this.queryCtrl.enable();
  }
}
