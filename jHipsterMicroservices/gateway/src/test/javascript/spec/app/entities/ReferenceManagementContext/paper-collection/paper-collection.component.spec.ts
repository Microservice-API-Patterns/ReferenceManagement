import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PaperCollectionComponent } from 'app/entities/ReferenceManagementContext/paper-collection/paper-collection.component';
import { PaperCollectionService } from 'app/entities/ReferenceManagementContext/paper-collection/paper-collection.service';
import { PaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';

describe('Component Tests', () => {
  describe('PaperCollection Management Component', () => {
    let comp: PaperCollectionComponent;
    let fixture: ComponentFixture<PaperCollectionComponent>;
    let service: PaperCollectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperCollectionComponent],
      })
        .overrideTemplate(PaperCollectionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperCollectionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperCollectionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaperCollection(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paperCollections && comp.paperCollections[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
