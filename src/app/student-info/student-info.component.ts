import { Component, OnInit } from '@angular/core';

/**
 * Module d'affichage des informations de l'étudiant candidat (Identité, Résumé, CV).
 */
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  pdfSrc = '/src/assets/rapprot.pdf';

  name: string;
  resume: string;

  constructor() { }

  ngOnInit() {
    this.name = 'Florian Guigue';
    this.resume = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis id velit quis ultricies. Pellentesque erat ex, fringilla eu odio ac, sodales malesuada felis. Integer a ex non nibh sollicitudin bibendum. Fusce consequat eget ante non viverra. Vestibulum in orci sed enim finibus molestie. Ut euismod tempus risus a consectetur. In nec vehicula orci, vitae interdum risus. Phasellus pellentesque dictum massa, quis consectetur nisl feugiat vel. Sed feugiat mattis neque ultricies condimentum. Nam convallis massa sed venenatis luctus. Aliquam sed dolor laoreet quam imperdiet luctus. Phasellus interdum, augue id viverra volutpat, mi purus dignissim est, eu semper ligula tellus nec ex. Pellentesque bibendum volutpat mattis. Phasellus in vulputate velit, vel viverra dolor. ';
  }

}
