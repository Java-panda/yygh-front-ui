import request from '@/utils/request'

export default {
  getHospitalByHosname(hosname) {
    return request({
      url: `/admin/hosp/hospital/getHospitalByHosname/${hosname}`,
      method: 'get'
    })
  },
  listPageHospital(page, limit, hospitalQueryVo) {
    return request({
      url: `/admin/hosp/hospital/listPageHospital/${page}/${limit}`,
      method: 'post',
      data: hospitalQueryVo
    })
  }
}
