import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from "./local-storage.service";

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should set and get item', () => {
    service.setItem('country', 'Vienna');
    expect(service.getItem('country')).toEqual('Vienna');
  })

  it('should remove item', () => {
    service.setItem('country', 'Vienna');
    service.removeItem('country');
    expect(service.getItem('country')).toEqual([]);
  })
});
