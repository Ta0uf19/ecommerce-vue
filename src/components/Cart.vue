<template>
    <div class="container">
        <div class="shopping-cart">
            <div class="shopping-cart-header">
                <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">3</span>
                <div class="shopping-cart-total">
                    <span class="lighter-text">Total:</span>
                    <span class="main-color-text">$2,229.97</span>
                </div>
            </div> <!--end shopping-cart-header -->

            <ul class="shopping-cart-items">
                <li class="clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg" alt="item1" />
                    <span class="item-name">Sony DSC-RX100M III</span>
                    <span class="item-price">$849.99</span>
                    <span class="item-quantity">Quantity: 01</span>
                </li>

                <li class="clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item2.jpg" alt="item1" />
                    <span class="item-name">KS Automatic Mechanic...</span>
                    <span class="item-price">$1,249.99</span>
                    <span class="item-quantity">Quantity: 01</span>
                </li>

                <li class="clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item3.jpg" alt="item1" />
                    <span class="item-name">Kindle, 6" Glare-Free To...</span>
                    <span class="item-price">$129.99</span>
                    <span class="item-quantity">Quantity: 01</span>
                </li>
            </ul>

            <a href="#" class="btn btn-primary">Checkout</a>
        </div> <!--end shopping-cart -->
    </div> <!--end container -->
</template>

<script>
    export default {
        name: "Cart"
    }
</script>

<style scoped>

</style>
