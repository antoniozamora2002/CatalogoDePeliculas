import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { Actor } from '../../models/Person';

@Component({
  selector: 'app-person',
  imports: [CommonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent implements OnInit {
  private personService = inject(PersonService);

  actorData!: Actor;
  personID: number | 0 = 0;

  formattedBirthday = '';
  age = 0;

  loading = true;

  constructor() {}

  ngOnInit(): void {
    if (this.actorData && this.actorData.birthday) {
      this.formattedBirthday = this.formatDate(this.actorData.birthday);
      this.age = this.calculateAge(this.actorData.birthday);
    }
    this.loadPersonDetails();
  }

  loadPersonDetails() {
    console.log(this.personService.personId());
    this.personID = this.personService.personId();
    this.personService.getDetailsPerson(this.personID).subscribe({
      next: (response: Actor) => {
        console.log('getDetailsPerson:', response);
        this.actorData = response;
        this.formattedBirthday = this.formatDate(response.birthday);
        this.age = this.calculateAge(response.birthday);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching person details:', error);
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  getGenderText(gender: number): string {
    return gender === 1 ? 'Femenino' : 'Masculino';
  }
}
