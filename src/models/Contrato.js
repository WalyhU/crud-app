const { Schema, model } = require("mongoose");

const ContratoSchema = new Schema({
    dia: { type: Number, required: true },
    mes: { type: String, required: true },
    year: { type: Number, required: true },
    user: { type: String, required: true, unique: true },
    dpi: { type: Number, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    estado: { type: String, required: true },
    cantlotes: { type: Number, required: true },
    medidas: { type: Number, required: true },
    total: { type: String, required: true },
    enganche: { type: String, required: true },
    pendiente: { type: String, required: true },
    nlotes: { type: Number, required: true },
    cuotas: { type: String, required: true },
    apartir: { type: String, required: true },
    hasta: { type: String, required: true },
    ref1no: { type: String, required: false },
    ref1nu: { type: Number, required: false },
    ref2no: { type: String, required: false },
    ref2nu: { type: Number, required: false },
}, {
    timestamps: true
})

module.exports = model('Contrato', ContratoSchema);