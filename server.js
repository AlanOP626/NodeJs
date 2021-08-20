const http=require('http');
const url=require('url');
const fs=require('fs');

const mime = {
  'html' : 'text/html',
  'css'  : 'text/css',
  'jpg'  : 'image/jpg',
  'ico'  : 'image/x-icon',
  'mp3'  :	'audio/mpeg3',
  'mp4'  : 'video/mp4',
   
};

const servidor=http.createServer( (request,response) => {
    const objetourl = url.parse(request.url);
    let path='pagina'+objetourl.pathname;
    if (path=='pagina/')
    path='pagina/index.html';
    
    fs.stat(path, error => {
      if (!error) {
        fs.readFile(path, (error,contenido) => {
          if (error) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write('Error interno');
            response.end();					
          } else {
            const vec = path.split('.');
            const extension=vec[vec.length-1];
            const mimearchivo=mime[extension];
            response.writeHead(200, {'Content-Type': mimearchivo});
            response.write(contenido);
            response.end();
          }
        });
      } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
        response.end();
      }
    });
  });
  
  servidor.listen(3000);
  
  console.log('Servidor web iniciado');