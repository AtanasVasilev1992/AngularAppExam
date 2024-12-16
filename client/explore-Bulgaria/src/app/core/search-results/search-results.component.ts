import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Place } from '../../types/place';
import { Museum } from '../../types/museum';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  @Input() places: Place[] = [];
  @Input() museums: Museum[] = [];
  @Input() isVisible = false;
  @Output() resultClick = new EventEmitter<void>();

  onResultClick() {
    this.resultClick.emit();
  }
}