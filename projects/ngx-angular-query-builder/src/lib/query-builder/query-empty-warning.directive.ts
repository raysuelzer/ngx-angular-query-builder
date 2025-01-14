import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryEmptyWarning]",
    standalone: false
})
export class QueryEmptyWarningDirective {
  constructor(public template: TemplateRef<any>) {}
}
