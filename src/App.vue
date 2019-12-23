<template>
  <div id="app" class="w_100 h_100 location_tracking">
        <Row class="nav">
            <Col span="4" class="logo">
                <img src="./assets/images/logo.png" alt="">
            </Col>
            <Col span="2" offset="18">
                <Menu theme="dark" mode="horizontal" active-name="1">
                    <MenuItem name="1">
                        <Icon type="md-locate" />
                        位置追踪
                    </MenuItem>
                </Menu>
            </Col>
        </Row>
        <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    .location_tracking .nav{
        position: fixed!important;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color:rgba(0,0,0,.6);
        z-index: 9999;
    }
    .nav .logo img{
        width: 195px;
        height: 40px;
        margin: 10px 10px;
    }
    .location_tracking .ivu-menu-dark{
        background:transparent!important;
    }
</style>
