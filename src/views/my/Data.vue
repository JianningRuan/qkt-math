<template>
  <div class="white-wrapper flex flex-v">
    <BaseTit></BaseTit>
    <div class="flex1 data-box">
      <!--<div class="input-box flex flex-align-center pl pr">
        <span class="label">头像</span>
        <div class="flex1"></div>
        <div class="avatar">
          <img :src="pic || './images/stu-head.png'"/>
        </div>
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </div>-->
      <div class="input-box flex flex-align-center pl pr">
        <span class="label">姓名</span>
        <input class="flex1" type="text" v-model="name" placeholder="请输入学生姓名" @blur="onBlur" />
      </div>
      <div class="input-box flex flex-align-center pl pr" @click="openGradePicker">
        <span class="label">年级</span>
        <input class="flex1" type="text" v-model="grade" placeholder="请选择" readonly />
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </div>
      <div class="input-box flex flex-align-center pl pr" @click="openClassPicker">
        <span class="label">班级</span>
        <input class="flex1" type="text" v-model="className" placeholder="请选择" readonly />
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </div>
      <div class="input-box flex flex-align-center pl pr" @click="openAreaPicker">
        <span class="label">地区</span>
        <input class="flex1" type="text" v-model="area" placeholder="请选择" readonly />
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </div>
      <div class="input-box flex flex-align-center pl pr" @click="openSchoolPicker">
        <span class="label">学校</span>
        <input class="flex1" type="text" v-model="school" placeholder="请选择" readonly />
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </div>
    </div>
    <div class="data-box main pb">
      <a class="submit-btn light-btn" @click="submit">提交</a>
      <p class="tips">*每个学期只允许修改两次资料哦~</p>
      <p class="tips">*你的所有信息都会严格保护，不会用作他途</p>
    </div>
    <!--<BaseInnerPageHead :tit="tit" />
    <div class="main flex1 flex flex-v">
      <div class="home-box data-box flex1 flex flex-v">
        <div class="flex1">
          <div class="input-box flex flex-align-center">
            <span class="label">姓名</span>
            <input class="flex1" type="text" v-model="name" placeholder="请输入学生姓名" @blur="onBlur" />
          </div>
          <div class="input-box flex flex-align-center" @click="openGradePicker">
            <span class="label">年级</span>
            <input class="flex1" type="text" v-model="grade" placeholder="请选择" readonly />
            <svg-icon icon-class="right" class="right-icon"></svg-icon>
          </div>
          <div class="input-box flex flex-align-center" @click="openClassPicker">
            <span class="label">班级</span>
            <input class="flex1" type="text" v-model="className" placeholder="请选择" readonly />
            <svg-icon icon-class="right" class="right-icon"></svg-icon>
          </div>
          <div class="input-box flex flex-align-center" @click="openAreaPicker">
            <span class="label">地区</span>
            <input class="flex1" type="text" v-model="area" placeholder="请选择" readonly />
            <svg-icon icon-class="right" class="right-icon"></svg-icon>
          </div>
          <div class="input-box flex flex-align-center" @click="openSchoolPicker">
            <span class="label">学校</span>
            <input class="flex1" type="text" v-model="school" placeholder="请选择" readonly />
            <svg-icon icon-class="right" class="right-icon"></svg-icon>
          </div>
        </div>
        <a class="submit-btn light-btn" @click="submit">提交</a>
        <p class="tips">*每个学期只允许修改一次资料哦~</p>
      </div>
    </div> -->

    <van-popup v-model="showGradePicker" position="bottom">
      <van-picker
        ref="gradePicker"
        show-toolbar
        :columns="gradeList"
        value-key="name"
        @cancel="showGradePicker = false"
        @confirm="onGradeConfirm"
      />
    </van-popup>
    <van-popup v-model="showClassPicker" position="bottom">
      <van-picker
        ref="classPicker"
        show-toolbar
        :columns="classList"
        value-key="name"
        @cancel="showClassPicker = false"
        @confirm="onClassConfirm"
      />
    </van-popup>
    <van-popup v-model="showAreaPicker" position="bottom">
      <van-picker
        ref="areaPicker"
        show-toolbar
        :columns="areaList"
        value-key="name"
        @cancel="showAreaPicker = false"
        @confirm="onAreaConfirm"
        @change="onAreaChange"
      />
    </van-popup>
    <van-popup v-model="showSchoolPicker" position="bottom">
      <van-picker
        ref="schoolPicker"
        show-toolbar
        :columns="schoolList"
        value-key="name"
        @cancel="showSchoolPicker = false"
        @confirm="onSchoolConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { common } from '@/utils/common'
export default {
  name: 'Data',
  data () {
    return {
      tit: '修改资料',
      updateStatus: false,
      pic: '',
      name: '',
      grade: '',
      gradeId: '',
      className: '',
      classId: '',
      area: '',
      school: '',
      schoolId: '', // id
      schoolIndex: 0,
      showGradePicker: false,
      gradeList: common.gradeList,
      showClassPicker: false,
      classList: [{ id: '', name: '无班级' }, { id: 1, name: '1班' }, { id: 2, name: '2班' }, { id: 3, name: '3班' }, { id: 4, name: '4班' }, { id: 5, name: '5班' }, { id: 6, name: '6班' }, { id: 7, name: '7班' }, { id: 8, name: '8班' }, { id: 9, name: '9班' }, { id: 10, name: '10班' }, { id: 11, name: '11班' }, { id: 12, name: '12班' }, { id: 13, name: '13班' }, { id: 14, name: '14班' }, { id: 15, name: '15班' }, { id: 16, name: '16班' }, { id: 17, name: '17班' }, { id: 18, name: '18班' }, { id: 19, name: '19班' }, { id: 20, name: '20班' }],
      showAreaPicker: false,
      areaList: [
        {
          values: []
        },
        {
          values: []
        }, {
          values: []
        }
      ],
      areaIndex: [0, 0, 0],
      showSchoolPicker: false,
      schoolList: [],
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      townId: '',
      townName: '',
      modify: false // 是否进行修改
    }
  },
  components: {},
  created () {
    this.getUpdateStatus()
  },
  async mounted () {
    this.getInfo()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    onBlur () {
      window.scrollTo(0, 0)
    },
    async getInfo () {
      let loading = this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      let res = await this.$api.my.getSetting()
      if (res.rcode === 300) {
        let data = res.data
        if (data.pic) {
          this.pic = data.pic
        }
        if (data.name) {
          this.name = data.name
        }
        if (data.grade) {
          this.grade = this.gradeList[data.grade - 1].name
          this.gradeId = data.grade
        }
        if (data.classNo) {
          this.className = this.classList[data.classNo].name //  - 1
          this.classId = data.classNo
        }

        await this.getArea(0, 0)
        await this.getArea(data.provinceId || this.areaList[0].values[0].id, 1)
        if (data.provinceId) {
          for (let i = 0, l = this.areaList[0].values.length; i < l; i++) {
            if (data.provinceId === this.areaList[0].values[i].id) {
              this.areaIndex[0] = i
              this.provinceId = data.provinceId
              this.provinceName = this.areaList[0].values[i].name
              break
            }
          }
        }
        if (this.areaList[1].values.length === 0) {
          loading.clear()
          return
        }
        await this.getArea(data.cityId || this.areaList[1].values[0].id, 2)
        if (data.cityId) {
          // this.getArea(data.cityId, 2)
          for (let i = 0, l = this.areaList[1].values.length; i < l; i++) {
            if (data.cityId === this.areaList[1].values[i].id) {
              this.areaIndex[1] = i
              this.cityId = data.cityId
              this.cityName = this.areaList[1].values[i].name
              break
            }
          }
        }
        if (data.townId) {
          for (let i = 0, l = this.areaList[2].values.length; i < l; i++) {
            if (data.townId === this.areaList[2].values[i].id) {
              this.areaIndex[2] = i
              this.townId = data.townId
              this.townName = this.areaList[2].values[i].name
              break
            }
          }
        }
        if (data.townId) {
          await this.getSchool(data.townId)
        } else if (data.cityId) {
          await this.getSchool(data.cityId)
        } else if (data.provinceId) {
          await this.getSchool(data.provinceId)
        }
        this.area = this.provinceName + this.cityName + this.townName
        if (data.schoolId) {
          for (let i = 0, l = this.schoolList.length; i < l; i++) {
            if (data.schoolId === this.schoolList[i].id) {
              this.schoolIndex = i
              this.schoolId = data.schoolId
              this.school = this.schoolList[i].name
              break
            }
          }
        }
      }
      loading.clear()
    },
    // 获取地区
    async getArea (parentId, index) {
      return new Promise((resolve) => {
        let params = {
          parentId
        }
        this.$api.login.area(params).then((res) => {
          if (res.rcode === 300) {
            let list = res.data.list
            /* if (index !== 0) {
              list.unshift({ name: '全部', id: -1 })
            } */
            list.unshift({ name: '全部', id: -1 })
            this.areaList[index].values = list
            resolve(true)
          }
        })
      })
    },
    // 获取学校
    getSchool (areaId) {
      return new Promise((resolve) => {
        let params = {
          areaId
        }
        this.$api.login.school(params).then((res) => {
          if (res.rcode === 300) {
            let schoolList = res.data.list
            schoolList.unshift({ name: '全部', id: -1 })
            this.schoolList = schoolList
            resolve(true)
          }
        })
      })
    },
    // 获取学校
    getSchoolList (areaId) {
      let params = {
        areaId
      }
      this.$api.login.school(params).then((res) => {
        if (res.rcode === 300) {
          let schoolList = res.data.list
          schoolList.unshift({ name: '全部', id: -1 })
          this.schoolList = schoolList
          this.schoolName = ''
        }
      })
    },
    openGradePicker () {
      /* if (!this.updateStatus) {
        return
      } */
      this.showGradePicker = true
      this.$nextTick(() => {
        this.$refs.gradePicker.setColumnIndex(0, this.gradeId - 1)
      })
    },
    onGradeConfirm (value, index) {
      this.grade = value.name
      this.gradeId = value.id
      this.showGradePicker = false
    },
    openClassPicker () {
      /* if (!this.updateStatus) {
        return
      } */
      this.showClassPicker = true
      this.$nextTick(() => {
        this.$refs.classPicker.setColumnIndex(0, this.classId) //  - 1
      })
    },
    onClassConfirm (value, index) {
      if (value.id === '') {
        this.className = ''
        this.classId = ''
      } else {
        this.className = value.name
        this.classId = value.id
      }
      this.showClassPicker = false
    },
    openAreaPicker () {
      /* if (!this.updateStatus) {
        return
      } */
      this.showAreaPicker = true
      this.$nextTick(() => {
        this.$refs.areaPicker.setIndexes(this.areaIndex)
      })
    },
    async onAreaChange (picker, values, index) {
      switch (index) {
        case 0:
          let res = await this.getPinkArea(values[index].id)
          if (res.length > 0) { // 如果需要加入全部
            res.unshift({ name: '全部', id: -1 })
          }
          picker.setColumnValues(1, res)
          this.areaList[1].values = res
          if (res.length === 0) {
            picker.setColumnValues(2, [])
          } else {
            let result = await this.getPinkArea(res[0].id)
            if (result.length > 0) { // 如果需要加入全部
              result.unshift({ name: '全部', id: -1 })
            }
            picker.setColumnValues(2, result)
            this.areaList[2].values = result
          }
          picker.setColumnIndex(1, 0)
          picker.setColumnIndex(2, 0)
          break
        case 1:
          let resTown = await this.getPinkArea(values[index].id)
          if (resTown.length > 0) { // 如果需要加入全部
            resTown.unshift({ name: '全部', id: -1 })
          }
          this.areaList[2].values = resTown
          picker.setColumnValues(2, resTown)
          picker.setColumnIndex(2, 0)
      }
    },
    async getPinkArea (parentId) {
      let params = {
        parentId
      }
      return new Promise((resolve, reject) => {
        this.$api.login.area(params).then((res) => {
          if (res.rcode === 300) {
            resolve(res.data.list)
          } else {
            resolve([])
          }
        }).catch(() => {
          reject(new Error([]))
        })
      })
    },
    onAreaConfirm (value, index) {
      this.schoolList = []
      this.school = ''
      this.schoolId = ''
      let getSchool = true
      for (let i = 2; i > -1; i--) {
        if (value[i] !== undefined) {
          // let index = value[i]
          let id = value[i].id
          let name = value[i].name
          if (i === 2) {
            this.townId = id !== -1 ? id : ''
            this.townName = id !== -1 ? name : ''
          } else if (i === 1) {
            this.cityId = id !== -1 ? id : ''
            this.cityName = id !== -1 ? name : ''
          } else {
            this.provinceId = id !== -1 ? id : ''
            this.provinceName = id !== -1 ? name : ''
          }
          if (getSchool && id !== -1) {
            this.getSchoolList(id)
            getSchool = false
          }
        } else {
          if (i === 2) {
            this.townId = ''
            this.townName = ''
          } else if (i === 1) {
            this.cityId = ''
            this.cityName = ''
          } else {
            this.provinceId = ''
            this.provinceName = ''
          }
        }
      }
      this.showAreaPicker = false
      this.areaIndex = index
      this.area = this.provinceName + this.cityName + this.townName
    },
    openSchoolPicker () {
      /* if (!this.updateStatus) {
        return
      } */
      this.showSchoolPicker = true
      this.$nextTick(() => {
        this.$refs.schoolPicker.setColumnIndex(0, this.schoolIndex)
      })
    },
    onSchoolConfirm (value, index) {
      if (value.id === -1) {
        this.school = ''
        this.schoolId = ''
      } else {
        this.school = value.name
        this.schoolId = value.id
      }
      this.schoolIndex = index
      this.showSchoolPicker = false
    },
    async submit () {
      if (!this.updateStatus) {
        this.$toast('本学期你已修改过资料')
        return
      }
      if (this.name === '') {
        this.$toast('请输入学生姓名')
        return false
      }
      if (this.grade === '') {
        this.$toast('请选择年级')
        return false
      }
      /* if (this.className === '') {
        this.$toast('请选择班级')
        return false
      }
      if (this.school === '') {
        this.$toast('请选择学校')
        return false
      } */
      let params = {
        classNo: this.classId,
        grade: this.gradeId,
        schoolId: this.schoolId,
        stuName: this.name,
        op: 'edit'
      }
      let res = await this.$api.login.updateStu(params)
      if (res.rcode !== 300) {
        this.$toast(res.message)
        return
      }
      this.$router.go(-1)
    },
    // 检查是否允许更新
    getUpdateStatus () {
      this.$api.login.getUpdateStatus().then((res) => {
        if (res.rcode === 300) {
          this.updateStatus = res.data.status
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Data.scss"></style>
