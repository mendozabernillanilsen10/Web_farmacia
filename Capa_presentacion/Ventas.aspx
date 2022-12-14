<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaestra.Master" AutoEventWireup="true" CodeBehind="Ventas.aspx.cs" Inherits="Capa_presentacion.Ventas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="tipo_tarea" runat="server">
    <p>Ventas</p>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="body" runat="server">
  



    <div class="content-body">

              <div class="container-fluid">



             

             

             

         </div>

                <div class="col-12">
                        <div class="card">
                           <div class="col-lg-12">
                             
                             <div class="card-header col-10">
                                <h4 class="card-title">Nueva Venta</h4>

                                 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#listarProducto">
                                   Guardar</button>
                            </div>

                            

                           </div>
                            

                            


               

               
              
               <div class="card-body">
                    <div class="input-group col-lg-12 ">
               <div class="col-lg-6">
                    <label for="">cliente</label>
                    <select class="form-control" name="state" id="cmdClientes"  style="width:100%;">
                    </select><br><br>
               </div>


             <div class="col-lg-1">
                   
             </div>

             <div class="col-lg-4">
                    <label for="">fecha</label>
                    <input type="date" placeholder="" class="form-control" id="fecha" name="fecha"
                    required="required" data-error="fecha  Inicio ">	
             </div>

         </div>





            <div class="input-group col-lg-12 ">
             
                
               <div class="col-lg-6">
                    <label for="">Comprobante</label>
                    <select class="form-control" name="state" id="cmdComprobante"  style="width:100%;">
                    </select><br><br>
               </div>


             <div class="col-lg-1">
                   
             </div>


             <div class="col-lg-4">
                    <label for="">Impuesto</label>
                    <input type="number" class="form-control" id="igv" placeholder="IGV"><br>
                </div>

         </div>

      <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
         <a data-toggle="modal" href="#myModal">

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#listarProducto">
           Agregar Producto
        </button>
             
         </a>
     </div>


    <br/>
    <br/>
    <table id="detalles" class="table table-striped table-bordered table-condensed table-hover">
       <thead style="background-color:#A9D0F5">
        <th>Opciones</th>
        <th>Articulo</th>
        <th>Cantidad</th>
        <th>Precio Venta</th>
        <th>Descuento</th>
        <th>Subtotal</th>
       </thead>
       <tfoot>
         <th>TOTAL</th>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         <th><h4 id="total">S/. 0.00</h4><input type="hidden" name="total_venta" id="total_venta"></th>
       </tfoot>
       <tbody>
         
       </tbody>
     </table>
               
                          
         </div>
     </div>

     </div>
    </div>






 
<div class="modal fade" id="listarProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Seleccione un Articulo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

       <div class="modal-body">
          <div class="card-body">
                                <div class="table-responsive">
                                    <table id="listarProductos" class="display" style="min-width: 845px">
                                        <thead>
                                    
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Presentacion</th>
                                            <th>stock</th>
                                            <th>tipo producto</th>
                                            <th>marca</th>
                                            <th>Estado</th>
                                            <th>Opciones</th>
                                          </thead>
                                       
                                    </table>
                                </div>
                            </div>
        </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
       
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
    <script src="scrip/ventas.js"></script>  
</asp:Content>
