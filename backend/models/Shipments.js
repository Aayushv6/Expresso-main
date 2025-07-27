// models/Shipments.js
const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true },
    carrierAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    shipmentDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    recipientEmail: { type: String, required: true},
    productname: { type: String, required: true},
    quantity: { type: Number, required: true}
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
