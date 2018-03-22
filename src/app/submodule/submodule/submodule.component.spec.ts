import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SubmoduleComponent} from './submodule.component';

describe('SubmoduleComponent', () => {
  let component: SubmoduleComponent;
  let fixture: ComponentFixture<SubmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
