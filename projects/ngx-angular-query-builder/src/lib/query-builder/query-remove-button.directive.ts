import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[queryRemoveButton]",
    standalone: false
})
export class QueryRemoveButtonDirective {
  constructor(public template: TemplateRef<any>) {}
}
