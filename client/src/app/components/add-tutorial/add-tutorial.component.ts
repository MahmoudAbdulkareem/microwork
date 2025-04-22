import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    title: '',
    content: '',
    author: '',
    category: ''
  };
  submitted = false;

  categories: string[] = ['FOOD', 'HEALTH', 'TECHNOLOGY', 'ENTERTAINMENT', 'LIFESTYLE'];

  constructor(private tutorialService: TutorialService) {}

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      content: this.tutorial.content,
      author: this.tutorial.author,
      category: this.tutorial.category
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      content: '',
      author: '',
      category: ''
    };
  }
}
