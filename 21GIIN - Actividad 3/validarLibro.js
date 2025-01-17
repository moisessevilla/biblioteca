function validarLibro(datosLibro) {
    const { isbn, titulo, autor } = datosLibro;
    if (!isbn || isbn.trim() === '') {
      throw new Error('El ISBN es obligatorio');
    }
    if (!titulo || titulo.trim() === '') {
      throw new Error('El título es obligatorio');
    }
    if (!autor || autor.trim() === '') {
      throw new Error('El autor es obligatorio');
    }
  }
  