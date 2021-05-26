
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roupas').del()
    .then(function () {
      // Inserts seed entries
      return knex('roupas').insert([
        { modelo: 'Camisa', marca_id: 1, lancamento: 2008, preco: 150, foto: 'https://images.tcdn.com.br/img/img_prod/709318/camiseta_nike_x_atmos_com_estampa_3_1_20190625141832.png' },
        { modelo: 'Calça', marca_id: 2, lancamento: 2015, preco: 500, foto: 'https://i.pinimg.com/originals/bd/1f/96/bd1f967f6ee7e038c6f4724b2c9e5926.jpg' },
        { modelo: 'Mochila', marca_id: 7, lancamento: 2019, preco: 5000, foto: 'https://www.acessoriosdgriffe.com.br/wp-content/uploads/2020/10/19-1.jpeg' }
      ]);
    });
};
