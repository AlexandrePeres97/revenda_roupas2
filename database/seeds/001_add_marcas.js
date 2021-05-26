
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('marcas').del()
    .then(function () {
      // Inserts seed entries
      return knex('marcas').insert([
        { nome: 'Nike' },
        { nome: 'Adidas' },
        { nome: 'Puma' },
        { nome: 'Mormaii' },
        { nome: 'Lacoste' },
        { nome: 'Supreme' },
        { nome: 'Gucci' },
        { nome: 'LouisVuitton' }
      ]);
    });
};
