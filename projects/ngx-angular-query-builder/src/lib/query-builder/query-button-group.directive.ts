import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryButtonGroup]",
    standalone: false
})
export class QueryButtonGroupDirective {
  constructor(public template: TemplateRef<any>) {}
}
