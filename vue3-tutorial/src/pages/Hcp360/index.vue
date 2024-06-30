<template>
  <!-- src="https://hcp360-uat.astrazeneca.cn/hcp360_mobile/#/hcp360?hcp_cd=SDJN006H0635T&scene_code=1&nges_auth_code=49f303ca-5539-4aed-a703-f0a9d498863f" -->
  <iframe :src="src" frameborder="0" width="100%" height="800px"></iframe>
</template>

<script setup>
const src = `
https://hcp360-uat.astrazeneca.cn/hcp360_mobile/#/hcp360?hcp_cd=SDJN006H0635T&scene_code=1&nges_auth_code=49f303ca-5539-4aed-a703-f0a9d498863f
`;
</script>

<style lang="scss" scoped></style>
