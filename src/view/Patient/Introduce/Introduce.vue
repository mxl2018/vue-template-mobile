<template>
  <div class="Introduce w100 bgf">
    
    <div class="head pl10 pr10 borBox bg93 lh20 fz14 posRel flex alic colu">
      <p class="pt10 pb10 colorF fz16">乳腺癌是女性发病率最高的恶性肿瘤，同时也是目前众多癌症中治疗选择相对较多的癌种之一。近年来，我国乳腺癌新发病人数持续增长，国家癌症中心2019年发布的报告显 示,2015年中国乳腺癌新发患者数为30.4万人，其中20%〜25%的乳腺癌患者为人表皮生长因子受体2（简称HER2）阳性患者。HER2阳性的乳腺癌的临床实践尚有巨大的治疗需求未得到满足，患者面临着复发和耐药等多重问题。</p>
      <p class="colorF fz16">鉴于此，北京白求恩公益基金会发起“普惠生命-白求恩•赛普汀®公益捐助项目”，旨在帮助HER2阳性转移性乳腺癌患者得到持久有效的抗HER2治疗,延长患者生命，减少患者家庭及社会经济负担，提高生活质量。同时也促进临床医生积累用药经验，更好的管理疾病，不 断优化治疗方案，进一步促进乳腺癌疾病领域的发展。</p>
      <div class="card posAbs bgf borRad pt10 pb10 pl15 pr15 borBox lh24">
        <p class="leftBorder pl10">时间及地区</p>
        <p>项目启动时间：2020年10月15日</p>
        <p>项目开展：全国</p>
        <p>项目咨询热线：400-001-****</p>
        <p class="flex justc"><span>项目办公地址：</span><span class="flex1">上海市静安区江场三路86号9号楼702室</span></p>
        <p>项目网站：</p>
      </div>
    </div>
    
    <div class="title fz14 lh60 bg93 colorF tc">申请条件</div>
    <div class="content fz14 bgf borRad pt10 pb10 pl15 pr15 borBox lh24">
      <p>患者本人是经项目医生确诊需要赛普汀(伊尼妥单抗)治疗的HER2阳性转移性乳腺癌患者。</p>
      <p>患者本人需要连续使用一段时间赛普汀(伊尼妥单抗)治疗后，依据项目医生临床评估，能够继续使用赛普汀(伊尼妥单抗)治疗，并从中获益且无不可耐受的毒副反应。</p>
      <p>患者本人需根据项目流程规定的时间接受医学随访，并提供相应的检查报告（包括：门诊或住院病历、处方单以及相关的医学检验报告），由项目医院提供评估报告，确认需继续使用赛普汀(伊尼妥单抗)治疗。</p> 
    </div>

    <div class="title fz14 lh60 bg93 colorF tc">项目办公室</div>
    <div class="content fz14 bgf borRad pt10 pb10 pl15 pr15 borBox lh24">
      <p>患者本人是经项目医生确诊需要赛普汀(伊尼妥单抗)治疗的HER2阳性转移性乳腺癌患者。</p>
      <p>患者本人需要连续使用一段时间赛普汀(伊尼妥单抗)治疗后，依据项目医生临床评估，能够继续使用赛普汀(伊尼妥单抗)治疗，并从中获益且无不可耐受的毒副反应。</p>
      <p>患者本人需根据项目流程规定的时间接受医学随访，并提供相应的检查报告（包括：门诊或住院病历、处方单以及相关的医学检验报告），由项目医院提供评估报告，确认需继续使用赛普汀(伊尼妥单抗)治疗。</p> 
    </div>

    <div class="title fz14 lh60 bg93 colorF tc">项目流程</div>
    <div class="content step fz14 bgf borRad pt10 pb10 pl15 pr15 borBox lh24">
      <p>患者本人是经项目医生确诊需要赛普汀(伊尼妥单抗)治疗的HER2阳性转移性乳腺癌患者。</p>
      <p>患者本人需要连续使用一段时间赛普汀(伊尼妥单抗)治疗后，依据项目医生临床评估，能够继续使用赛普汀(伊尼妥单抗)治疗，并从中获益且无不可耐受的毒副反应。</p>
      <p>患者本人需根据项目流程规定的时间接受医学随访，并提供相应的检查报告（包括：门诊或住院病历、处方单以及相关的医学检验报告），由项目医院提供评估报告，确认需继续使用赛普汀(伊尼妥单抗)治疗。</p> 
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
     
    };
  },
  name: "Introduce",
  created() {

  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Introduce{min-height:100%;}
.head{padding-bottom:1rem;margin-bottom: 1.2rem;}
.head .card{width: 90%;bottom:-1rem;box-shadow: 0px 1px 4px #aaa;}
.head .card .leftBorder{border-left: .02rem solid #93D89D;}
.title{width: 90%;margin: 0 auto;border-radius: .05rem;}
.content{box-shadow: 0px 1px 4px #aaa;width: 90%;margin: .15rem auto .1rem;}
.content p{padding-bottom:.1rem}
.step p{
  padding-left: .1rem;
  position: relative;
  border-left: .01rem solid #93D89D;
}
.step p::before{
  content: '';
  display: inline-block;
  width: .16rem;height: .16rem;
  border-radius: 50%;
  background: #93D89D;
  position:absolute;
  left:-.09rem;
}

.bg93{background:#60aaf3}
</style>
