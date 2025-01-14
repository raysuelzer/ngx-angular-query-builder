import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryArrowIcon]",
    standalone: false
})
export class QueryArrowIconDirective {
  constructor(public template: TemplateRef<any>) {}
}
