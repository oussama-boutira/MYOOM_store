import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Order from '../models/orderSchema.js';

const router = express.Router();

// Get all orders (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('GET /api/orders - User:', req.user);
    
    // Check if user is admin
    if (req.user.role !== 'admin') {
      console.log('Access denied: User is not admin. Role:', req.user.role);
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    console.log('Fetching orders...');
    const orders = await Order.find()
      .populate('userId', 'email firstname lastname')
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${orders.length} orders`);
    res.json(orders);
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('POST /api/orders - Request body:', req.body);
    const { phone, address, items, totalAmount } = req.body;
    
    const order = new Order({
      userId: req.user._id,
      phone,
      address,
      items,
      totalAmount
    });

    console.log('Saving new order:', order);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error in POST /api/orders:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    console.log('GET /api/orders/my-orders - User ID:', req.user._id);
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${orders.length} orders for user`);
    res.json(orders);
  } catch (error) {
    console.error('Error in GET /api/orders/my-orders:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('GET /api/orders/:id - Order ID:', req.params.id);
    const order = await Order.findOne({
      _id: req.params.id,
      ...(req.user.role !== 'admin' ? { userId: req.user._id } : {})
    }).populate('items.productId');
    
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error in GET /api/orders/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('PATCH /api/orders/:id - Order ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // Check if user is admin
    if (req.user.role !== 'admin') {
      console.log('Access denied: User is not admin. Role:', req.user.role);
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    const { status } = req.body;
    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      console.log('Invalid status:', status);
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'email firstname lastname')
     .populate('items.productId');

    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Order updated successfully');
    res.json(order);
  } catch (error) {
    console.error('Error in PATCH /api/orders/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete order (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('DELETE /api/orders/:id - Order ID:', req.params.id);
    
    // Check if user is admin
    if (req.user.role !== 'admin') {
      console.log('Access denied: User is not admin. Role:', req.user.role);
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Order deleted successfully');
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/orders/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router; 