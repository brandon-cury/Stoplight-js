/**
 * StopLight Code By Brandon-cury
 *
 */
let stoplight = (function () {
  self = {};
  privateProperty = {};
  self.carlight = { time: 3, color: ["green", "orange", "red"] };
  self.passLight = { time: 6, color: ["red", "green"] };
  privateProperty.compteurCar = 0;
  self.trasitionTime = 0.3;
  privateProperty.compteurCar = 0;
  privateProperty.AccelerePass = true;
  function carjeux(init = false) {
    let carElements = Array.from(document.getElementsByClassName("light"));
    if (init) {
      carElements.forEach((element) => {
        if (element.dataset.light == self.carlight.color[0]) {
          element.classList.replace(
            "off",
            self.carlight.color[privateProperty.compteurCar]
          );
        } else {
          for (let i of self.carlight.color) {
            element.classList.remove(self.carlight.color[i]);
          }
          element.classList.add("off");
        }
      });
      privateProperty.compteurCar = 1;
    }
    carJeuxInterval = setInterval(() => {
      carElements.forEach((element) => {
        if (
          element.dataset.light ==
          self.carlight.color[privateProperty.compteurCar]
        ) {
          element.classList.replace(
            "off",
            self.carlight.color[privateProperty.compteurCar]
          );
          if (self.carlight.color[privateProperty.compteurCar] == "red") {
            clearInterval(carJeuxInterval);
            pietonPass();
          }
        } else {
          for (let i of self.carlight.color) {
            element.classList.remove(self.carlight.color[i]);
          }
          element.classList.add("off");
        }
      });
      privateProperty.compteurCar++;

      if (privateProperty.compteurCar == self.carlight.color.length) {
        privateProperty.compteurCar = 0;
      }
    }, privateProperty.timeCar * 1000);
  }
  function pietonPass() {
    let passElements = Array.from(document.getElementsByClassName("walk"));
    privateProperty.AccelerePass = false;
    for (let i of passElements) {
      if (i.dataset.light == self.passLight.color[1]) {
        i.classList.replace("off", self.passLight.color[1]);
      } else {
        i.classList.remove(self.passLight.color[0]);
        i.classList.add("off");
      }
    }
    setTimeout(function () {
      for (let i of passElements) {
        if (i.dataset.light == self.passLight.color[0]) {
          i.classList.replace("off", self.passLight.color[0]);
        } else {
          i.classList.remove(self.passLight.color[1]);
          i.classList.add("off");
        }
      }
      privateProperty.timeCar = self.carlight.time;
      privateProperty.AccelerePass = true;
      carjeux(true);
    }, self.passLight.time * 1000);
  }
  function stopPass() {
    clearInterval(carJeuxInterval);
    privateProperty.timeCar = self.trasitionTime;
    carjeux();
  }
  self.execute = function () {
    privateProperty.timeCar = self.carlight.time;
    carjeux();
    let boutton = document.querySelector(".walklight-button");
    boutton.addEventListener("click", () => {
      if (privateProperty.AccelerePass) {
        stopPass();
      }
    });
  };

  return self;
})();
stoplight.execute();
//Pour changer le temps de passage des feu de voiture
stoplight.carlight.time = 5;
//Pour changer le temps de passage des pieton
stoplight.passLight.time = 10;
//Pour modifier le temps de transition lorsqu'un pieton clique sur  la croix pour passer
stoplight.trasitionTime = 0.3;
