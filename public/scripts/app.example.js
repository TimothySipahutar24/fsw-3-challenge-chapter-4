class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    this.clear();
    const result = this.filterCarByRequest();

    result.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  filterCarByRequest() {
    const requestDate = document.getElementById("date").value;
    const requestTime = document.getElementById("time").value;
    const requestCapacity = document.getElementById("capacity").value;

    const timestamp = new Date(`${requestDate} ${requestTime}`);
    console.log(timestamp);

    if (timestamp == "Invalid Date") {
      alert("Invalid date input, please choose correctly");
      return;
    } else if (requestCapacity <= 0 || requestCapacity > 6) {
      alert("Invalid, max capacity is only 6!");
      return;
    } else {
      return Car.list.filter(
        (car) => car.capacity >= requestCapacity && car.availableAt <= timestamp
      );
    }
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
