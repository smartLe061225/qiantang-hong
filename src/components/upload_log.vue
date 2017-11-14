<template>
    <div class="upload-log-mod">
        <ul>
            <li class="clearfix" v-for="log in uploadLogData" :key="log.id">
                <Row>
                    <Col span="14">
                    <div class="upload-log-file">
                        <img src="../assets/logo-excle.png" alt="excle">
                        <h3>
                            <a href="javascript:;">{{log.file_name}}</a>
                        </h3>
                        <div>上传于：{{log.upload_time}}</div>
                    </div>
                    </Col>
                    <Col span="10">
                    <div class="upload-log-user">
                        <img class="face-box" :src="log.avator_path" alt="">
                        <div class="department">
                            <a href="javascript:;">{{log.user_name}}</a>
                            <p>{{log.company_name}} {{log.department}}</p>
                        </div>
                    </div>
                    <div class="upload-log-opt">
                        <a href="javascript:;">
                            <p>查看</p>
                            <p>
                                <Icon type="eye" size="18" color="#23BA00"></Icon>
                            </p>
                        </a>
                        <a href="javascript:;">
                            <p>下载</p>
                            <p>
                                <Icon type="android-download" size="18" color="#6799FF"></Icon>
                            </p>
                        </a>
                        <a href="javascript:;">
                            <p>删除</p>
                            <p>
                                <Icon type="close-circled" size="18" color="#FF576F"></Icon>
                            </p>
                        </a>
                    </div>
                    </Col>
                </Row>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "uploadLog",
  props: {
    uploadLogData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style lang="less">
.upload-log-mod {
  li {
    border-bottom: 1px solid #f0f0f0;
    height: 84px;
    .upload-log-file {
      padding-top: 24px;
      img {
        max-width: 40px;
        max-height: 40px;
        float: left;
        margin-right: 10px;
      }
      h3 {
        a {
          font-size: 14px;
          color: #000;
          font-weight: normal;
        }
      }
      div {
        font-size: 12px;
        color: #bbb;
      }
    }
    .upload-log-user {
      padding-top: 23px;
      .face-box {
        margin-left: 5px;
        float: right;
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 24px;
      }
      .department {
        text-align: right;
        text-overflow: ellipsis;
        a {
          font-size: 14px;
          color: #000;
        }
        p {
          color: #bbb;
          font-size: 12px;
        }
      }
    }
    .upload-log-opt {
      height: 83px;
      border-left: 1px solid #f0f0f0;
      background: #fcfbfc;
      text-align: center;
      font-size: 14px;
      display: none;
      a {
        padding: 0 5%;
        margin-top: 25px;
        color: #666;
        display: inline-block;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    &:hover {
      .upload-log-opt {
        display: block;
      }
      .upload-log-user {
        display: none;
      }
    }
  }
}
</style>