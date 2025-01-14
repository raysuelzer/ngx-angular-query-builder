import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryOperator]",
    standalone: false
})
export class QueryOperatorDirective {
  constructor(public template: TemplateRef<any>) {}
}
