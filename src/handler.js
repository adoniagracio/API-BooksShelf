const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    
    const id =  nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;
    
     if(pageCount < readPage ){
        const response = h.response({
           status: 'fail',
           message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 
        });
        response.code(400);
        return response;
        
    }

    else if(!name){
        const response = h.response({
            status: 'fail',
            message :'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    const newBook = {
        id,name, year, author, summary, publisher, pageCount, readPage, reading,insertedAt,updatedAt,finished,
    }
    
    books.push(newBook);

    const success = books.filter((book) => book.id === id).length > 0;
    if(!success){
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
          });
          response.code(500);
        
          return response;

    }
    else{
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data:{
                bookId:id,
            },
        });
        response.code(201);
        return response;
        }
};

    const getAllBooksHandler = (request,h) =>{
        const { name, reading, finished } = request.query;
        let filteredBooks = books;
    
        if (name) {
            filteredBooks = filteredBooks.filter((book) =>
                book.name.toLowerCase().includes(name.toLowerCase())
            );
        } else if (finished) {
                const isFinished = !!Number(finished);
                filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
        } else if (reading) {
            const isReading = !!Number(reading);
            filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
        } 
        const response = h.response({
            status: 'success',
            data: {
                books: filteredBooks.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    };   

    const getBookbyIdHandler = (request,h) =>{
        const {id} = request.params;
        const book = books.filter((book) => book.id === id)[0];
        if(!book){
            const response = h.response({
                status:'fail',
                message:'Buku tidak ditemukan',
            });
            response.code(404);
            return response;
        }
        else{
            return{
                status:'success',
                data:{
                    book,
                },
            };
         }
    };

    const DeleteBooksByIdHandler = (request,h) =>{
        const{id} = request.params;
        const index = books.findIndex((note) => note.id === id);
        if(index === -1){
            const response = h.response({
                status:'fail',
                message:'Buku gagal dihapus. Id tidak ditemukan',
            });
            response.code(404);
            return response;
        }
        else{
        books.splice(index,1);
        const response = h.response({
            status:'success',
            message:'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    };

    const EditBookbyIdHandler = (request,h) => {
        const {id} = request.params;
        const{ name, year, author, summary, publisher, pageCount, readPage, reading,} = request.payload;
        const UpdateAt = new Date().toISOString();
        const index = books.findIndex((book) => book.id === id);

        if(index === -1){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
              });
              response.code(404);
            
              return response;
            }
        
        else{
            if (pageCount < readPage) {
                const response = h.response({
                  status: 'fail',
                  message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
                });
                response.code(400);
          
                return response;
              }

            else if(!name){
                const response = h.response({
                    status:'fail',
                    message:'Gagal memperbarui buku. Mohon isi nama buku',
                });
                response.code(400);
                return response;
            }
            else{
              const finished = pageCount === readPage;
              books[index] = {
                ...books[index],name,year, author, summary, publisher, pageCount, readPage, finished,  reading, UpdateAt,
              };
              const response = h.response({
                status:'success',
                message:'Buku berhasil diperbarui',
              });
              response.code(200);
              return response;
            }
        }

    };

    module.exports = {
        addBooksHandler,
        getAllBooksHandler,
        getBookbyIdHandler,
        DeleteBooksByIdHandler,
        EditBookbyIdHandler,
    };