import { Component, EventEmitter, model, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  search = model<string>('');
}
