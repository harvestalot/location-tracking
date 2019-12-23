<template>
    <div class="content">
        <div class="search_inquire">
            <div>
                <Input v-model="containerNumber" size="large" placeholder="输入集装箱号查询" style="width: 360px; margin-right:10px;" />
                <Button type="primary" size="large" :loading="track_loading" @click="containerDetail">查询箱子</Button>
            </div>
            <div class="container_detail" v-show="container_detail">
                <Row class="c detail_title">
                    <Col :span="3" class="national_flag"><img src="../assets/images/national_flag.png" alt=""></Col>
                    <Col :span="18">集装箱号：{{ equipmentDetailData.container_number }}</Col>
                    <Col :span="2" class="tr"><Icon type="md-close" size="18" class="pointer"  @click="close_detail"/></Col>
                </Row>
                <div>
                    <Tabs value="0">
                        <TabPane label="设备信息" name="0">
                            <Row class="line_25">
                                <Col :span="12">
                                    <Row>
                                        <Col :span="col_label.label">设备ID</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.serialNumber }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">国家编号</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.countryCode }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">区域编号</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.zipCode }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">运营商编号</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.isp }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">经度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.longitude }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">纬度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.latitude }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">基站编号</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.baseStationCode }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">基站强度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.signalIntensity }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">X轴</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.xAxis }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">Y轴</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.yAxis }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">Z轴</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.zAxis }}</Col>
                                    </Row>
                                </Col>
                                <Col :span="12">
                                    <Row>
                                        <Col :span="col_label.label">设备状态</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.boxStatus === 0?"静止":"运动" }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">运行速度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.speed }}Km/h</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">海拔高度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.altitude }}米</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">板载湿度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.onboardHumidity }}%</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">板载温度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.onboardTemperature }}℃</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">箱外温度</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.outsideTemperature }}℃</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">当次耗电量</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.powerConsumption }}mAh</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">累计耗电量</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.totalPowerConsumption }}mAh</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">电池电压</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.batteryVoltage }}V</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">剩余电量</Col>
                                        <Col :span="col_label.value">{{ equipmentDetailData.electricQuantity }}%</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">上报时间</Col>
                                        <Col :span="col_label.value">{{ this.$commonMeans.formatDateMinuteTime(new Date(equipmentDetailData.timestampUtc*1000)) }}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane label="箱况信息" name="1">
                            <Row class="line_25">
                                <Col :span="12">
                                    <Row>
                                        <Col :span="col_label.label">箱号</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.code }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">箱型</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.typeName }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">结构</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.structure }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">箱况</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.boxCondition }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">材质</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.texture }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">自重</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.selfWeight }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">最大载重</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.maxLoad }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">容积</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.cubage }}</Col>
                                    </Row>
                                </Col>
                                <Col :span="12">
                                    <Row>
                                        <Col :span="col_label.label">所有权</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.ownership }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">经营权</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.powerManagement }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">使用权</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.rightToUse }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">出厂日期</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.productionDate }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">启用日期</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.commissioningDate }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">上次维保</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.lastMaintainedDate }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">更新时间</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.condition.updated }}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="24"  class="img_url">
                                    <img v-for="(item, index) in containerDetailData.condition.img_url" :src="item" :key="index" alt="">
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane label="载货信息" name="2">
                            <Row class="line_25">
                                <Col :span="14" >
                                    <Row>
                                        <Col :span="col_label.label">货名名称</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.goodsName }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">净重</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.wight }}吨</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">磅重</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.poundWeight }}吨</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">体积</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.volume }}m³</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">件数</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.unitsNumber }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">装载时间</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.loadingTime }}</Col>
                                    </Row>
                                    <Row>
                                        <Col :span="col_label.label">基站编号</Col>
                                        <Col :span="col_label.value">{{ containerDetailData.carryCargo.baseStationCode }}</Col>
                                    </Row>
                                </Col>
                                <Col :span="8">
                                    <Row>
                                        <Col :span="24" v-for="(item, index) in containerDetailData.carryCargo.img_url" :key="index"  class="img_url">
                                            <img :src="item" alt="">
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane label="当前线路" name="3" class="line_container">
                            <Row>
                                <Col :span="8" class="city_name">{{ containerDetailData.line.startCityName }}</Col>
                                <Col :span="8" class="line_icon"><img src="../assets/images/line.png"/></Col>
                                <Col :span="8" class="city_name">{{ containerDetailData.line.arriveCityName }}</Col>
                            </Row>
                            <Row>
                                <Col :span="8">{{ containerDetailData.line.shipmentTime }}</Col>
                                <Col :span="8" offset="8">{{ containerDetailData.line.arriveTime }}</Col>
                            </Row>
                            <Row class="ft_14 electron_code">
                                <Col :span="24">电子运单号：{{ containerDetailData.line.code }}</Col>
                            </Row>
                            <Row class="ft_14">
                                <Col :span="8">已运行{{ containerDetailData.line.runningTime }}小时（{{ containerDetailData.line.runningSpeed }}Km）</Col>
                                <Col :span="8" offset="8">平均速度：{{ containerDetailData.line.averageSpeed }}Km/h</Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </div>
                <div >
                    <Button type="info" class="mr_10"  @click="container_detail = false;">关注</Button>
                    <Button type="primary" :loading="track_loading" @click="track_date_visible = true;">轨迹</Button>
                </div>
                <div class="po_r">
                    <transition name="slide-fade">
                        <div class="track_date" v-if="track_date_visible">
                            <DatePicker type="daterange" v-model="track_daterange" format="yyyy-MM-dd" placeholder="请选择日期范围" style="width: 290px"></DatePicker>
                            <Button type="primary" class="ml_10" :loading="track_loading" @click="containerTracking">查询</Button>
                            <Button class="ml_10"  @click="track_date_visible = false;">取消</Button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div id="location_tracking_container" class="location_tracking_container"></div>
    </div>
</template>

<script>
export default {
    name: 'LocationTracking',
    data () {
        return {
            map:"",
            cluster_coverage:"",
            track_date_visible: false,
            col_label:{
                label:9,
                value:15
            },
            container_detail: false,
            track_loading:false,
            containerNumber:"",
            track_daterange:[new Date(new Date().getTime() - (6*86400000)), new Date()],
            equipmentDetailData:{
                container_number:"",
                serialNumber: "",
                countryCode:"",
                zipCode:"",
                isp:"",
                longitude:"",
                latitude:"",
                baseStationCode:"",
                signalIntensity:"",
                xAxis:"",
                yAxis:"",
                zAxis:"",
                status:"",
                speed:"",
                altitude:"",
                onboardHumidity:"",
                onboardTemperature:"",
                outsideTemperature:"",
                powerConsumption:"",
                totalPowerConsumption:"",
                batteryVoltage:"",
                electricQuantity:"",
                timestampUtc:""
                
            },
            containerDetailData:{
                condition:{
                    code: "FDGG0012255",
                    typeName:"20英尺弧型罐式集装箱",
                    structure:"板架固定式集装箱",
                    boxCondition:"新造箱",
                    texture:"不锈钢",
                    selfWeight:10,
                    maxLoad:1520,
                    cubage:35.5,
                    ownership:"2+N",
                    powerManagement:"互联运力",
                    rightToUse:"曹妃甸",
                    productionDate:"2012年1月13日",
                    commissioningDate:"2013年1月13日",
                    lastMaintainedDate:"2011年1月13日",
                    updated:"2019-09-10 14:00",
                    img_url:[
                        "http://192.168.1.220:8888//group1/M00/00/3D/wKgB3F0RffGATDpFAADMApOpaeQ090.jpg",
                        "http://192.168.1.220:8888//group1/M00/00/3D/wKgB3F0RffGATDpFAADMApOpaeQ090.jpg",
                        "http://192.168.1.220:8888//group1/M00/00/3D/wKgB3F0RffGATDpFAADMApOpaeQ090.jpg"
                    ]
                },
                carryCargo:{
                    goodsName:"铁矿石",
                    wight:12530,
                    poundWeight:156232,
                    volume:25.6,
                    unitsNumber:1,
                    loadingTime:"2018-11-23  14:02",
                    baseStationCode:"001",
                    img_url:[
                        "http://192.168.1.220:8888//group1/M00/00/3D/wKgB3F0RffGATDpFAADMApOpaeQ090.jpg",
                        "http://192.168.1.220:8888//group1/M00/00/3D/wKgB3F0RffGATDpFAADMApOpaeQ090.jpg",
                        "http://192.168.1.220:8888//group1/M00/00/3D/wKgB3F0RffGATDpFAADMApOpaeQ090.jpg"
                    ]
                },
                line:{
                    startCityName:"乌鲁木齐",
                    arriveCityName:"曹妃甸",
                    shipmentTime:"2018-11-23  14:02",
                    arriveTime:"2018-12-02  14:02",
                    code:"WB2018112209393500030",
                    runningTime:2,
                    runningSpeed:200,
                    averageSpeed:156
                }
            },
            congruentPoint:[],
            haveGoLinePath:[],
            notWalkPath:[
                [
                    112.1484375,
                    30.50548389892728
                ],
                [
                    112.19238281249999,
                    29.38217507514529
                ],
                [
                    112.47802734375,
                    27.21555620902969
                ],
                [
                    112.52197265625,
                    26.07652055985697
                ],
                [
                    112.78564453124999,
                    25.3241665257384
                ],
                [
                    112.06054687499999,
                    23.563987128451217
                ],
                [
                    112.82958984375,
                    23.58412603264412
                ],
                [
                    113.15917968749999,
                    22.917922936146045
                ],
                [
                    113.466796875,
                    22.187404991398775
                ]
            ]
        }
    },
    mounted(){
            var map = new AMap.Map("location_tracking_container", {
                resizeEnable: true,
                center: [105, 36],
                zoom: 5
            });
        this.map = map;
        this.containerDetail();
    },
    methods:{
        loadMap(){
            var _this = this;
            // var cluster_coverage, markers = [];
            var markers = [];
			this.map.setZoomAndCenter(5, [105, 36]);
            // var map = new AMap.Map("location_tracking_container", {
            //     resizeEnable: true,
            //     center: [105, 36],
            //     zoom: 5
            // });
            for (var i = 0; i < this.congruentPoint.length; i += 1) {
                const item = this.congruentPoint[i];
                var content_str = "";
                if(i % 3 === 0){
                    content_str += '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>';
                }else{
                    content_str += '<div style="background-color: hsla(30, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(30, 100%, 40%); border-radius: 12px; box-shadow: hsl(30, 100%, 50%) 0px 0px 1px;"></div>';
                }
                var marker = new AMap.Marker({
                    position: this.$commonMeans.lngLatChange([item.longitude, item.latitude]),
                    extData:item,
                    content:content_str,
                    offset: new AMap.Pixel(-15, -15)
                });
                marker.on('click', function (ev) {
                    _this.map.setZoomAndCenter(17, _this.$commonMeans.lngLatChange([ev.target.B.extData.longitude, ev.target.B.extData.latitude]));
                    _this.containerNumber = ev.target.B.extData.container_number;
                    _this.containerDetail();
                });
                markers.push(marker);
            }
            var count = markers.length;
            var _renderClusterMarker = function (context) {
                var factor = Math.pow(context.count / count, 1 / 18);
                var div = document.createElement('div');
                var Hue = 180 - factor * 180;
                var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
                var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
                var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
                var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
                div.style.backgroundColor = bgColor;
                var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
                div.style.width = div.style.height = size + 'px';
                div.style.border = 'solid 1px ' + borderColor;
                div.style.borderRadius = size / 2 + 'px';
                div.style.boxShadow = '0 0 1px ' + shadowColor;
                div.innerHTML = context.count;
                div.style.lineHeight = size + 'px';
                div.style.color = fontColor;
                div.style.fontSize = '14px';
                div.style.textAlign = 'center';
                context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
                context.marker.setContent(div);
            };
            this.cluster_coverage = new AMap.MarkerClusterer(this.map, markers, {
                gridSize: 80,
                renderClusterMarker: _renderClusterMarker
            });
        },
        containerDetail(){
            this.map.clearMap();
            this.cluster_coverage? this.map.remove(this.cluster_coverage):"";
            this.loadMap();
            this.http.get(this.ports.location.container+'?containerNumber='+this.containerNumber, res => {
                if (res.success) {
                    if(this.containerNumber){
                        if(res.data.results.length === 1){
                            this.container_detail = true;
                            this.equipmentDetailData = res.data.results[0];
                            this.map.setZoomAndCenter(17, this.$commonMeans.lngLatChange([this.equipmentDetailData.longitude, this.equipmentDetailData.latitude]));
                        }else{
                            this.$Message.warning("暂无该箱子的信息，请输入其他箱号查询。");
                        }
                    }else{
                        this.cluster_coverage? this.map.remove(this.cluster_coverage):"";
                        this.congruentPoint = res.data.results;
                        this.loadMap();
                    }
                } else {
                    // 返回错误的处理
                }
            });
        },
        containerTracking(){
            this.cluster_coverage? this.map.remove(this.cluster_coverage):"";
            this.haveGoLinePath = [];
            this.http.get(this.ports.location.tracking+'?device='+this.equipmentDetailData.serialNumber
                +'&startTime='+(this.track_daterange[0]?(new Date(this.track_daterange[0]).getTime()/1000+"").split(".")[0]:"")+
                '&endTime='+(this.track_daterange[1]?(new Date(this.track_daterange[1]).getTime()/1000+"").split(".")[0]:""), res => {
                if (res.success) {
                    if(res.data.results.length > 0){
                        for(var i = 0; i < res.data.results.length; i++){
                            const item = res.data.results[i];
                            this.haveGoLinePath.push({ lnglat: this.$commonMeans.lngLatChange([item.longitude, item.latitude]), extData: item});
                        }
                        this.viewTrack();
                    }else{
                        this.$Message.warning("暂无该时间段的路线轨迹，请选择其他日期查询。");
                    }
                } else {
                    // 返回错误的处理
                }
            })
        },
        viewTrack(){
            var marker, haveGoLinePath = [];
            // var map = new AMap.Map("location_tracking_container", {
            //     resizeEnable: true,
            //     expandZoomRange:true,
            //     // center: [116.397428, 39.90923],
            //     // zooms: [3, 20]
            // });
            // 创建一个 Icon
            var startIcon = new AMap.Icon({
                // 图标尺寸
                size: new AMap.Size(52, 26),
                // 图标的取图地址
                image: 'http://192.168.1.60:8800/app/icon/icon.png',
                // 图标所用图片大小
                imageSize: new AMap.Size(52, 26),
                // 图标取图偏移量
                imageOffset: new AMap.Pixel(0, 0)
            });
            for(var i = 0; i < this.haveGoLinePath.length; i++){
                var item = this.haveGoLinePath[i];
                haveGoLinePath.push(item.lnglat);
                if(i === 0){
                    marker = new AMap.Marker({
                        map: this.map,
                        position: this.haveGoLinePath[0].lnglat,
                        extData:this.haveGoLinePath[0].extData,
                        icon: new AMap.Icon({ 
                            image: "http://192.168.1.60:8800/app/icon/qidian.png",
                            size: new AMap.Size(32, 32),
                            imageOffset: new AMap.Pixel(0, 0)
                        }),
                        offset: new AMap.Pixel(-16, -32),
                    });
                }else if(i === this.haveGoLinePath.length - 1){
                    marker = new AMap.Marker({
                        map: this.map,
                        position: this.haveGoLinePath[this.haveGoLinePath.length - 1].lnglat,
                        extData:this.haveGoLinePath[this.haveGoLinePath.length - 1].extData,
                        icon: new AMap.Icon({ 
                            image: "http://192.168.1.60:8800/app/icon/zhongdian.png",
                            size: new AMap.Size(32, 32),
                            imageOffset: new AMap.Pixel(0, 0)
                        }),
                        offset: new AMap.Pixel(-16, -32),
                    });
                }else{
                    marker = new AMap.Marker({
                        map: this.map,
                        position: item.lnglat,
                        extData:item.extData,
                        icon: new AMap.Icon({ 
                            image: "http://192.168.1.60:8800/app/icon/tujingdian.png",
                            size: new AMap.Size(14, 14),
                            imageOffset: new AMap.Pixel(0, 0)
                        }),
                        // icon: startIcon,
                        offset: new AMap.Pixel(-7, -7),
                        // autoRotation: true,
                        // angle:-90,
                    });
                }
                var _this = this;
                marker.on('click', function (ev) {
                    _this.map.setZoomAndCenter(17, _this.$commonMeans.lngLatChange([ev.target.B.extData.longitude, ev.target.B.extData.latitude]));
                    _this.equipmentDetailData = ev.target.B.extData;
                });
            }
            // 绘制轨迹
            var polyline = new AMap.Polyline({
                map: this.map,
                path: haveGoLinePath,
                showDir:true,
                strokeColor: "#6C0A1A",  //线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 3,      //线宽
                // strokeStyle: "solid"  //线样式
            });
            var passedPolyline = new AMap.Polyline({
                map: this.map,
                strokeColor: "#AF5",  //线颜色
                strokeWeight: 3,      //线宽
            });
            // // 未走路径
            // var notWalkPolyline = new AMap.Polyline({
            //     map: map,
            //     path: this.notWalkPath,
            //     strokeColor: "#ddd",  //线颜色
            //     strokeOpacity: 1,     //线透明度
            //     strokeWeight: 6,      //线宽
            // });
            marker.on('moving', function (e) {
                passedPolyline.setPath(e.passedPath);
            });
            this.map.setFitView();
            //开始动画
            // marker.moveAlong(this.haveGoLinePath, 200);

        },
        close_detail(){
            this.map.clearMap();
            this.containerNumber = "";
            this.container_detail = false;
            this.loadMap();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .line_25{
        line-height: 25px;
    }
    .content{
        position: relative;
        height: 100%;
    }
    .location_tracking_container{
        width: 100%;
        height: 100%;
    }
    .search_inquire{
        position: absolute;
        left: 0;
        top: 70px;
        width: 500px;
        padding: 15px 15px;
        background-color: #fff; 
        z-index: 99999;
    }
    .container_detail{
        margin-top: 15px;
    }
    .detail_title{
        line-height: 35px;
        padding: 10px 10px 0;
        background-color: #f5f5f5;
    }
    .national_flag img{
        width: 45px;
        height: 30px;
    }
    .img_url img{
        width: 100px;
        height: 80px;
        margin-left: 20px;
        box-shadow: 1px 3px solid #ddd;
    }
    .line_container{
        padding-top: 30px;
        padding-left: 10px;
    }
    .city_name{
        font-size: 22px;
    }
    .electron_code{
        margin-top: 30px;
        margin-bottom: 10px;
    }
    .line_icon img{
        width: 100px;
        margin-top: 10px;
    }
    .track_date{
        position: absolute;
        left: -15px;
        top:-47px;
        width: 500px;
        padding: 15px 15px;
        background-color: #fff;
        box-shadow: 0 -2px 3px #ddd;
    }
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>