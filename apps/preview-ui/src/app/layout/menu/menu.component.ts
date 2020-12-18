import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { CommandProviderService } from '../../shared/command/services/command-provider.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DontCodeModel } from '@dontcode/core';
import { Router } from "@angular/router";

@Component({
  selector: 'preview-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {

  menus:Array<any>;
  dynamicMenu:Array<any>;
  unsubscriber = new Subject();

  constructor(protected provider: CommandProviderService,
              private ref: ChangeDetectorRef, public router: Router,
              public ngZone:NgZone) { }

  ngOnInit(): void {
    this.menus =[
      {label:'Main Menu', items:[
        {label:'Home', icon:'pi pi-home', routerLink:['/']},
        {label:'Dev', icon:'pi pi-book', routerLink: ['dev']}
    ]},
      {label:'Application Menu', items:this.dynamicMenu}
    ];
    this.provider.receiveCommands (DontCodeModel.APP_ENTITIES, DontCodeModel.APP_ENTITIES_NAME_NODE).pipe(
      takeUntil(this.unsubscriber)).subscribe(command => {
        //this.menus.set(command.position, new MenuComponentMenu (command.position, command.value, 'create'));
        this.dynamicMenu.push({
          url:command.position,
          label:command.value,
          icon:'pi pi-ticket'
        });
        this.ref.detectChanges();
    });
    this.provider.receiveCommands (DontCodeModel.APP_SCREENS, DontCodeModel.APP_SCREENS_NAME_NODE).pipe(
      takeUntil(this.unsubscriber)).subscribe(command => {
        //this.menus.set(command.position, new MenuComponentMenu (command.position, command.value, 'filter'));
      this.dynamicMenu.push({
        url:command.position,
        label:command.value,
        icon:'pi pi-desktop'
      });
      this.ref.detectChanges();
    })


  }

  ngOnDestroy(): void {
    // unsubscribe to all observables
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  gotoPage(page:string): void {
    // ngZone is necessary as we are being called by a non angular component (kor-ui)
    this.ngZone.run (() => {
      this.router.navigate([page]);
    })
  }

  isActive(page:string):boolean {
    const ret = this.router.isActive(page, true);
//    console.log(page +' is active:'+ret);
    return ret;
  }

  gotoItem(menu: MenuComponentMenu) {
    // ngZone is necessary as we are being called by a non angular component (kor-ui)
    this.ngZone.run (() => {
      this.router.navigate([menu.position]);
    });
  }
}

export class MenuComponentMenu {
  position:string;
  key:string;
  label:string;
  icon:string;


  constructor(position: string, label: any, icon?: string) {
    position = this.cleanPosition (position);
    this.position = position;
    this.key = position.split('/').join('-');
    this.label = label.name?label.name:label;
    if (icon) {
      this.icon = icon;
    } else {
      this.icon = 'text_snippet';
    }
  }

  private cleanPosition(position: string): string {
/*    if (position.startsWith(DontCodeModel.ROOT))
      position = position.substr(DontCodeModel.ROOT.length+1);*/

    if (position.endsWith(DontCodeModel.APP_SCREENS_NAME_NODE))
    {
      position = position.substring(0, position.length-DontCodeModel.APP_SCREENS_NAME_NODE.length-1);
    }
    return position;
  }
}
