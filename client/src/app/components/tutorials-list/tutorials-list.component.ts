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
  tutorials: Tutorial[] = [];
  filteredTutorials: Tutorial[] = [];

  currentTutorial: Tutorial = {};
  currentIndex = -1;

  title = '';
  category = '';
  keyword = '';
  selectedCategory = '';
  isCollapsed = false;

  categories: string[] = ['FOOD', 'HEALTH', 'TECHNOLOGY', 'ENTERTAINMENT', 'LIFESTYLE'];

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  contextMenuTutorial: Tutorial = {};

  constructor(
    private tutorialService: TutorialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    document.addEventListener('click', () => {
      this.contextMenuVisible = false;
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data: any) => {
        console.log('🚀 API Response:', data);

        if (Array.isArray(data.content)) {
          this.tutorials = data.content;
        } else {
          console.error('❌ Unexpected format from API:', data);
          this.tutorials = [];
        }

        this.filteredTutorials = [...this.tutorials];
      },
      error: (err) => {
        console.error('❌ Failed to fetch tutorials:', err);
        this.tutorials = [];
        this.filteredTutorials = [];
      },
    });
  }

  filterTutorials(): void {
    this.filteredTutorials = this.tutorials.filter(tutorial => {
      const matchesCategory = this.selectedCategory
        ? tutorial.category === this.selectedCategory
        : true;

      const matchesKeyword = this.keyword
        ? (tutorial.title?.toLowerCase().includes(this.keyword.toLowerCase()) ||
           tutorial.content?.toLowerCase().includes(this.keyword.toLowerCase()))
        : true;

      return matchesCategory && matchesKeyword;
    });

    console.log('✅ Filtered tutorials:', this.filteredTutorials);
  }

  navigateToEdit(tutorial: Tutorial): void {
    if (tutorial.id) {
      this.router.navigate(['/edit', tutorial.id]);
    }
  }

  openContextMenu(event: MouseEvent, tutorial: Tutorial): void {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenuTutorial = tutorial;
  }

  closeContextMenu(): void {
    this.contextMenuVisible = false;
  }

  navigateToEditFromContext(): void {
    if (this.contextMenuTutorial.id) {
      this.router.navigate(['/tutorials', this.contextMenuTutorial.id]);
      this.contextMenuVisible = false;
    }
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  // ✅ Add Blog Navigation
  navigateToAdd(): void {
    this.router.navigate(['/add']);
  }
}
