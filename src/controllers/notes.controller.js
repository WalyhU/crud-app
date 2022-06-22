const notesCtrl = {};

const Note = require('../models/Note');
const User = require('../models/User');
const Datos = require('../models/Datos');
const Contrato = require('../models/Contrato');

notesCtrl.renderClientForm = async (req, res) => {
    if (!req.user.rol) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    } else {
        const users = await User.find();
        res.render('notes/new-client', { users });
    }
}

notesCtrl.createNewClient = async (req, res) => {
    if (!req.user.rol) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    } else {
        const { user, dpi, nombre, apellido, direccion, telefono } = req.body;
        const newDatos = new Datos({ user, dpi, nombre, apellido, direccion, telefono });
        await newDatos.save();
        req.flash('success_msg', 'Cliente añadido satisfactoriamente');
        res.redirect('/notes')
    }
}

notesCtrl.renderNoteForm = async (req, res) => {
    const datos = await Datos.find();
    res.render('notes/new-note', { datos });
}

notesCtrl.createNewNote = async (req, res) => {
    const { cantidad, recibi, direccion, cantidadlet, detalle, lugar, user } = req.body;
    const ress = await Datos.findOne({ user: req.body.user });
    const newNote = new Note({ cantidad, recibi, direccion, cantidadlet, detalle, lugar, user });
    cantidad_restante = Number(cantidad);
    restante = ress.restante - cantidad_restante;
    newNote.restante = restante;
    await newNote.save();
    await Datos.findOneAndUpdate({ user: req.body.user }, { restante });
    req.flash('success_msg', 'Recibo añadido satisfactoriamente');
    res.redirect('/notes')
}

notesCtrl.renderProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    const users = await User.find();
    const datos = await Datos.findOne({ user: req.user.id });
    const contrato = await Contrato.findOne({ user: req.user.id });
    const total_recibos = await Note.findOne({ user: req.user.id }).count();
    res.render('notes/profile', { user, users, datos, total_recibos, contrato });
}

notesCtrl.renderProfileEditForm = async (req, res) => {
    const users = await User.findById(req.params.id);
    if (!req.user.rol) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }
    res.render('notes/edit-profile', { users });
}

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find();
    const notes_user = await Note.find({ user: req.user.id });
    const user = await User.findById(req.user.id);
    res.render('notes/all-notes', { notes, user, notes_user });
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
}

notesCtrl.renderPrintRecibo = async (req, res) => {
    const note = await Note.findById(req.params.id);
    const ind = req.params.ind;
    if (!req.user.id) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }
    res.render('notes/imp-recibo', { note, ind });
}

notesCtrl.updateProfile = async (req, res) => {
    const { name, email } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email });
    req.flash('success_msg', 'Perfil actualizado satisfactoriamente');
    res.redirect('/profile');
}

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada satisfactoriamente');
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada satisfactoriamente');
    res.redirect('/notes')
}

notesCtrl.renderContratoForm = async (req, res) => {
    if (!req.user.rol) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }
    const datos = await Datos.find();
    res.render('notes/new-contrato', { datos });
}

notesCtrl.createNewContrato = async (req, res) => {
    const { dia, mes, year, user, dpi, nombre, direccion, edad, estado, cantlotes, medidas, total, enganche, pendiente, nlotes, cuotas, apartir, hasta, ref1no, ref1nu, ref2no, ref2nu } = req.body;
    const newContrato = new Contrato({ dia, mes, year, user, dpi, nombre, direccion, edad, estado, cantlotes, medidas, total, enganche, pendiente, nlotes, cuotas, apartir, hasta, ref1no, ref1nu, ref2no, ref2nu });
    await newContrato.save();
    req.flash('success_msg', 'Contrato añadido satisfactoriamente');
    res.redirect('/notes')
}

notesCtrl.renderPrintContrato = async (req, res) => {
    const contrato = await Contrato.findOne({ user: req.params.id });
    if (req.params.id == req.user.id || req.user.rol) {
        res.render('notes/imp-contrato', { contrato });
    } else if (req.params.id !== req.user.id || !req.user.rol) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }
}

module.exports = notesCtrl;