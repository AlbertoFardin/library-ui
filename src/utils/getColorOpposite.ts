const getColorOpposite = (hexColor: string): string | null => {
  // Verifica se il colore esadecimale è valido
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(hexColor)) {
    return null; // Restituisce null se il colore esadecimale non è valido
  }

  // Rimuove il carattere '#'
  hexColor = hexColor.replace("#", "");

  // Calcola il complemento del colore esadecimale
  let oppositeColor = "";
  for (let i = 0; i < 3; i++) {
    const component = parseInt(hexColor.substr(i * 2, 2), 16);
    const oppositeComponent = 255 - component;
    oppositeColor += ("00" + oppositeComponent.toString(16)).slice(-2);
  }

  return "#" + oppositeColor.toUpperCase();
};

export default getColorOpposite;
