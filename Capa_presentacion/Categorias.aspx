<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaestra.Master" AutoEventWireup="true" CodeBehind="Categorias.aspx.cs" Inherits="Capa_presentacion.Categorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="tipo_tarea" runat="server">
     <a>Categorias</a>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="body" runat="server">

    <div class="content-body">

              

              <div class="container-fluid">

                <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Lista de Categorias</h4>
                          </div>

               <div class="card-body">

                <div class="input-group col-lg-12 ">
         
                     <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                                
                            </div>
                        </div>
                
                      <div class="col-lg-1">

                      </div>
                        <div class="col-lg-2">
                            <div class="input-group flex-nowrap">
                           <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Agregar categoria
                            </button>
                                </div>
                        </div>
                 
                 </div>
     

                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="example3" class="display" style="min-width: 845px">
                                        <thead>
                                            
                                            <th>Nombre</th>
                                            <th>Opciones</th>
                                          </thead>
                                       
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

     </div>
    </div>




<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar Nuevo categoria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
       <div class="modal-body">

                <div class="col-lg-12">
                    <label for="">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Ingrese Nombre"><br>
                </div>

            </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onclick="Registrar()">Guardar</button>
      </div>



    </div>
  </div>
</div>



<div class="modal fade" id="EditarModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Editar categoria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
           <div class="col-lg-12">
                    <input type="text" id="id_edith" hidden>
                    <label for="">Nombre</label>
                    <input type="text" class="form-control" id="edith_nombre" placeholder="Ingrese Nombre"><br>
           </div>

         

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
        <button type="button" class="btn btn-primary" onclick="ActulizarDatos()">Guardar</button>
      </div>
    </div>
  </div>
</div>
</div>

</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="tipojs" runat="server">

    <script>
             $(document).ready(function () {
                listar()

             });
    </script>
          <script src="scrip/categorias.js"></script>  

</asp:Content>
