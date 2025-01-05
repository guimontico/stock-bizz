/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BizzComponent } from './bizz.component';

describe('BizzComponent', () => {
  let component: BizzComponent;
  let fixture: ComponentFixture<BizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
