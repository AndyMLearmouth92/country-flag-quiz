import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultsTable } from './quiz-results-table';

describe('QuizResultsTable', () => {
  let component: QuizResultsTable;
  let fixture: ComponentFixture<QuizResultsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResultsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizResultsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
