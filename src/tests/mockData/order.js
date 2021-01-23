import faker from 'faker';

export const mockOrder = {
  title: faker.name.findName(),
  bookingDate: 1607904000000,
  address: {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.country(),
    zip: faker.address.zipCode(),
  },
  customer: {
    email: faker.internet.email(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumberFormat()
  }
};

export const wrongOrderData = {
  // customer email is missing
  title: faker.name.findName(),
  bookingDate: 1607904000000,
  address: {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.country(),
    zip: faker.address.zipCode(),
  },
  customer: {
    name: faker.name.findName(),
    phone: faker.phone.phoneNumberFormat()
  }
}
