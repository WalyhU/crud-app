const { Schema, model } = require('mongoose');

const NoteSchema = new Schema ({
    cantidad: {
        type: Number,
        required: true
    },
    recibi: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    cantidadlet: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    restante: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema);