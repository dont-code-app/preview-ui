import { ValueService } from "../../values/services/value.service";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import {
  Change,
  CommandProviderInterface,
  DontCode,
  DontCodeModelPointer,
  DontCodeSchemaManager
} from "@dontcode/core";
import { ChangeListenerService } from "../../change/services/change-listener.service";
import dtcde = DontCode.dtcde;

@Injectable({
  providedIn: 'root'
})
export class CommandProviderService implements CommandProviderInterface {

  protected receivedCommands = new Subject<Change> ();
  protected allCommands = new ReplaySubject<Change> ();

  constructor(protected changeListener: ChangeListenerService, protected valueService:ValueService) {
    valueService.receiveUpdatesFrom (this.receivedCommands);
    changeListener.getChangeEvents().subscribe(change => {
      // console.log ('Received Change ', change);
      if (!change.pointer) {
        change.pointer = this.calculatePointerFor(change.position);
      }
      this.receivedCommands.next(change);
      this.allCommands.next(change);
    });
  }

  getJsonAt(position: string): any {
    return this.valueService.findAtPosition (position, false);
  }

  pushCommand (newChange:Change) {
    this.receivedCommands.next(newChange);
    this.allCommands.next(newChange);
  }

  getAllCommands (): Observable<Change> {
    return this.allCommands;
  }

  /**
   * Be notified when something changes in the model at the following position
   * for example:
   * position: /creation/screens, property: name will be notified of all name changes for all screen
   * position: /creation/screens, property: null will be notified of any change in any screen and subscreens
   * position: /creation/screens/a, property: null will be notified on changes in screen a and below
   * position: /creation/screens/?, property: null will be notified on changes in screen items (move, delete), and not below
   * position: null, property: null will be notified on all changes
   * @param position
   * @param property
   */
  receiveCommands (position?: string, property?: string): Observable<Change> {
    if (position)
    {
      //console.log("Setting Commands updates for ", position);
      return this.receivedCommands.pipe(filter (command => {
        //console.log("Filtering position for pos,item:", command.position, position, lastItem);
        if ((command.position!=null) && (command.position.startsWith(position))) {
          if (property) {
            const next=command.position.indexOf('/', position.length+1);
            if( next != -1) {
              if( command.position.startsWith(property, next+1)) {
                //console.log("Filtering ok");
                return true;
              }
            }
            //console.log("Filtering no");
            return false;
          }
          //console.log("Filtering ok");
          return true;
        } else {
          //console.log("Filtering no");
          return false;
        }
      }));
    }
    else
      return this.receivedCommands;
  }

  getSchemaManager (): DontCodeSchemaManager {
    return dtcde.getSchemaManager();
  }

  calculatePointerFor (position:string): DontCodeModelPointer {
    const ret = dtcde.getSchemaManager().generateSchemaPointer(position);
    return ret;
  }
}
