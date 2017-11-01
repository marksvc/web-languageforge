import * as angular from 'angular';
import 'angular-mocks';

import { CoreModule } from './core.module';
import { BytesFilter, BytesFilterFunction, RelativeTimeFilter, RelativeTimeFilterFunction } from './filters';

describe('Filters: ', () => {
  let $filter: angular.IFilterService;

  beforeEach(angular.mock.module(CoreModule));

  beforeEach(angular.mock.inject((filter: angular.IFilterService) => {
    console.log('not here');
    $filter = filter;
  }));

  it('A good way to start building an awesome lib is by doing Unit Tests 👌🏽', () => {
    expect(true).toBe(true);
  });

  describe('BytesFilter', () => {
    it('should initialize correctly', () => {
      const bytesFilter: BytesFilterFunction = $filter('bytes');
      expect(bytesFilter).toBeDefined();
    });
/*
    it('should deal with various NaN', () => {
      const bytesFilter: BytesFilterFunction = $filter('bytes');
      expect(bytesFilter(NaN)).toBe('-');
      expect(bytesFilter(undefined)).toBe('-');
      expect(bytesFilter(Infinity)).toBe('-');
    });

    it('should add various units', () => {
      const bytesFilter: BytesFilterFunction = $filter('bytes');
      expect(bytesFilter(2)).toBe('2.0 bytes');
      expect(bytesFilter(2 * 1024)).toBe('2.0 kB');
      expect(bytesFilter(2 * 1024 * 1024)).toBe('2.0 MB');
      expect(bytesFilter(2 * 1024 * 1024 * 1024)).toBe('2.0 GB');
      expect(bytesFilter(2 * 1024 * 1024 * 1024 * 1024)).toBe('2.0 TB');
      expect(bytesFilter(2 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe('2.0 PB');
    });

    it('should have various precision', () => {
      const bytesFilter: BytesFilterFunction = $filter('bytes');
      expect(bytesFilter(2)).toBe('2.0 bytes');
      expect(bytesFilter(2.1)).toBe('2.1 bytes');
      expect(bytesFilter(2.11)).toBe('2.1 bytes');
      expect(bytesFilter(2.11, 2)).toBe('2.11 bytes');
      expect(bytesFilter(2.11, 0)).toBe('2 bytes');
    });

    describe('RelativeTimeFilter', () => {
      it('should initialize correctly', () => {
        const relativeTimeFilter: RelativeTimeFilterFunction = $filter('relativetime');
        expect(relativeTimeFilter).toBeDefined();
      });

      it('should deal with various undefined', () => {
        const relativeTimeFilter: RelativeTimeFilterFunction = $filter('relativetime');
        expect(relativeTimeFilter()).toBe('a few seconds ago');
        expect(relativeTimeFilter(undefined)).toBe('a few seconds ago');
        expect(relativeTimeFilter('')).toBe('');
      });
    });*/
  });
});
