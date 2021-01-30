import { TestBed } from "@angular/core/testing";

import { ValueService } from "./value.service";
import { Change, DontCodeTestManager } from "@dontcode/core";
import { Subject } from "rxjs";

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find the element at any position', () => {
    service.resetContent ({
      creation: {
        name:"Test1",
        type:"application",
        entities:{
          "aaaa":{
            name:"Entity1",
            fields: {
              "aaab":{
                name:"Field1",
                type:"string"
              }
            }
          },
          "aaac":{
            name:'Entity2',
            fields: {
              "aaad":{
                name:'Name',
                type:'boolean'
              }
            }
          }
        },
        screens: {
          "aaae":{
          name:"Screen1"
        },
        "aaaf":{
          name:"Screen2"
        }
      }
    }
    });
    expect (service.findAtPosition('creation/entities/aaaa')).toHaveProperty('name', 'Entity1');
    expect (service.findAtPosition('creation/entities/aaaa/')).toHaveProperty('name', 'Entity1');

    expect (service.findAtPosition('creation/entities/aaaa/fields/aaab')).toHaveProperty('name', 'Field1');
    expect (service.findAtPosition('creation/screens')).toHaveProperty('aaae', {"name":"Screen1"});
  });

  it('should update content correctly from commands', () => {
    service.resetContent({});
    let source = new Subject<Change>();
    service.receiveUpdatesFrom(source);
    source.next(DontCodeTestManager.createTestChange("creation", null, null, null, "TestName", "name"));
    expect(service.getContent()).toEqual({
      creation: {
        name: "TestName"
      }
    });
    source.next(DontCodeTestManager.createTestChange("creation", null, null, null, "TestApp", "type"));
    expect(service.getContent()).toEqual({
      creation: {
        name: "TestName",
        type: "TestApp"
      }
    });

    source.next(DontCodeTestManager.createTestChange("creation/entities", 'a', null, null, "TestEntity", "name"));
    expect(service.getContent()).toEqual({
      creation: {
        name: "TestName",
        type: "TestApp",
        entities: {
          "a": {
            name: "TestEntity"
          }
        }
      }
    });

    service.resetContent({
      creation: {
        name: "TestName"
      }
    });
    source.next(DontCodeTestManager.createTestChange("creation", null, 'entities', 'b',
      {name: "TestEntity", type: "string"}));
    expect(service.getContent()).toEqual({
      creation: {
        name: "TestName",
        entities: {
          "b": {
            name: "TestEntity",
            type: "string"
          }
        }
      }
    });

    source.next(DontCodeTestManager.createTestChange("creation", null, "entities", "b", "number", "type"));
    expect(service.getContent()).toEqual({
      creation: {
        name: "TestName",
        entities: {
          "b": {
            name: "TestEntity",
            type: "number"
          }
        }
      }
    });

    service.resetContent({
      creation: {
        name: "TestName"
      }
    });
    source.next(DontCodeTestManager.createTestChange("creation/screens", 'ab', "components", "cd", "Search", "name"));
    expect(service.getContent()).toEqual({
      creation: {
        name: "TestName",
        screens: {
          "ab": {
            components: {
              "cd": {
                name: "Search"
              }
            }
          }
        }
      }
    });
  });

    it('should delete content correctly from commands', () => {
      service.resetContent({
        creation: {
          name: "TestName",
          type: "TestApp",
          entities: {
            "a": {
              name: "TestEntityA",
              type: "boolean"
            },
            "b": {
              name: "TestEntityB",
              type: "string"
            }
          }
        }
      });
      let source = new Subject<Change>();
      service.receiveUpdatesFrom(source);
      source.next(DontCodeTestManager.createDeleteChange("creation", null, null, null, "type"));
      expect(service.getContent()).toEqual({
        creation: {
          name: "TestName",
          entities: {
            "a": {
              name: "TestEntityA",
              type: "boolean"
            },
            "b": {
              name: "TestEntityB",
              type: "string"
            }
          }
        }
      });
      source.next(DontCodeTestManager.createDeleteChange("creation", null, "entities", "a"));
      expect(service.getContent()).toEqual({
        creation: {
          name: "TestName",
          entities: {
            "b": {
              name: "TestEntityB",
              type: "string"
            }
          }
        }
      });
      source.next(DontCodeTestManager.createDeleteChange("creation", null, "entities", "b", "name"));
      expect(service.getContent()).toEqual({
        creation: {
          name: "TestName",
          entities: {
            "b": {
              type: "string"
            }
          }
        }
      });
      source.next(DontCodeTestManager.createDeleteChange("creation", null, "entities", null,null));
      expect(service.getContent()).toEqual({
        creation: {
          name: "TestName"
        }
      });

  });

  it('should move content correctly from commands', () => {
    service.resetContent({
      creation: {
        name: "TestName",
        type: "TestApp",
        entities: {
          "a": {
            name: "TestEntityA",
            type: "boolean"
          },
          "b": {
            name: "TestEntityB",
            type: "string"
          },
          "c": {
            name: "TestEntityC",
            type: "numeric"
          }
        }
      }
    });
    const start=Object.keys(service.getContent().creation.entities);
    expect(start).toEqual(["a","b","c"]);
    let source = new Subject<Change>();
    service.receiveUpdatesFrom(source);
    // from a,b,c to b,a,c
    source.next(DontCodeTestManager.createMoveChange("creation/entities/b","a","creation", null, "entities", "b"));
    expect(Object.keys(service.getContent().creation.entities)).toStrictEqual(["b","a","c"]);
    // from b,a,c to b,c,a
    source.next(DontCodeTestManager.createMoveChange("creation/entities/c","a","creation", null, "entities", "c"));
    expect(Object.keys(service.getContent().creation.entities)).toStrictEqual(["b","c","a"]);
    // from b,c,a to c,a,b
    source.next(DontCodeTestManager.createMoveChange("creation/entities/b",null,"creation", null, "entities", "b"));
    expect(Object.keys(service.getContent().creation.entities)).toStrictEqual(["c","a", "b"]);
  });

});
