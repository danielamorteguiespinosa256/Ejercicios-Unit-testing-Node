const ProductService = require('../src/productService');

describe('ProductService', () => {
  let productService;
  let mockProductRepository;

  beforeEach(() => {
    // Creamos un mock limpio del repositorio antes de cada test
    mockProductRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn()
    };
    
    // Inyectamos el mock en la instancia del servicio
    productService = new ProductService(mockProductRepository);
  });

  // ==========================================
  // PRUEBAS DE: getById
  // ==========================================
  describe('getById', () => {
    it('debería devolver el producto si es encontrado correctamente', async () => {
      const mockProduct = { id: '123', name: 'Laptop', price: 999 };
      mockProductRepository.findById.mockResolvedValue(mockProduct);

      const result = await productService.getById('123');

      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.findById).toHaveBeenCalledWith('123');
    });

    it('debería lanzar un error si el producto no existe', async () => {
      mockProductRepository.findById.mockResolvedValue(null);

      await expect(productService.getById('non-existent')).rejects.toThrow(
        'Product with ID non-existent not found'
      );
      expect(mockProductRepository.findById).toHaveBeenCalledWith('non-existent');
    });
  });

  // ==========================================
  // PRUEBAS DE: getByCategory
  // ==========================================
  describe('getByCategory', () => {
    const mockProducts = [
      { id: '1', name: 'Teclado', category: 'electronics' },
      { id: '2', name: 'Silla', category: 'furniture' },
      { id: '3', name: 'Mouse', category: 'electronics' }
    ];

    it('debería devolver solo los productos de esa categoría', async () => {
      mockProductRepository.findAll.mockResolvedValue(mockProducts);

      const result = await productService.getByCategory('electronics');

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: '1', name: 'Teclado', category: 'electronics' },
        { id: '3', name: 'Mouse', category: 'electronics' }
      ]);
    });

    it('debería devolver un array vacío si la categoría no tiene productos', async () => {
      mockProductRepository.findAll.mockResolvedValue(mockProducts);

      const result = await productService.getByCategory('clothing');

      expect(result).toEqual([]);
    });
  });

  // ==========================================
  // PRUEBAS DE: searchByName
  // ==========================================
  describe('searchByName', () => {
    const mockProducts = [
      { id: '1', name: 'MacBook Pro' },
      { id: '2', name: 'Dell XPS' },
      { id: '3', name: 'iPad Air' }
    ];

    it('debería realizar una búsqueda exitosa', async () => {
      mockProductRepository.findAll.mockResolvedValue(mockProducts);

      const result = await productService.searchByName('Book');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('MacBook Pro');
    });

    it('debería ser una búsqueda case-insensitive (ignorar mayúsculas/minúsculas)', async () => {
      mockProductRepository.findAll.mockResolvedValue(mockProducts);

      const result = await productService.searchByName('pad');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('iPad Air');
    });

    it('debería lanzar un error si la query está vacía', async () => {
      await expect(productService.searchByName('')).rejects.toThrow(
        'Search query cannot be empty'
      );
      await expect(productService.searchByName('   ')).rejects.toThrow(
        'Search query cannot be empty'
      );
      expect(mockProductRepository.findAll).not.toHaveBeenCalled();
    });
  });

  // ==========================================
  // PRUEBAS DE: create
  // ==========================================
  describe('create', () => {
    it('debería llamar a save() y guardar un producto válido', async () => {
      const validProductData = { name: 'Monitor 4K', price: 350 };
      const savedProduct = { id: '999', ...validProductData };
      
      mockProductRepository.save.mockResolvedValue(savedProduct);

      const result = await productService.create(validProductData);

      expect(result).toEqual(savedProduct);
      expect(mockProductRepository.save).toHaveBeenCalledTimes(1);
      expect(mockProductRepository.save).toHaveBeenCalledWith(validProductData);
    });

    it('debería lanzar un error si el precio es negativo o cero', async () => {
      const invalidProduct = { name: 'Gamer Desk', price: -10 };

      await expect(productService.create(invalidProduct)).rejects.toThrow(
        'Product price must be greater than 0'
      );
      expect(mockProductRepository.save).not.toHaveBeenCalled();
    });

    it('debería lanzar un error si falta el nombre', async () => {
      const invalidProduct = { price: 100 };

      await expect(productService.create(invalidProduct)).rejects.toThrow(
        'Product name is required'
      );
      expect(mockProductRepository.save).not.toHaveBeenCalled();
    });
  });
});