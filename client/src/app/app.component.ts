import { Component, OnInit } from '@angular/core';
import { TutorialService } from './services/tutorial.service';  // Adjust the path if needed
import { Tutorial } from './models/tutorial.model';  // Adjust the path if needed

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tutorials: Tutorial[] = [];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit() {
    this.retrieveTutorials();
  }

  // Retrieve all tutorials
  retrieveTutorials() {
    this.tutorialService.getAll().subscribe(
      (data) => {
        this.tutorials = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Set the active tutorial to edit
  setActiveTutorial(tutorial: Tutorial, index: number) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  // Save a new tutorial
  saveTutorial() {
    const data = {
      title: this.currentTutorial.title,
      content: this.currentTutorial.content,  // Using content instead of description
      author: this.currentTutorial.author,    // Using author instead of status
      published: false
    };

    this.tutorialService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.retrieveTutorials();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Update an existing tutorial
  updateTutorial() {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe(
      (response) => {
        console.log(response);
        this.retrieveTutorials();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Delete a tutorial
  deleteTutorial() {
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      (response) => {
        console.log(response);
        this.retrieveTutorials();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Search tutorials by title
  searchTitle() {
    this.tutorialService.findByTitle(this.title).subscribe(
      (data) => {
        this.tutorials = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
