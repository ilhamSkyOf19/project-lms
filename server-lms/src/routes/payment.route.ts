import express, { Router } from 'express';
import handlePayment from '../controllers/payment.controller';

const paymentRoutes: Router = express.Router();

paymentRoutes.post('/handle-payment-midtrans', handlePayment)


export default paymentRoutes;