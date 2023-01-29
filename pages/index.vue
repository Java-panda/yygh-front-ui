<template>
  <div class="home page-component">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 2" :key="item">
        <img src="~assets/images/web-banner1.png" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索 -->
    <div class="search-container">
      <div class="search-wrapper">
        <div class="hospital-search">
          <el-autocomplete
            class="search-input"
            prefix-icon="el-icon-search"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            :trigger-on-focus="false"
            placeholder="点击输入医院名称"
            @select="handleSelect"
          >
            <span
              slot="suffix"
              class="search-btn v-link highlight clickable selected"
              >搜索
            </span>
          </el-autocomplete>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <div class="title">医院</div>
          <div>
            <div class="filter-wrapper">
              <span class="label">等级：</span>
              <div class="condition-wrapper">
                <span class="item v-link highlight clickable" :class="0==hostypeActiveIndex?'selected':''" @click="hostypeSelect('', 0)">全部</span>
                <span v-for="(hostype,index) in hostypeList" 
                :key="index" class="item v-link clickable" 
                @click="hostypeSelect(hostype.value, index+1)" 
                :class="(index+1)==hostypeActiveIndex?'selected':''"> 
                {{ hostype.name }} 
                </span>
              </div>
            </div>
            <div class="filter-wrapper">
              <span class="label">地区：</span>
              <div class="condition-wrapper">
                <span class="item v-link highlight clickable" :class="0==provinceActiveIndex?'selected':''" @click="districtSelect('', 0)">全部 </span>
                <span v-for="(district,index) in districtList" 
                :key="index" class="item v-link clickable" 
                @click="districtSelect(district.value, index+1)"
                :class="(index+1)==provinceActiveIndex?'selected':''"> {{ district.name }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="v-scroll-list hospital-list">

          <div class="v-card clickable list-item" v-for="(hosp,index) in hospitals" :key="index">
            <div class="">
              <div class="hospital-list-item hos-item" index="0">
                <div class="wrapper">
                  <div class="hospital-title">{{hosp.hosname}}</div>
                  <div class="bottom-container">
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      {{hosp.param.hostype}}
                    </div>
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      每天{{hosp.bookingRule.releaseTime}}放号
                    </div>
                  </div>
                </div>
                <img
                  :src="'data:image/jpeg;base64,' + hosp.logoData"
                  :alt="hosp.hosname"
                  class="hospital-img"
                />
              </div>
            </div>
          </div>



        </div>
      </div>
      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">
            <div class="title">常见科室</div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">神经内科 </span>
            <span class="item v-link clickable dark">消化内科 </span>
            <span class="item v-link clickable dark">呼吸内科 </span>
            <span class="item v-link clickable dark">内科 </span>
            <span class="item v-link clickable dark">神经外科 </span>
            <span class="item v-link clickable dark">妇科 </span>
            <span class="item v-link clickable dark"> 产科 </span>
            <span class="item v-link clickable dark">儿科 </span>
          </div>
        </div>
        <div class="space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >关于延长北京大学国际医院放假的通知
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >北京中医药大学东方医院部分科室医生门诊医
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                武警总医院号源暂停更新通知
              </span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                首都医科大学附属北京潞河医院老年医学科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >中日友好医院中西医结合心内科门诊停诊公告
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dictApi from '@/api/cmn/dict'
import hospApi from '@/api/hosp/hospital'
export default {
  asyncData({params, error}) {
    return hospApi.listPageHospital(1,10,{})
      .then(res => {
        console.log(res.data)
        return {
          hospitals: res.data.content,
          total: res.data.totalElements
        }
      })
      .catch()
  },
  data() {
    return {
      hospitalQueryVo: {},
      page: 1,
      limit: 10,
      total: 0,
      state: '',
      hosname: '', //医院名称
      hostypeList: [], //医院等级集合
      districtList: [], //地区集合
      hostypeActiveIndex: 0,
      provinceActiveIndex: 0,
      suggestions: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      dictApi.getDictListByDictCode('Hostype')
        .then(res => {
          this.hostypeList = res.data
        })
        .catch()
      dictApi.getDictListByDictCode('beijing')
        .then(res => {
          this.districtList = res.data
        })
        .catch()
    },
    hostypeSelect(value,index){
      this.hostypeActiveIndex = index
      this.hospitalQueryVo.hostype = value
      this.getListPage()
    },
    districtSelect(value,index){
      this.provinceActiveIndex = index
      this.hospitalQueryVo.districtCode = value
      this.getListPage()
    },
    getListPage(){
      hospApi.listPageHospital(this.page,this.limit,this.hospitalQueryVo)
        .then(res => {
          console.log(this.page,this.limit,this.hospitalQueryVo,res.data)
          this.hospitals = res.data.content,
          this.total = res.data.totalElements
        })
        .catch()
    },
    querySearchAsync(queryString,cb) {
      console.log(queryString)
      this.suggestions = [];
      if(queryString.length>0){
        hospApi.getHospitalByHosname(queryString)
          .then(res => {
            if(res.data){
              res.data.forEach(element => {
                this.suggestions.push({'value':element.hosname})
                //cb是回调函数，返回筛选出的结果数据到输入框下面的输入列表
                console.log(this.suggestions)
                cb(this.suggestions);
              });
            }
          })
          .catch()
      }
    },
    handleSelect() {
      console.log(this.state)
      hospApi.getHospitalByHosname(this.state)
          .then(res => {
            if(res.data){
              this.hospitals = res.data
            }
          })
          .catch()
    }
  }
};
</script>