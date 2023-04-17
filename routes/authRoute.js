const express = require('express')
const router = express.Router();
const {createUser, loginUserCtrl, getallUser, getaUser, deleteUser, updatedUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus} = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

router.post('/register' ,createUser)
router.put('/password',authMiddleware,updatePassword)
router.post('/login' ,loginUserCtrl)
router.get('/all-users' , getallUser)
router.get('/refresh',handleRefreshToken)
router.get('/logout',logout)
router.post('/admin-login' ,loginAdmin)
router.get('/wishlist' ,authMiddleware, getWishlist)
router.post('/cart',authMiddleware,userCart )
router.get('/cart',authMiddleware,getUserCart )
router.post('/cart/applycoupon',authMiddleware,applyCoupon )
router.post('/cart/cash-order',authMiddleware, createOrder )
router.get('/get-orders',authMiddleware,getOrders )


router.put('/edit-user',authMiddleware , updatedUser)

router.put('/save-address',authMiddleware , saveAddress)
router.delete('/empty-cart',authMiddleware,emptyCart )
router.post('/forgot-password-token',forgotPasswordToken)

router.put('/order/update-order/:id',authMiddleware,isAdmin , updateOrderStatus)
router.put('/block-user/:id',authMiddleware , blockUser)
router.put('/unblock-user/:id',authMiddleware , unblockUser)
router.put('/reset-password/:token',resetPassword)
router.get('/:id',authMiddleware,isAdmin , getaUser)
router.delete('/:id' , deleteUser)

module.exports = router;