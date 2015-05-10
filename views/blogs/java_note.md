# android 学习经验 #

- 新建AVD虚拟器，一般Device：Nexus S，或推荐 3.2”HVGA；nexus s 和galaxy nexus 是手机，nexus 7是平板

- 你所说的一个try-catch只能捕获一个错误是对的，不论后面跟着多少个catch都一样，try-catch语句是这样执行的：首先逐个从上到下执行try块中的java语句，如果没有发生异常，则执行完try块后跳过catch块(不论有多少个catch都跳过)。如果try块中某条语句存在异常，则跳到相对应的catch块中(发生什么异常，就跳到什么catch里，如果没有准确对应的，就跳到父类异常的catch中)，执行完该catch块中的语句，然后跳过其它的catch块，接着往下走，明白了么？总之，try-catch只能处理一个异常，这就是为什么后面通常跟finally，要有一个统一的出口。

- import java.net.URLEncoder;  网络编码，网络使用的资源格式不对可以使用该类进行编码，使得格式一样，可以在本地进行查看！