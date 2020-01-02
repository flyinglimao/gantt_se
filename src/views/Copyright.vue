<template>
  <pre class="home" style="padding-left: 30%">
隱私權政策：

◎個人資料蒐集主體：
我就爛股份有限公司。

◎個人資料蒐集目的：
1.客戶管理與服務。
2.廣告和商業行為管理業務。

◎個人資料之類別：
1.識別使用者，如：帳號。
2.使用者安全細節，如：密碼。
3.個人描述，如：年齡、性別、出生年月日等、

◎個人資料的修改與刪除：
1.當您在本網站註冊成為會員後，將會無法改變登入帳號。
2.當您在本網站註冊成為會員後，可以隨時修改使用者暱稱、登入密碼以保持安全杏、正確性。

◎隱私權政策的修改：
本站將視法令規範及網站經營型態，修改本隱私權政策，以落實保障您隱私權之立意。

  </pre>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Copyright extends Vue {
  @Prop() private msg!: string;
}
</script>
