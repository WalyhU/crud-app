const { Router } = require('express')
const router = Router()

const {
    renderNoteForm,
    createNewNote,
    renderClientForm,
    renderPrintContrato,
    createNewClient,
    renderProfile,
    renderNotes,
    renderEditForm,
    renderPrintRecibo,
    renderProfileEditForm,
    updateNote,
    updateProfile,
    deleteNote,
    renderContratoForm,
    createNewContrato
} = require('../controllers/notes.controller');

const { isAuthenticated } = require ('../helpers/auth');

// Get Profile
router.get('/profile', isAuthenticated, renderProfile);

// New Note
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote);

// New Client
router.get('/clients/add', isAuthenticated, renderClientForm);

router.post('/clients/new-client', isAuthenticated, createNewClient);

// New Contrato
router.get('/contrato/add', isAuthenticated, renderContratoForm);

router.post('/contrato/new-contrato', isAuthenticated, createNewContrato);

// Print Contrato
router.get('/contrato/:id', isAuthenticated, renderPrintContrato)

// Get All note
router.get('/notes', isAuthenticated, renderNotes);

// Edit notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)

router.put('/notes/edit/:id', isAuthenticated, updateNote)

// Print Recibo
router.get('/notes/recibo/:ind/:id', isAuthenticated, renderPrintRecibo)

// Print Contrato
router.get('/notes/recibo/:ind/:id', isAuthenticated, renderPrintRecibo)

// Edit profiles
router.get('/profile/edit/:id', isAuthenticated, renderProfileEditForm)

router.put('/profile/edit/:id', isAuthenticated, updateProfile)

// Delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router