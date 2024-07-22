# pdf


> 方案： `html2canvas + jspdf`，使用html2canvas将使用canvas将页面转为base64图片流，并插入jspdf插件中，保存并下载pdf。
```
npm install html2canvas jspdf
```

**绘制较短的页面**
```js
// htmlToPdf.js
import html2Canvas from 'html2canvas'
import jsPdf from 'jspdf'

export default {
    install(Vue, options) {
        /**
         * id @param 导出pdf的div容器
         * title @param 导出文件的标题
         */
        Vue.prototype.htmlToPdf = (id, title) => {
            const element = document.getElementById(`${id}`)
            const opts = {
                scale: 12, //缩放比例，提高生成图片清晰度
                useCORS: true, // 允许加载跨域的图片
                allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
                tainttest: true, // 检测每张图片已经加载完成
                logging: true // 日志开关，发布的时候记得改成 false
            }
            html2Canvas(element, opts).then((canvas) => {
                console.log(canvas)
                const contentWidth = canvas.width
                const contentHeight = canvas.height
                // 一页pdf显示html页面生成的canvas高度;
                const pageHeight = (contentWidth / 595.28) * 841.89
                // 未生成pdf的html页面高度
                let leftHeight = contentHeight
                // 页面偏移
                let position = 0
                // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                const imgWidth = 595.28
                const imgHeight = (592.28 / contentWidth) * contentHeight
                const pageData = canvas.toDataURL('image/jpeg', 1.0)
                console.log(pageData)
                // a4纸纵向，一般默认使用；new JsPDF('landscape'); 横向页面
                const PDF = new JsPDF('', 'pt', 'a4')
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                        // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
                        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                    // 超过一页时，分页打印（每页高度841.89）
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 841.89
                        if (leftHeight > 0) {
                            PDF.addPage()
                        }
                    }
                }
                PDF.save(title + '.pdf')
            })
            .catch((error) => {
                console.log('打印失败', error)
            })
        }
    }
}
```

使用导出方法:
```vue
<template>
  <div>
      <div
       id="pdfDom"
      >
        测试数据
      </div>
      <el-button type="primary" round style="background: #4849FF" @click="btnClick">导出PDF</el-button>
    </div>
 </template>
 <script>
 import JsPDF from 'jspdf'
 import html2Canvas from 'html2canvas'
 methods: {
    // 导出pdf
    btnClick() {
     this.$nextTick(() => {
         this.htmlToPdf('pdfDom', '个人报告')
     })
    },
  },
 </script>
```

html2canvas能够抓取的页面长度大约为1440，两个A4页面左右，超出不会抓取，需要控制多个节点，循环绘制。

**绘制多个节点**
```js
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install(Vue, options) {
    // id-导出pdf的div容器；title-导出文件标题
    Vue.prototype.htmlToPdf = (name, title) => {
      const element = document.querySelectorAll(`.${name}`)
      let count = 0
      const PDF = new JsPDF('', 'pt', 'a4')
      const pageArr = []
      const opts = {
        scale: 12, // 缩放比例，提高生成图片清晰度
        useCORS: true, // 允许加载跨域的图片
        allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
        tainttest: true, // 检测每张图片已经加载完成
        logging: true // 日志开关，发布的时候记得改成 false
      }
      for (const index in Array.from(element)) {
        html2Canvas(element[index], opts).then(function(canvas) {
          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const contentWidth = canvas.width
          const contentHeight = canvas.height
          const imgWidth = 595.28
          const imgHeight = (592.28 / contentWidth) * contentHeight
          const pageData = canvas.toDataURL('image/jpeg', 1.0)
          // 一页pdf显示html页面生成的canvas高度;
          const pageHeight = (contentWidth / 592.28) * 841.89
          // 未生成pdf的html页面高度
          const leftHeight = contentHeight
          pageArr[index] = { pageData: pageData, pageHeight: pageHeight, leftHeight: leftHeight, imgWidth: imgWidth, imgHeight: imgHeight }
          if (++count === element.length) {
            // 转换完毕，可进行下一步处理 pageDataArr
            let counts = 0
            for (const data of pageArr) {
              // 页面偏移
              let position = 0
              // 转换完毕，save保存名称后浏览器会自动下载
              // 当内容未超过pdf一页显示的范围，无需分页
              if (data.leftHeight < data.pageHeight) {
                // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
                PDF.addImage(data.pageData, 'JPEG', 0, 0, data.imgWidth, data.imgHeight)
              } else {
                // 超过一页时，分页打印（每页高度841.89）
                while (data.leftHeight > 0) {
                  PDF.addImage(data.pageData, 'JPEG', 0, position, data.imgWidth, data.imgHeight)
                  data.leftHeight -= data.pageHeight
                  position -= 841.89
                  if (data.leftHeight > 0) {
                    PDF.addPage()
                  }
                }
              }
              if (++counts === pageArr.length) {
                PDF.save(title + '.pdf')
              } else {
                // 未转换到最后一页时，pdf增加一页
                PDF.addPage()
              }
            }
          }
        })
      }
    }
  }
}
```

使用ts：
```ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/*
 * 使用说明
 * eleArr:需要导出pdf的容器元素list(dom节点 不是id)
 * pdfFileName: 导出文件的名字 通过调用outPutPdfFn方法也可传参数改变
 * splitClassName: 避免分段截断的类名 当pdf有多页时需要传入此参数 , 避免pdf分页时截断元素  如表格<tr class="itemClass"></tr>
 * 调用方式 先 let pdf = new PdfLoader(eleArr, 'pdf' ,'itemClass');
 * 若想改变pdf名称 pdf.outPutPdfFn(fileName);  outPutPdfFn方法返回一个promise 可以使用then方法处理pdf生成后的逻辑
 * */
class PdfLoader {
    eleArr: HTMLElement[];
    pdfFileName: string;
    splitClassName: string;
    A4_WIDTH: number;
    A4_HEIGHT: number;

    constructor(
        eleArr: HTMLElement[],
        pdfFileName: string,
        splitClassName: string
    ) {
        this.eleArr = eleArr;
        this.pdfFileName = pdfFileName;
        this.splitClassName = splitClassName;

        // A4纸张的大小 210mm×297mm 像素 595 * 842
        this.A4_WIDTH = 595;
        this.A4_HEIGHT = 842;
    }

    async getPDF(
        resolve: { (value: unknown): void },
        reject: { (value: unknown): void }
    ) {
        const pdf = new jsPDF("p", "pt", "a4");

        const htmlNodeLen = this.eleArr.length || 0;
        let solveNum = 0;

        for (let idx = 0; idx < htmlNodeLen; idx++) {
            const eleItem = this.eleArr[idx];
            const eleW = eleItem.offsetWidth; // 获得该容器的宽
            const eleH = eleItem.scrollHeight; // 获得该容器的高
            const eleOffsetTop = eleItem.offsetTop; // 获得该容器到文档顶部的距离
            const eleOffsetLeft = eleItem.offsetLeft; // 获得该容器到文档最左的距离

            const canvas = document.createElement("canvas");
            let abs = 0;
            const win_in =
                document.documentElement.clientWidth ||
                document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
            const win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
            if (win_out > win_in) {
                abs = (win_out - win_in) / 2; // 获得滚动条宽度的一半
            }
            canvas.width = eleW * 2; // 将画布宽&&高放大两倍
            canvas.height = eleH * 2;
            const context: any = canvas.getContext("2d");
            context.scale(2, 2); // 增强图片清晰度
            context.translate(-eleOffsetLeft - abs, -eleOffsetTop);

            html2canvas(eleItem, {
                useCORS: true, // 允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
            }).then(async (canvas) => {
                const contentWidth = canvas.width;
                const contentHeight = canvas.height;
                // 一页pdf显示html页面生成的canvas高度;
                const pageHeight =
                    (contentWidth / this.A4_WIDTH) * this.A4_HEIGHT; // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
                // 未生成pdf的html页面高度
                let leftHeight = contentHeight;
                // 页面偏移
                let position = 0;
                // a4纸的尺寸[595,842],单位像素，html页面生成的canvas在pdf中图片的宽高
                const imgWidth = this.A4_WIDTH - 10; // -10为了页面有右边距
                const imgHeight =
                    (this.A4_WIDTH / contentWidth) * contentHeight;
                const pageData = canvas.toDataURL("image/jpeg", 1.0);

                // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
                    pdf.addImage(pageData, "JPEG", 5, 0, imgWidth, imgHeight);
                } else {
                    // 分页
                    while (leftHeight > 0) {
                        pdf.addImage(
                            pageData,
                            "JPEG",
                            5,
                            position,
                            imgWidth,
                            imgHeight
                        );
                        leftHeight -= pageHeight;
                        position -= this.A4_HEIGHT;
                        // 避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }

                eleItem.style.height = "";

                solveNum += 1;
                try {
                    if (solveNum >= htmlNodeLen) {
                        // 获取pdf文档流
                        const pdfStream = pdf.output("arraybuffer");
                        // console.log(999, pdfStream);

                        // 下载pdf文件
                        pdf.save(this.pdfFileName + ".pdf", {
                            returnPromise: true,
                        }).then(() => {
                            // 去除添加的空div 防止页面混乱
                            const doms = document.querySelectorAll(".emptyDiv");
                            for (let i = 0; i < doms.length; i++) {
                                doms[i].remove();
                            }
                        });
                        resolve(pdfStream);
                    } else if (htmlNodeLen > 1) {
                        pdf.addPage();
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
    }

    //此方法是防止（图表之类）内容因为A4纸张问题被截断
    async outPutPdfFn(pdfFileName?: string) {
        return new Promise((resolve, reject) => {
            this.eleArr.map((eleItem: any) => {
                // eleItem.style.display = "initial";
                // eleItem.style.height = "initial";
                pdfFileName ? (this.pdfFileName = pdfFileName) : null;
                const target = eleItem;
                const pageHeight =
                    (target.scrollWidth / this.A4_WIDTH) * this.A4_HEIGHT;
                // 获取分割dom，此处为class类名为item的dom
                const domList = eleItem.getElementsByClassName(
                    this.splitClassName
                );
                // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
                let pageNum = 1; // pdf页数
                const eleBounding = eleItem.getBoundingClientRect();
                for (let i = 0; i < domList.length; i++) {
                    const node = domList[i];
                    const bound = node.getBoundingClientRect();
                    const offset2Ele = bound.top - eleBounding.top;
                    const currentPage = Math.ceil(
                        (bound.bottom - eleBounding.top) / pageHeight
                    ); // 当前元素应该在哪一页
                    if (pageNum < currentPage) {
                        pageNum++;
                        const divParent: HTMLElement = domList[i].parentNode; // 获取该div的父节点

                        // 创造一个白色的填充节点
                        const newNode = document.createElement("div");
                        newNode.className = "emptyDiv";
                        newNode.style.background = "transparent";
                        newNode.style.height =
                            pageHeight * (pageNum - 1) - offset2Ele + 30 + "px"; // +30为了在换下一页时有顶部的边距
                        newNode.style.width = "100%";

                        divParent.insertBefore(newNode, node); //在每一个节点前面插入一个空的新节点，防止内容被分割截断
                    }
                }
                return eleItem;
            });

            // 异步函数，导出成功后处理交互
            this.getPDF(resolve, reject);
        });
    }
}

export default PdfLoader;

```