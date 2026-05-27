class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getByCategory(category) {
    const allProducts = await this.productRepository.findAll();
    return allProducts.filter(product => product.category === category);
  }

  async searchByName(query) {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }
    
    const allProducts = await this.productRepository.findAll();
    const lowerCaseQuery = query.toLowerCase();
    
    return allProducts.filter(product => 
      product.name && product.name.toLowerCase().includes(lowerCaseQuery)
    );
  }

  async create(productData) {
    if (!productData.name) {
      throw new Error('Product name is required');
    }
    if (productData.price === undefined || productData.price <= 0) {
      throw new Error('Product price must be greater than 0');
    }

    return await this.productRepository.save(productData);
  }
}

module.exports = ProductService;