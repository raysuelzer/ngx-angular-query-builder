import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryEntity]",
    standalone: false
})
export class QueryEntityDirective {
  constructor(public template: TemplateRef<any>) {}
}
