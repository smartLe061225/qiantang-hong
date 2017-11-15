<template>
  <div>
    <div class="normal-box-mod">
      <div class="normal-box-hd clearfix">
        <div class="normal-box-title">
          <div class="decorate-square"></div>
          <h2>成员管理</h2>
        </div>
      </div>
      <div class="normal-box-bd">
        <div class="group-manager-bar clearfix">
          <div class="search-bar fr">
            <Input placeholder="请输入成员姓名" class="radius-input" style="width: 300px;">
            </Input>
            <Button icon="ios-search"></Button>
          </div>
          <div>
            <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="ghost">
              <Icon type="plus-round"></Icon> 添加成员</Button>
          </div>
        </div>
        <div class="group-manager-list">
          <Row getters="14">
            <Col>
              <dl>
                <dt>
                  <img src="" alt="">
                </dt>
                <dd>
                  <h3><a href="javascript:;">安德烈</a></h3>
                  <div>
                    <span class=""></span>
                  </div>
                </dd>
              </dl>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cityList: [
          {
            value: "New York",
            label: "New York"
          },
          {
            value: "London",
            label: "London"
          },
          {
            value: "Sydney",
            label: "Sydney"
          },
          {
            value: "Ottawa",
            label: "Ottawa"
          },
          {
            value: "Paris",
            label: "Paris"
          },
          {
            value: "Canberra",
            label: "Canberra"
          }
        ],
        model1: ""
      };
    }
  };
</script>

<style lang="less">
  .group-manager-bar {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
</style>