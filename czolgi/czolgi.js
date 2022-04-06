const tanks = [];

const updateTanksList = () => {
    const el = document.querySelector('#tanks');
    el.textContent = '';
    tanks.forEach((tank) => {
        const tankEl = document.createElement('li');
        tankEl.innerText = `${tank.name} (power ${tank.power}) (health ${tank.health})`;
        el.appendChild(tankEl);

    });
};

document.forms.addTank.onsubmit = (e) => {
    e.preventDefault();
    const tankName = e.target.name.value;
    if (tanks.map((tank) => tank.name).includes(tankName)) {
      alert(`Czołg o nazwie ${tankName} już istnieje, wybierz inną nazwę`);
      return;
    }
    tanks.push({ name: tankName, health: 100, power: 10 + Math.ceil(Math.random() * 3) });
    updateTanksList();
    e.target.reset();
}

document.querySelector('#nextTurn').addEventListener('click', () => {
    
   // Tutaj mają się zaatakować wszystkie czołgi
   // Jakaś pętla? Kolejność losowa czy ustalona?
});

const getCurrentTime = () => new Date().toLocaleTimeString("pl-PL");
// Dodaj wyświetlanie historii w postali listy kroków
// Użyj metody getCurrentTime jako stempla czasowego (w końcu to historia)
