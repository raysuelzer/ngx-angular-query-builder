import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[querySwitchGroup]",
    standalone: false
})
export class QuerySwitchGroupDirective {
  constructor(public template: TemplateRef<any>) {}
}
