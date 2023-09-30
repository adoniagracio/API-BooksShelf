const{
    addBooksHandler,
    getAllBooksHandler,
    getBookbyIdHandler,
    DeleteBooksByIdHandler,
    EditBookbyIdHandler,
}   = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    {
        method:'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method:'PUT',
        path:'/books/{id}',
        handler:EditBookbyIdHandler,
    },
    {
        method:'GET',
        path:'/books/{id}',
        handler: getBookbyIdHandler,
    },
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:DeleteBooksByIdHandler,
    },
];

module.exports = routes;