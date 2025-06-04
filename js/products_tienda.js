function products() {
  document.getElementById('cardHeader').innerHTML = '<h5>Listado de Productos</h5>'
  const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/'

  fetch(REQRES_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      return response.json().then(
        data => {
          return {
            status: response.status,
            info: data
          }
        }
      )
    })

    .then((result) => {
      console.log('resultado', result)
      if (result.status === 200) {
        let listProducts = `
            <table class="table">
            <thead>
            <tr>
            <th scope="col" class="table-success">#</th>
            <th scope="col" class="table-success">Nombre Producto</th>
            <th scope="col" class="table-success">slug</th>
            <th scope="col" class="table-success">Precio</th>
            <th scope="col" class="table-success">Descripcion</th>
            <th scope="col" class="table-success">Accion</th>
            </tr>
            </thead>
            <tbody>
            `
        result.info.forEach(element => {
          listProducts = listProducts + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.slug}</td>
                    <td class ="text-success"> $${element.price}</td>
                    <td>${element.description}</td>
                    <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${element.id}')">Ver</button></td>
                </tr>
                `
        });
        listProducts = listProducts + `
              </tbody>
            </table>
             <nav aria-label="Page navigation example">
             <ul class="pagination justify-content-center">
             <li class="page-item">
             <a class="page-link" href="#" aria-label="Previous">
             <span aria-hidden="true">&laquo;</span>
             </a>
             </li>
             <li class="page-item"><a class="page-link" href="#" onclick="products('1')">1</a></li>
             <li class="page-item"><a class="page-link" href="#" onclick="products('2')">2</a></li>
             <li class="page-item">
             <a class="page-link" href="#" aria-label="Next">
             <span aria-hidden="true">&raquo;</span>
             </a>
             </li>
             </ul>
             </nav>
            `
        document.getElementById('info').innerHTML = listProducts
      } else {
        document.getElementById('info').innerHTML = 'No existen colores'
      }
    })
  document.getElementById('info').innerHTML = '<h1>Lista de Productos</h1>'
}

function getProduct(idProduct) {
  const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/' + idProduct

  fetch(REQRES_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((result) => {
      return result.json().then(
        data => {
          return {
            status: result.status,
            body: data
          }
        }
      )
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("prueba escritorio", response)
        const product = response.body
        const modalProduct = `
            <!-- Modal -->
            <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <div class="card">
                  <div class="card-body">
                  <h5 class="card-title">Informacion del Producto:</h5>
                  <img src="${product.images[1]}" class="card-img-top" alt="Avatar del producto">
                  <p class="card-text">Nombre: ${product.title}</p>
                  <p class="card-text">Precio: ${product.price}</p>
                    </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            `
        document.getElementById('viewModal').innerHTML = modalProduct
        const modal = new bootstrap.Modal(document.getElementById('modalProduct'))
        modal.show()
      } else {
        document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la Api</h3>'
      }
    })
}