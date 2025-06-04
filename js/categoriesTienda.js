function categories() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de categorias</h5>'
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories'
  
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
          let listCategories = `
              <table class="table">
              <thead>
              <tr>
              <th scope="col" class="table-success">#</th>
              <th scope="col" class="table-success">Nombre categoria</th>
              <th scope="col" class="table-success">slug</th>
              <th scope="col" class="table-success">Acción</th>
              </tr>
              </thead>
              <tbody>
              `
          result.info.forEach(element => {
            listCategories = listCategories + `
                  <tr>
                      <td>${element.id}</td>
                      <td>${element.name}</td>
                      <td>${element.slug}</td>
                      <td><button type="button" class="btn btn-outline-info" onclick="getCategories('${element.id}')">Ver</button></td>
                  </tr>
                  `
          });
          listCategories = listCategories + `
                </tbody>
               </table>
               <nav aria-label="Page navigation example">
               <ul class="pagination justify-content-center">
               <li class="page-item">
               <a class="page-link" href="#" aria-label="Previous">
               <span aria-hidden="true">&laquo;</span>
               </a>
               </li>
               <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
               <li class="page-item">
               <a class="page-link" href="#" aria-label="Next">
               <span aria-hidden="true">&raquo;</span>
               </a>
               </li>
               </ul>
               </nav>
              `
          document.getElementById('info').innerHTML = listCategories
        } else {
          document.getElementById('info').innerHTML = 'No existen usuarios'
        }
      })
  }

  function getCategories(idCategories) {
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories/' + idCategories
  
    fetch(REQRES_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-api-key': 'reqres-free-v1'
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
          const categories = response.body
          const modalCategories = `
              <!-- Modal -->
              <div class="modal fade" id="modalCategories" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Categoria</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="card">
                    <img src="${categories.image}" class="card-img-top" alt="Imagen categoria">
                    <div class="card-body">
                    <h5 class="card-title">Informacion de la Categoria:</h5>
                    <p class="card-text">Nombre: ${categories.name}</p>
                    <p class="card-text">Rol: ${categories.role}</p>
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
          document.getElementById('viewModal').innerHTML = modalCategories
          const modal = new bootstrap.Modal(document.getElementById('modalCategories'))
          modal.show()
        } else {
          document.getElementById('info').innerHTML = '<h3>No se encontró la categoria en la Api</h3>'
        }
      })
  }