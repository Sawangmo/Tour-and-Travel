class Booking {
    constructor(id, customerName, destination, packageName, date, price, status) {
      this.id = id;
      this.customerName = customerName;
      this.destination = destination;
      this.packageName = packageName;
      this.date = date;
      this.price = price;
      this.status = status;
    }
  }
  
  module.exports = Booking;
  