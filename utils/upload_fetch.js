fetchDownload(row) {
  const that = this;
  const { download_url, object_name } = row;
  that.$set(row, 'isUploading', true);
  let  size = 0;
  fetch(download_url,{
    method: 'GET'
  })
    .then(response => {
      if(response.ok){
        console.log(response.headers.get('content-length'), '==response.headers.get()');
        that.$set(row, 'total', +response.headers.get('content-length'));
        return response;
      }else{
        console.log('请求失败');
      }
    })
  // 取出body
    .then(response => response.body)
    .then(body => {
    const reader = body.getReader();

      return new ReadableStream({
        start(controller) {
        return pump();

        function pump() {
            return reader.read().then(res => {   //res  ({ done, value })
          // 读不到更多数据就关闭流
          // console.log(res,'res');
          const {done,value } = res;
          if (done) {
                console.log('end');
                that.$set(row, 'isUploading', false);
                that.$set(row, 'progress', 0);
                controller.close();
          }
              size += value.length  || 0;
              console.log(size,'size');
              that.$set(row, 'progress', parseInt((size/row.total) * 100 ));
          // 将下一个数据块置入流中
          controller.enqueue(value);
          return pump();
            });
        }
        }
      });
    })
    .then(stream => new Response(stream))
    .then(response => that.savingFile(response,object_name))
    .catch(err => {
      that.$set(row, 'isUploading', false);
      that.$set(row, 'progress', 0);
    });

},
savingFile (response,fileName) {
 response.blob().then( blob => {
   if(typeof FileReader === 'undefined'){
     notification.open({
        message:'您的浏览器不支持 FileReader，请升级浏览器',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />
     });
   }
   const reader = new FileReader();
   reader.addEventListener('loadend', function() {
         let resu = '';
         try{
           resu = JSON.parse( reader.result);
            // resu = eval('('+ reader.result + ')')
           if(resu.code == 500){
          this.$message.warning();(resu.msg);
           }else if(resu.code == 401){
             this.$message.warning(resu.msg + '红红火火');
           }
         }catch(e){
           //捕获错误 说明是文本字符串
           resu = reader.result;
           downloadBlob(blob,fileName);
         }

   });
   reader.readAsText(blob);

      //下载
      function downloadBlob(blob,fileName){
         let blobUrl = window.URL.createObjectURL(blob);
         let a = document.createElement('a');
         a.href = blobUrl;
         a.target = '_blank';
         a.style.display = 'none';
         document.body.appendChild(a);
         a.download = fileName;
         a.click();
         window.URL.revokeObjectURL(blobUrl);
         document.body.removeChild(a);
      }
 });
},