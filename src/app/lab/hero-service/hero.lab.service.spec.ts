import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { IHero } from '../../models/ihero';

describe("hero service (for lab) http testing:", () => {
    let service: HeroServiceForLab;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                HeroServiceForLab
            ]
        });
        service = TestBed.inject(HeroServiceForLab);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
    
    it("should make a GET request to fetch hero by id and emit the returned hero", () => {
        const mockHero: IHero = { id: 1, name: 'Superman', strength: 10 };
        const heroId = 1;

        service.getHero(heroId).subscribe((hero) => {
            expect(hero).toEqual(mockHero);
        });

        const req = httpMock.expectOne(`http://localhost:3000/heroes/${heroId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockHero);
    })

    it("should make a PUT request to update a hero and emit the updated hero", () => {
        const mockHero: IHero = { id: 1, name: 'Updated Superman', strength: 15 };

        service.updateHero(mockHero).subscribe((hero) => {
            expect(hero).toEqual(mockHero);
        });

        const req = httpMock.expectOne(`http://localhost:3000/heroes/${mockHero.id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockHero);
        req.flush(mockHero);
    })
})