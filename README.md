## project setup
* init     

	~~~
	npm install 
	~~~
* local run 

	~~~
	gulp watch
	~~~
* build 

	~~~
	gulp build
	~~~
	>提前装好node
	>其中npm insatll可以用cnpm install替代（$ npm install -g cnpm --registry=https://registry.npm.taobao.org）
	>如果执行 cnpm install,请提前把代理关掉


# vue-countdown
### 一款基于 [vuejs](http://vuejs.org/) 的倒计时组件


## options
* time  倒计时时间,默认`60s`
* normalText 常规(未进入倒计时)状态下的提示文字,默认`获取验证码`
* waitingText  倒计时状态下的提示文字,默认`重新获取`


## events
* clickBtn 用户点击后触发,向父级派发该事件
* ready 触发组件开始进入倒计时状态,由父级触发

## 在你的vue项目中进行使用


```html
    <count-down :time=10 normal-text="获取验证码" waiting-text="重新获取"></count-down>
```