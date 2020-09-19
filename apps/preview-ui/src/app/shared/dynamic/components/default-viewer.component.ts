import { PreviewHandler, CommandProviderInterface, DontCodeModelPointer } from "@dontcode/core";
import { Component, OnInit, ChangeDetectionStrategy, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandProviderService } from '../../command/services/command-provider.service';
import { DynamicBaseComponent } from './dynamic-base.component';

@Component({
  selector: 'preview-ui-default-viewer',
  templateUrl: './default-viewer.component.html',
  styleUrls: ['./default-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultViewerComponent implements OnInit, PreviewHandler {

  position: string;
  schemaPosition: string;

  constructor() {
    }


  ngOnInit(): void {
  }

  initCommandFlow(provider: CommandProviderInterface, pointer:DontCodeModelPointer) {
    this.position = pointer.position;
    this.schemaPosition = pointer.schemaPosition;
  }


}