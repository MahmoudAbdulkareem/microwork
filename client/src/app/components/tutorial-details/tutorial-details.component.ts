import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    title: '',
    content: '',
    author: '',
    category: ''
  };

  categories: string[] = ['FOOD', 'HEALTH', 'TECHNOLOGY', 'ENTERTAINMENT', 'LIFESTYLE'];

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This Blog was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }


  deleteTutorial(): void {
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => {
          console.error(e);
          alert('Blog Deleted');
        }
      });
    } else {
      alert('Blog ID is missing');
    }
  }
}
