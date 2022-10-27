# NgxAngularQueryBuilder

The goal of this project is to enable Angular 12+ support for the original [angular2-query-builder](https://github.com/zebzhao/Angular-QueryBuilder). It is *not* production ready. This project may not be maintained. Should the original project become active again, this library may be abandoned.

This project uses code from https://github.com/designermanjeets/Angular-QueryBuilder a fork of https://github.com/zebzhao/Angular-QueryBuilder both developed under the MIT License.

# Versions

Use the following versions depending upon your angular version

Angular 12 & 13 - Versions ^0.0.5
Angular 13 - Versions 13.x.x
Angular 14 - Versions 14.x.x

# Examples

npm install ngx-angular-query-builder

## Basic Usage

##### `app.module.ts`
```javascript
import { NgxAngularQueryBuilderModule } from "ngx-angular-query-builder";
import { AppComponent } from "./app.component"

@NgModule(imports: [
  ...,
  NgxAngularQueryBuilderModule,
])
export class AppModule { }
```

##### `app.component.html`
```html
...
<query-builder [(ngModel)]='query' [config]='config'></query-builder>
...
```
##### `app.component.ts`
```javascript
import { QueryBuilderConfig } from 'ngx-angular-query-builder';

export class AppComponent {
  query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', value: 'Bob'},
      {field: 'gender', operator: '>=', value: 'm'}
    ]
  };

  config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      }
    }
  }
}
```

## Custom Input Components

##### `app.component.html`
```html
<query-builder [(ngModel)]='query' [config]='config'>
  <ng-container *queryInput="let rule; type: 'date'">
    <custom-datepicker [(ngModel)]="rule.value"></custom-datepicker>
  </ng-container>
</query-builder>
```

##### `app.component.ts`
```javascript
query = {
  condition: 'and',
  rules: [
    {field: 'birthday', operator: '=', value: new Date()}
  ]
};

config: QueryBuilderConfig = {
  fields: {
    birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>']
      defaultValue: (() => return new Date())
    },
  }
}
```

## Custom Styling (with Bootstrap 4)

[Bootstrap demo](https://zebzhao.github.io/Angular-QueryBuilder/demo/).

##### `app.component.html`
```html
<query-builder [(ngModel)]='query' [config]='config' [classNames]='classNames'></query-builder>
```
##### `app.component.ts`
```javascript
classNames: QueryBuilderClassNames = {
  removeIcon: 'fa fa-minus',
  addIcon: 'fa fa-plus',
  arrowIcon: 'fa fa-chevron-right px-2',
  button: 'btn',
  buttonGroup: 'btn-group',
  rightAlign: 'order-12 ml-auto',
  switchRow: 'd-flex px-2',
  switchGroup: 'd-flex align-items-center',
  switchRadio: 'custom-control-input',
  switchLabel: 'custom-control-label',
  switchControl: 'custom-control custom-radio custom-control-inline',
  row: 'row p-2 m-1',
  rule: 'border',
  ruleSet: 'border',
  invalidRuleSet: 'alert alert-danger',
  emptyWarning: 'text-danger mx-auto',
  operatorControl: 'form-control',
  operatorControlSize: 'col-auto pr-0',
  fieldControl: 'form-control',
  fieldControlSize: 'col-auto pr-0',
  entityControl: 'form-control',
  entityControlSize: 'col-auto pr-0',
  inputControl: 'form-control',
  inputControlSize: 'col-auto'
}
```

## Customizing with Angular Material

Example of how you can completely customize the query component with another library like Angular Material. For the full example, please look at the [source code](https://github.com/zebzhao/Angular-QueryBuilder/blob/master/demo/src/app/app.component.ts) provided in the demo.

#### `app.component.html`

```html
<query-builder [(ngModel)]='query' [config]='config'>
  <ng-container *queryButtonGroup="let ruleset; let addRule=addRule; let addRuleSet=addRuleSet; let removeRuleSet=removeRuleSet">
    <button type="button" mat-button (click)="addRule()">+ Rule</button>
    <button type="button" mat-button (click)="addRuleSet()">+ Ruleset</button>
    <button type="button" mat-button (click)="removeRuleSet()">- Ruleset</button>
  </ng-container>
  <ng-container *queryRemoveButton="let rule; let removeRule=removeRule">
    <button type="button" mat-icon-button color="accent" (click)="removeRule(rule)">
      <mat-icon>remove</mat-icon>
    </button>
  </ng-container>
  <ng-container *querySwitchGroup="let ruleset">
    <mat-radio-group *ngIf="ruleset" [(ngModel)]="ruleset.condition">
      <mat-radio-button value="and">And</mat-radio-button>
      <mat-radio-button value="or">Or</mat-radio-button>
    </mat-radio-group>
  </ng-container>
  <ng-container *queryField="let rule; let fields=fields; let onChange=onChange">
    <mat-form-field>
      <mat-select [(ngModel)]="rule.field" (ngModelChange)="onChange($event, rule)">
        <mat-option *ngFor="let field of fields" [value]="field.value">{{field.name}}</mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  <ng-container *queryOperator="let rule; let operators=operators">
    <mat-form-field>
      <mat-select [(ngModel)]="rule.operator">
        <mat-option *ngFor="let value of operators" [value]="value">{{value}}</mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  <!-- Override input component for 'boolean' type -->
  <ng-container *queryInput="let rule; type: 'boolean'">
    <mat-checkbox [(ngModel)]="rule.value"></mat-checkbox>
  </ng-container>
  <!-- Override input component for 'category' type -->
  <ng-container *queryInput="let rule; let field=field; let options=options; type: 'category'">
    <mat-form-field>
      <mat-select [(ngModel)]="rule.value" [placeholder]="field.name">
        <mat-option *ngFor="let opt of options" [value]="opt.value">
          {{ opt.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  ...
</query-builder>
```

## Property Bindings Quick Reference

See [documentation](https://zebzhao.github.io/Angular-QueryBuilder/) for more details on interfaces and properties.

#### `query-builder`
|Name|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`allowRuleset`|`boolean`|Optional|`true`| Displays the `+ Ruleset` button if `true`. |
|`allowCollapse`|`boolean`|Optional|`false`| Enables collapsible rule sets if `true`. ([See Demo](https://zebzhao.github.io/Angular-QueryBuilder/demo/)) |
|`classNames`|`object`|Optional|| CSS class names for different child elements in `query-builder` component. |
|`config`|`QueryBuilderConfig`|Required|| Configuration object for the main component. |
|`data`|`Ruleset`|Optional|| (Use `ngModel` or `value` instead.) |
|`emptyMessage`|`string`|Optional|| Message to display for an empty Ruleset if empty rulesets are not allowed. |
|`ngModel`| `Ruleset` |Optional|| Object that stores the state of the component. Supports 2-way binding. |
|`operatorMap`|`{ [key: string]: string[] }`|Optional|| Used to map field types to list of operators. |
|`persistValueOnFieldChange`|`boolean`|Optional|`false`| If `true`, when a field changes to another of the same type, and the type is one of: string, number, time, date, or boolean, persist the previous value. This option is ignored if config.calculateFieldChangeValue is provided. |
|`config.calculateFieldChangeValue`|`(currentField: Field, nextField: Field, currentValue: any) => any`|Optional|| Used to calculate the new value when a rule's field changes. |
|`value`| `Ruleset` |Optional|| Object that stores the state of the component. |

## Structural Directives

Use these directives to replace different parts of query builder with custom components. See [example](#customizing-with-angular-material), or [demo](https://zebzhao.github.io/Angular-QueryBuilder/demo/) to see how it's done.

#### `queryInput`

Used to replace the input component. Specify the type/queryInputType to match specific field types to input template.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`Rule`|Current rule object which contains the field, value, and operator|
|`field`|`Field`|Current field object which contains the field's value and name|
|`options`|`Option[]`|List of options for the field, returned by `getOptions`|
|`onChange`|`() => void`|Callback to handle changes to the input component|

#### `queryOperator`

Used to replace the query operator selection component.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`Rule`|Current rule object which contains the field, value, and operator|
|`operators`|`string[]`|List of operators for the field, returned by `getOperators`|
|`onChange`|`() => void`|Callback to handle changes to the operator component|
|`type`|`string`|Input binding specifying the field type mapped to this input template, specified using syntax in above example|

#### `queryField`

Used this directive to replace the query field selection component.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`Rule`|Current rule object which contains the field, value, and operator|
|`getFields`|`(entityName: string) => void`|Get the list of fields corresponding to an entity|
|`fields`|`Field[]`|List of fields for the component, specified by `config`|
|`onChange`|`(fieldValue: string, rule: Rule) => void`|Callback to handle changes to the field component|

#### `queryEntity`

Used to replace entity selection component.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`Rule`|Current rule object which contains the field, value, and operator|
|`entities`|`Entity[]`|List of entities for the component, specified by `config`|
|`onChange`|`(entityValue: string, rule: Rule) => void`|Callback to handle changes to the entity component|

#### `querySwitchGroup`

Useful for replacing the switch controls, for example the AND/OR conditions. More custom conditions can be specified by using this directive to override the default component.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`RuleSet`|Current rule set object which contain a list of child rules|
|`onChange`|`() => void`|Callback to handle changes to the switch group component|

#### `queryArrowIcon`

Directive to replace the expand arrow used in collapse/accordion mode of the query builder.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`RuleSet`|Current rule set object which contain a list of child rules|

#### `queryEmptyWarning`

Can be used to customize the default empty warning message, alternatively can specify the `emptyMessage` property binding.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`RuleSet`|Current rule set object which contain a list of child rules|
|`message`|`string`|Value passed to `emptyMessage`|

#### `queryButtonGroup`

For replacing the default button group for Add, Add Ruleset, Remove Ruleset buttons.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`RuleSet`|Current rule set object which contain a list of child rules|
|`addRule`|`() => void`|Function to handle adding a new rule|
|`addRuleSet`|`() => void`|Function to handle adding a new rule set|
|`removeRuleSet`|`() => void`|Function to handle removing the current rule set|

#### `queryRemoveButton`

Directive to replace the default remove single rule button component.

|Context Name|Type|Description|
|:--- |:--- |:--- |
|`$implicit`|`Rule`|Current rule object which contains the field, value, and operator|
|`removeRule`|`(rule: Rule) => void`|Function to handle removing a rule|

## Dependencies
- Angular 12+



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

