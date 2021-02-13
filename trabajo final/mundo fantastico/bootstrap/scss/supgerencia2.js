let misDatos = [
    { id: 1, name: "Producto 01", price: 499.99, currency: "$" },
    { id: 2, name: "Producto 02", price: 249.99, currency: "$" },
    { id: 3, name: "Producto 03", price: 239.99, currency: "$" },
    { id: 4, name: "Producto 04", price: 509.99, currency: "$" },
    { id: 5, name: "Producto 05", price: 359.99, currency: "$" },
    { id: 6, name: "Producto 06", price: 149.99, currency: "$" }
]

//Se podria plnatear un Select para cambiar el tipo de moneda
//o bien tomar la configuracion regional??
const currency = "$";

const store = new Vuex.Store({
    state: {
        lista_productos: misDatos,
        producto: {
            id: 0,
            name: "",
            price: 0,
            currency: currency,
        },
        action: "",
    },
    methods: {
        ultimo_id: function (state) {
            return state.lista_productos[state.lista_productos.length - 1].id + 1;
        },
    },
    mutations: {
        setAction: function (state, text) {
            state.action = text;
        },
        actionProducto: function (state, action) {
            switch (action) {
                case 'Agregar':
                    state.producto.id = state.lista_productos[state.lista_productos.length - 1].id + 1
                    state.lista_productos.push({
                        id: state.producto.id,
                        name: state.producto.name,
                        price: state.producto.price,
                        currency: currency
                    });
                    break;
                case 'Editar':
                    state.lista_productos = state.lista_productos.map((prod) => {
                        if (prod.id === state.producto.id) {
                            prod.name = state.producto.name;
                            prod.price = state.producto.price;
                        }
                        return prod;
                    });
                    break;
                case 'Eliminar':
                    state.lista_productos = state.lista_productos.filter((prod) =>
                        prod.id !== state.producto.id)
                    break;
                default:
                    break;
            }
            state.producto.id = 0;
            state.producto.name = "";
            state.producto.price = 0;
        },
        editarProducto: function (state, e) {
            state.action = 'Editar';
            state.producto.id = state.lista_productos[e].id;
            state.producto.name = state.lista_productos[e].name;
            state.producto.price = state.lista_productos[e].price;
        },
        removerProducto: function (state, e) {
            state.action = 'Eliminar';
            state.producto.id = state.lista_productos[e].id;
            state.producto.name = state.lista_productos[e].name;
            state.producto.price = state.lista_productos[e].price;

        },
    }
}
);
const app = new Vue({
    el: "#app",
    store,
    data: {
        titulo: "CRUD de Productos",
        showModal: false,
    },
    computed: {
        ...Vuex.mapState(['lista_productos', 'action'])
    },
    methods: {
        ...Vuex.mapMutations(['actionProducto', 'editarProducto', 'removerProducto', 'setAction'])
    }
})


