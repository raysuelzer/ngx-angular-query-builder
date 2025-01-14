import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryField]",
    standalone: false
})
export class QueryFieldDirective {
  constructor(public template: TemplateRef<any>) {}
}
