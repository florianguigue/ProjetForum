import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../styles/nav.css']
})

export class NavigationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    window.addEventListener('scroll', function (e) {
      if (window.scrollY > 50) {
        document.getElementsByTagName('nav')[0].classList.add('bg-white');
      } else if (window.scrollY < 50) {
        document.getElementsByTagName('nav')[0].classList.remove('bg-white');
      }
    });
  }

}
