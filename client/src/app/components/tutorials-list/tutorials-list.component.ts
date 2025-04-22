import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  category = '';  // For category filtering
  keyword = '';   // For advanced search
  selectedCategory: string = '';
  filteredTutorials: Tutorial[] = [];
  categories: string[] = ['FOOD', 'HEALTH', 'TECHNOLOGY', 'ENTERTAINMENT', 'LIFESTYLE']; // Example categories

  // For Context Menu
  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  contextMenuTutorial: Tutorial = {};

  constructor(private tutorialService: TutorialService, private router: Router) {}

  ngOnInit() {
    this.retrieveTutorials();
    document.addEventListener('click', () => {
      this.contextMenuVisible = false;
    });
  }

  // Retrieve all blogs
  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
        this.filteredTutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  // Filter tutorials by category or keyword
  filterTutorials(): void {
    // First, filter based on the selected category and the search keyword
    this.filteredTutorials = this.tutorials?.filter(tutorial => {
      const matchesCategory = this.selectedCategory
        ? tutorial.category === this.selectedCategory
        : true;  // If no category is selected, show all tutorials

      const matchesKeyword = this.keyword
        ? (tutorial.title?.includes(this.keyword) || tutorial.content?.includes(this.keyword))
        : true;  // Apply keyword filtering

      return matchesCategory && matchesKeyword;
    }) || [];
  }


  // Navigate to the Edit page when a tutorial is double-clicked
  navigateToEdit(tutorial: Tutorial): void {
    if (tutorial.id) {
      this.router.navigate(['/edit', tutorial.id]);
    }
  }

  // Open the custom context menu on right-click
  openContextMenu(event: MouseEvent, tutorial: Tutorial): void {
    event.preventDefault(); // Prevent the default context menu
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenuTutorial = tutorial;
  }

  // Close the context menu when clicking anywhere else
  closeContextMenu(): void {
    this.contextMenuVisible = false;
  }

  // Navigate to the edit page from the context menu
  navigateToEditFromContext(): void {
    if (this.contextMenuTutorial.id) {
      this.router.navigate(['/tutorials', this.contextMenuTutorial.id]);
      this.contextMenuVisible = false;
    }
  }

  // Set active tutorial for details
  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
}
