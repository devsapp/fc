
### 使用步骤

1. 安装依赖 s build -d 
2. 执行 s layer publish --layer-name testName --code ./.s/build/artifacts/{serviceName}/{function}/.s/ , 然后会返回层的 arn
3. 删除掉 .s/build
4. 在需要绑定层的函数下新增配置：
````
layers: 
  - <layer arn>
````
> 参考文档 [层的简介](https://help.aliyun.com/document_detail/193057.html)
5. s local invoke
6. s deploy && s invoke