import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Status } from './status';

describe('Status component', () => {
  let component: Status;
  let fixture: ComponentFixture<Status>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Status]
    }).compileComponents();

    fixture = TestBed.createComponent(Status);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render initial status as "♥ 0" and button not liked', () => {
    const button = fixture.nativeElement.querySelector('#statusBtn');
    expect(button.textContent).toContain('♥');
    expect(button.textContent).toContain('0');
    expect(button.classList.contains('liked')).toBeFalsy();
  });

  it('should increment status to 1 and mark button as liked when clicked once', () => {
    const button = fixture.nativeElement.querySelector('#statusBtn');
    button.click();
    fixture.detectChanges();

    expect(component.status()).toBe(1);
    expect(component.isLiked()).toBeTruthy();
    expect(button.classList.contains('liked')).toBeTruthy();
    expect(button.textContent).toContain('1');
  });

  it('should decrement status back to 0 and remove liked class when clicked twice', () => {
    const button = fixture.nativeElement.querySelector('#statusBtn');
    
    // First click
    button.click();
    fixture.detectChanges();
    
    // Second click
    button.click();
    fixture.detectChanges();

    expect(component.status()).toBe(0);
    expect(component.isLiked()).toBeFalsy();
    expect(button.classList.contains('liked')).toBeFalsy();
    expect(button.textContent).toContain('0');
  });
});
