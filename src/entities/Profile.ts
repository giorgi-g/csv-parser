export class Profile {
  private readonly id: number = 0;
  private readonly firstName: string = '';
  private readonly lastName: string = '';
  private readonly email: string = '';
  private readonly gender: number = 2;
  private readonly phoneNumber: string = '';
  private readonly birthday: Date = new Date();

  constructor(row: any) {
    this.id = parseInt(row['ID'], 10);
    this.firstName = row['FIRST_NAME'];
    this.lastName = row['LAST_NAME'];
    this.email = row['EMAIL'];
    this.gender = this.mapGender(row['GENDER'].toUpperCase());
    this.phoneNumber = row['PHONE_NUMBER'];
    this.birthday = new Date(row['BIRTHDAY']);
  }

  get profile() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      birthday: this.birthday,
    }
  }

  mapGender = (status: string) => {
    switch (status) {
      case "MALE":
        return 0
      case "FEMALE":
        return 1
      default:
        return 2
    }
  }
}
