const { Schema, model } = require("mongoose");

const DatosSchema = new Schema({
    user: { type: String, required: true },
    dpi: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    contrato: { type: String, required: false },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    restante: { type: Number, required: false }
}, {
    timestamps: true
})

module.exports = model('Datos', DatosSchema);