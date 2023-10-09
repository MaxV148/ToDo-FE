import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToDoFormComponent } from './create-to-do-form.component';

describe('CreateToDoFormComponent', () => {
  let component: CreateToDoFormComponent;
  let fixture: ComponentFixture<CreateToDoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateToDoFormComponent]
    });
    fixture = TestBed.createComponent(CreateToDoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
