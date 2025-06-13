let buildings = [];
let trees = [];
let cars = [];

function setup() {
  createCanvas(800, 600);

  // Criar alguns prédios
  let currentX = 50;
  while (currentX < width) {
    let bWidth = random(80, 150);
    let bHeight = random(200, 400); // Prédios mais altos
    buildings.push({
      x: currentX,
      y: height - 150 - bHeight, // Ajustado para que os prédios fiquem no chão (alinhados com a calçada)
      width: bWidth,
      height: bHeight,
      color: color(random(80, 150), random(80, 150), random(80, 150)) // Tons de cinza/marrom para prédios
    });
    currentX += bWidth + random(20, 50); // Espaçamento entre prédios
  }

  // Criar algumas árvores (na calçada)
  for (let i = 0; i < 7; i++) { // 7 árvores
    trees.push({
      x: random(width),
      y: height - 170 // Posição ajustada para que a base do tronco fique na calçada
    });
  }

  // Criar alguns carros
  for (let i = 0; i < 3; i++) { // 3 carros
    cars.push({
      x: random(width), // Posição inicial aleatória
      y: height - random(90, 105), // Na faixa da rua
      speed: random(1, 3) * (i % 2 === 0 ? 1 : -1), // Velocidade e direção (alguns para frente, outros para trás)
      carColor: color(random(100, 255), random(100, 255), random(100, 255)) // Cor aleatória para cada carro
    });
  }
}

function draw() {
  background(135, 206, 235); // Céu azul

  // Desenhar a rua (asfalto)
  fill(80); // Cinza escuro
  rect(0, height - 150, width, 150); // Faixa da rua

  // Desenhar a calçada
  fill(150); // Cinza claro
  rect(0, height - 150, width, 20); // Calçada acima da rua

  // Desenhar prédios
  for (let building of buildings) {
    fill(building.color);
    rect(building.x, building.y, building.width, building.height);

    // Desenhar janelas (simplificadas)
    fill(170, 200, 255, 200); // Azul claro translúcido
    let windowWidth = 15;
    let windowHeight = 25;
    let windowSpacingX = 20;
    let windowSpacingY = 30;

    for (let wy = building.y + 10; wy < building.y + building.height - windowHeight - 10; wy += windowHeight + windowSpacingY) {
      for (let wx = building.x + 10; wx < building.x + building.width - windowWidth - 10; wx += windowWidth + windowSpacingX) {
        rect(wx, wy, windowWidth, windowHeight);
      }
    }
  }

  // Desenhar árvores (tronco e copa)
  for (let tree of trees) {
    // Tronco
    fill(139, 69, 19); // Marrom
    rect(tree.x, tree.y, 20, 40); // Tronco

    // Copa da árvore
    fill(34, 139, 34); // Verde
    ellipse(tree.x + 10, tree.y, 60, 60); // Copa
  }

  // Desenhar e mover carros
  for (let car of cars) {
    // Corpo do carro
    fill(car.carColor);
    rect(car.x, car.y, 60, 30); // Corpo principal
    rect(car.x + 10, car.y - 10, 40, 10); // Teto/cabine

    // Rodas
    fill(0); // Preto
    ellipse(car.x + 15, car.y + 30, 15, 15); // Roda dianteira
    ellipse(car.x + 45, car.y + 30, 15, 15); // Roda traseira

    // Movimento
    car.x += car.speed;

    // Reiniciar carro se sair da tela
    if (car.speed > 0 && car.x > width + 70) {
      car.x = -70; // Volta do lado esquerdo
    } else if (car.speed < 0 && car.x < -70) {
      car.x = width + 70; // Volta do lado direito
    }
  }
}
