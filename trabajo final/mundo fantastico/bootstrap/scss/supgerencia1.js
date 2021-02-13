Vue.component('form-modal', {
    template: `
    <div class="modal fade" id="showFormModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h4 class="modal-title">{{action}} Producto</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" id="name" class="form-control" required autocomplete="off" v-model="producto.name" :disabled="action == 'Eliminar'">
                    </div>
                    <div class="form-group">
                        <label>Precio en {{ producto.currency }}</label>
                        <input type="numbre" id="price" class="form-control" required autocomplete="off" v-model="producto.price" :disabled="action == 'Eliminar'">
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar" @click="showModal = !showModal" 
                    <input type="button" class="btn btn-success" data-dismiss="modal" @click="actionProducto(action)" value="Aceptar">
                </div>
            </form>
        </div>
    </div>
    </div>`,
    computed: {
        ...Vuex.mapState(['producto', 'action'])
    },
    methods: {
        ...Vuex.mapMutations(['actionProducto', 'setAction'])
    }
})