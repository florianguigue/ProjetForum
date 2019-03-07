import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../services/shared.service';

/**
 * Module d'affichage des informations de l'étudiant candidat (Identité, Résumé, CV).
 */
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['../styles/student-info.css']
})
export class StudentInfoComponent implements OnInit {

  pdfSrc = '/src/assets/attestation_CVEC.pdf';

  public student: User;

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUser(this.route.snapshot.paramMap.get('studentId')).subscribe((user) => {
      this.student = new User(user._id, user.email, user.account, user.user_type, user.wishlist);
      console.log(this.student);
    }, (error) => {

    });
  }

  addToWishList() {
    this.sharedService.connectedUser.wishlist.push(this.student.id);
  }

}
