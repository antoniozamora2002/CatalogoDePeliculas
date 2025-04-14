import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  private _searchText = '';

  @Input()
  set searchText(value: string) {
    this._searchText = value;
  }

  get searchText(): string {
    return this._searchText;
  }

  // Este es el valor real vinculado al ngModel
  get searchTextValue(): string {
    return this._searchText;
  }

  set searchTextValue(value: string) {
    this._searchText = value;
    this.searchTextChange.emit(value);
  }

  @Input() placeholder = 'Buscar películas...';
  @Input() buttonText = 'Buscar';
  @Input() extraClasses = '';

  // Para two-way binding, necesitamos un Output con el nombre del Input + "Change"
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();

  search(): void {
    if (!this._searchText.trim()) return;
    this.searchEvent.emit(this._searchText);
  }
}
